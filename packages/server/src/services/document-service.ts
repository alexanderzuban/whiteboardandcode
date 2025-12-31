import { v4 as uuid } from 'uuid';
import type { Document, DocumentType } from '@whiteboardandcode/shared';

// TODO: Replace with DynamoDB implementation
// This is a simple in-memory store for development
const documents = new Map<string, Document>();

export class DocumentService {
  async listDocuments(): Promise<Document[]> {
    return Array.from(documents.values());
  }

  async getDocument(id: string): Promise<Document | null> {
    return documents.get(id) || null;
  }

  async createDocument(name: string, type: DocumentType): Promise<Document> {
    const document: Document = {
      uid: uuid(),
      name,
      type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    documents.set(document.uid, document);
    return document;
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document | null> {
    const existing = documents.get(id);
    if (!existing) {
      return null;
    }

    const updated: Document = {
      ...existing,
      ...updates,
      uid: existing.uid, // Prevent UID changes
      updatedAt: new Date().toISOString(),
    };

    documents.set(id, updated);
    return updated;
  }

  async deleteDocument(id: string): Promise<void> {
    documents.delete(id);
  }
}
