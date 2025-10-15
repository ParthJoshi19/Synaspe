import { 
  type User, 
  type InsertUser,
  type UploadedFile,
  type InsertUploadedFile,
  type Query,
  type InsertQuery,
  type QueryResult,
  type InsertQueryResult
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // File upload methods
  createUploadedFile(file: InsertUploadedFile): Promise<UploadedFile>;
  getUploadedFilesByUser(userId: string): Promise<UploadedFile[]>;
  updateFileStatus(fileId: string, status: string): Promise<void>;

  // Query methods
  createQuery(query: InsertQuery): Promise<Query>;
  getQueriesByUser(userId: string): Promise<Query[]>;
  updateQueryStatus(queryId: string, status: string): Promise<void>;

  // Query result methods
  createQueryResult(result: InsertQueryResult): Promise<QueryResult>;
  getResultsByQuery(queryId: string): Promise<QueryResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private files: Map<string, UploadedFile>;
  private queries: Map<string, Query>;
  private results: Map<string, QueryResult>;

  constructor() {
    this.users = new Map();
    this.files = new Map();
    this.queries = new Map();
    this.results = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // File upload methods
  async createUploadedFile(insertFile: InsertUploadedFile): Promise<UploadedFile> {
    const id = randomUUID();
    const file: UploadedFile = {
      ...insertFile,
      id,
      uploadedAt: new Date(),
    };
    this.files.set(id, file);
    return file;
  }

  async getUploadedFilesByUser(userId: string): Promise<UploadedFile[]> {
    return Array.from(this.files.values()).filter(
      (file) => file.userId === userId
    );
  }

  async updateFileStatus(fileId: string, status: string): Promise<void> {
    const file = this.files.get(fileId);
    if (file) {
      this.files.set(fileId, { ...file, status });
    }
  }

  // Query methods
  async createQuery(insertQuery: InsertQuery): Promise<Query> {
    const id = randomUUID();
    const query: Query = {
      ...insertQuery,
      id,
      createdAt: new Date(),
    };
    this.queries.set(id, query);
    return query;
  }

  async getQueriesByUser(userId: string): Promise<Query[]> {
    return Array.from(this.queries.values()).filter(
      (query) => query.userId === userId
    );
  }

  async updateQueryStatus(queryId: string, status: string): Promise<void> {
    const query = this.queries.get(queryId);
    if (query) {
      this.queries.set(queryId, { ...query, status });
    }
  }

  // Query result methods
  async createQueryResult(insertResult: InsertQueryResult): Promise<QueryResult> {
    const id = randomUUID();
    const result: QueryResult = {
      ...insertResult,
      id,
      createdAt: new Date(),
    };
    this.results.set(id, result);
    return result;
  }

  async getResultsByQuery(queryId: string): Promise<QueryResult[]> {
    return Array.from(this.results.values()).filter(
      (result) => result.queryId === queryId
    );
  }
}

export const storage = new MemStorage();
