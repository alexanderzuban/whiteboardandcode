/**
 * Document types and interfaces
 */

/**
 * Types of documents supported by the application
 */
export enum DocumentType {
  Drawing = 'drawing',
  Text = 'text',
}

/**
 * Base document interface
 */
export interface Document {
  uid: string;
  name: string;
  type: DocumentType;
  createdAt?: string;
  updatedAt?: string;
  unsaved?: boolean;
}

/**
 * Drawing document with shapes
 */
export interface DrawingDocument extends Document {
  type: DocumentType.Drawing;
  shapes: DrawingShape[];
  origin: { x: number; y: number };
}

/**
 * Text/code document
 */
export interface TextDocument extends Document {
  type: DocumentType.Text;
  content: string;
  language: string;
}

/**
 * Base interface for all drawing shapes
 */
export interface DrawingShape {
  id: number;
  type: string;
  lineColor: string;
  lineWidth: number;
  fillColor?: string;
  opacity?: number;
}
