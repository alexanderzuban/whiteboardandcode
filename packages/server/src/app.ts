import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { documentRoutes } from './routes/documents.js';
import { healthRoutes } from './routes/health.js';

export interface AppOptions {
  logger?: boolean;
}

export async function buildApp(options: AppOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? true,
  });

  // Register CORS
  await app.register(cors, {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // Register routes
  await app.register(healthRoutes, { prefix: '/api' });
  await app.register(documentRoutes, { prefix: '/api/documents' });

  return app;
}
