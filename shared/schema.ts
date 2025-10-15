import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Uploaded files table
export const uploadedFiles = pgTable("uploaded_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(), // 'pdf', 'image', 'video', 'audio'
  fileSize: integer("file_size").notNull(),
  status: text("status").notNull().default('processing'), // 'processing', 'completed', 'failed'
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const insertUploadedFileSchema = createInsertSchema(uploadedFiles).omit({
  id: true,
  uploadedAt: true,
});

export type InsertUploadedFile = z.infer<typeof insertUploadedFileSchema>;
export type UploadedFile = typeof uploadedFiles.$inferSelect;

// Queries table
export const queries = pgTable("queries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  queryText: text("query_text").notNull(),
  modalities: text("modalities").notNull(), // JSON array of enabled modalities
  status: text("status").notNull().default('processing'), // 'processing', 'completed', 'failed'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertQuerySchema = createInsertSchema(queries).omit({
  id: true,
  createdAt: true,
});

export type InsertQuery = z.infer<typeof insertQuerySchema>;
export type Query = typeof queries.$inferSelect;

// Query results table
export const queryResults = pgTable("query_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  queryId: varchar("query_id").notNull(),
  modality: text("modality").notNull(), // 'text', 'image', 'video', 'audio'
  content: text("content").notNull(), // JSON with result data
  confidenceScore: integer("confidence_score").notNull(), // 0-100
  quantumEntanglement: integer("quantum_entanglement").notNull(), // 0-100
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertQueryResultSchema = createInsertSchema(queryResults).omit({
  id: true,
  createdAt: true,
});

export type InsertQueryResult = z.infer<typeof insertQueryResultSchema>;
export type QueryResult = typeof queryResults.$inferSelect;

// Session type for authentication
export type Session = {
  user: User;
  isAuthenticated: boolean;
};

// Frontend-only types for UI state
export type SystemStatus = {
  offlineIntelligence: 'active' | 'inactive';
  quantumEngine: 'ready' | 'processing' | 'offline';
  privacyScore: number;
};

export type QuantumLog = {
  id: string;
  timestamp: Date;
  message: string;
  level: 'info' | 'success' | 'warning' | 'error';
};

export type ModalityType = 'text' | 'image' | 'video' | 'audio';

export type ProcessingStage = 
  | 'extracting_features'
  | 'federated_embedding'
  | 'quantum_optimization'
  | 'similarity_calculation'
  | 'generating_insights';
