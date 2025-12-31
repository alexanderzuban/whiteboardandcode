import { FastifyInstance } from 'fastify';
import { DocumentService } from '../services/document-service.js';
import type { DocumentType } from '@whiteboardandcode/shared';

const documentService = new DocumentService();

export async function documentRoutes(app: FastifyInstance) {
  // List all documents
  app.get('/', async (request, reply) => {
    const documents = await documentService.listDocuments();
    return { documents };
  });

  // Get single document
  app.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const document = await documentService.getDocument(id);

    if (!document) {
      return reply.status(404).send({ error: 'Document not found' });
    }

    return document;
  });

  // Create new document
  app.post<{ Body: { name: string; type: DocumentType } }>('/', async (request, reply) => {
    const { name, type } = request.body;
    const document = await documentService.createDocument(name, type);
    return reply.status(201).send(document);
  });

  // Update document
  app.put<{ Params: { id: string }; Body: Record<string, unknown> }>(
    '/:id',
    async (request, reply) => {
      const { id } = request.params;
      const updates = request.body;
      const document = await documentService.updateDocument(id, updates);

      if (!document) {
        return reply.status(404).send({ error: 'Document not found' });
      }

      return document;
    }
  );

  // Delete document
  app.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    await documentService.deleteDocument(id);
    return reply.status(204).send();
  });
}
