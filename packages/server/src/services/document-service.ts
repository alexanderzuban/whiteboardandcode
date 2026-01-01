import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';
import type { Document, DocumentType, DrawingDocument, TextDocument } from '@whiteboardandcode/shared';

const TABLE_NAME = process.env.DOCUMENTS_TABLE || 'whiteboard-documents-dev';
const IS_LOCAL = process.env.NODE_ENV === 'development' || !process.env.DOCUMENTS_TABLE;

// In-memory store for local development
const localDocuments = new Map<string, Document>();

// DynamoDB client (lazy initialized)
let docClient: DynamoDBDocumentClient | null = null;

function getDocClient(): DynamoDBDocumentClient {
  if (!docClient) {
    const client = new DynamoDBClient({});
    docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });
  }
  return docClient;
}

// Key generation for single-table design
function getDocumentKey(documentId: string) {
  return {
    pk: `DOC#${documentId}`,
    sk: `DOC#${documentId}`,
  };
}

function getUserDocumentsKey(userId: string) {
  return {
    pk: `USER#${userId}`,
    sk: 'DOC#',
  };
}

export interface DocumentServiceOptions {
  userId?: string;
}

export class DocumentService {
  private userId: string;

  constructor(options: DocumentServiceOptions = {}) {
    this.userId = options.userId || 'anonymous';
  }

  async listDocuments(): Promise<Document[]> {
    if (IS_LOCAL) {
      return Array.from(localDocuments.values()).filter(
        (doc) => (doc as any).userId === this.userId || (doc as any).userId === undefined
      );
    }

    const client = getDocClient();
    const result = await client.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: 'gsi-user-documents',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': this.userId,
        },
        ScanIndexForward: false, // Most recent first
      })
    );

    return (result.Items || []).map(this.itemToDocument);
  }

  async getDocument(id: string): Promise<Document | null> {
    if (IS_LOCAL) {
      return localDocuments.get(id) || null;
    }

    const client = getDocClient();
    const result = await client.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: getDocumentKey(id),
      })
    );

    if (!result.Item) {
      return null;
    }

    return this.itemToDocument(result.Item);
  }

  async createDocument(name: string, type: DocumentType): Promise<Document> {
    const now = new Date().toISOString();
    const documentId = uuid();

    const document: Document = {
      uid: documentId,
      name,
      type,
      createdAt: now,
      updatedAt: now,
    };

    if (IS_LOCAL) {
      const localDoc = { ...document, userId: this.userId };
      localDocuments.set(documentId, localDoc);
      return document;
    }

    const client = getDocClient();
    const item = {
      ...getDocumentKey(documentId),
      ...document,
      userId: this.userId,
    };

    await client.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    return document;
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document | null> {
    const existing = await this.getDocument(id);
    if (!existing) {
      return null;
    }

    const now = new Date().toISOString();
    const updated: Document = {
      ...existing,
      ...updates,
      uid: existing.uid, // Prevent UID changes
      updatedAt: now,
    };

    if (IS_LOCAL) {
      const localDoc = { ...updated, userId: this.userId };
      localDocuments.set(id, localDoc);
      return updated;
    }

    const client = getDocClient();

    // Build update expression dynamically
    const updateParts: string[] = ['updatedAt = :updatedAt'];
    const expressionValues: Record<string, any> = { ':updatedAt': now };

    if (updates.name !== undefined) {
      updateParts.push('#name = :name');
      expressionValues[':name'] = updates.name;
    }

    // Handle drawing document updates
    if ('shapes' in updates) {
      updateParts.push('shapes = :shapes');
      expressionValues[':shapes'] = (updates as Partial<DrawingDocument>).shapes;
    }
    if ('origin' in updates) {
      updateParts.push('origin = :origin');
      expressionValues[':origin'] = (updates as Partial<DrawingDocument>).origin;
    }

    // Handle text document updates
    if ('content' in updates) {
      updateParts.push('content = :content');
      expressionValues[':content'] = (updates as Partial<TextDocument>).content;
    }
    if ('language' in updates) {
      updateParts.push('#language = :language');
      expressionValues[':language'] = (updates as Partial<TextDocument>).language;
    }

    await client.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: getDocumentKey(id),
        UpdateExpression: `SET ${updateParts.join(', ')}`,
        ExpressionAttributeValues: expressionValues,
        ExpressionAttributeNames: {
          '#name': 'name',
          '#language': 'language',
        },
      })
    );

    return updated;
  }

  async deleteDocument(id: string): Promise<void> {
    if (IS_LOCAL) {
      localDocuments.delete(id);
      return;
    }

    const client = getDocClient();
    await client.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: getDocumentKey(id),
      })
    );
  }

  async saveDrawingDocument(document: DrawingDocument): Promise<DrawingDocument> {
    const now = new Date().toISOString();

    if (IS_LOCAL) {
      const localDoc = { ...document, userId: this.userId, updatedAt: now };
      localDocuments.set(document.uid, localDoc);
      return { ...document, updatedAt: now };
    }

    const client = getDocClient();
    const item = {
      ...getDocumentKey(document.uid),
      ...document,
      userId: this.userId,
      updatedAt: now,
    };

    await client.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    return { ...document, updatedAt: now };
  }

  async saveTextDocument(document: TextDocument): Promise<TextDocument> {
    const now = new Date().toISOString();

    if (IS_LOCAL) {
      const localDoc = { ...document, userId: this.userId, updatedAt: now };
      localDocuments.set(document.uid, localDoc);
      return { ...document, updatedAt: now };
    }

    const client = getDocClient();
    const item = {
      ...getDocumentKey(document.uid),
      ...document,
      userId: this.userId,
      updatedAt: now,
    };

    await client.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    return { ...document, updatedAt: now };
  }

  private itemToDocument(item: Record<string, any>): Document {
    // Remove DynamoDB keys from the returned document
    const { pk, sk, userId, ...document } = item;
    return document as Document;
  }
}

// Export a factory function for creating service instances
export function createDocumentService(options?: DocumentServiceOptions): DocumentService {
  return new DocumentService(options);
}
