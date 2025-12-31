/**
 * API request/response types
 */

import type { Document, DocumentType } from './document.js';

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Create document request
 */
export interface CreateDocumentRequest {
  name: string;
  type: DocumentType;
}

/**
 * Update document request
 */
export interface UpdateDocumentRequest {
  name?: string;
  content?: unknown;
}

/**
 * List documents response
 */
export interface ListDocumentsResponse {
  documents: Document[];
  cursor?: string;
}

/**
 * WebSocket message types for real-time collaboration
 */
export enum WsMessageType {
  Join = 'join',
  Leave = 'leave',
  ShapeAdded = 'shape_added',
  ShapeUpdated = 'shape_updated',
  ShapeRemoved = 'shape_removed',
  CursorMoved = 'cursor_moved',
  Sync = 'sync',
}

export interface WsMessage {
  type: WsMessageType;
  documentId: string;
  userId: string;
  payload: unknown;
  timestamp: string;
}
