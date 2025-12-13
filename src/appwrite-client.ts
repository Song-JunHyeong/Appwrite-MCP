import { Client, Databases, Users, Storage, Functions, Health, Messaging } from "node-appwrite";

export interface AppwriteConfig {
  projectId: string;
  apiKey: string;
  endpoint: string;
}

let client: Client | null = null;
let databases: Databases | null = null;
let users: Users | null = null;
let storage: Storage | null = null;
let functions: Functions | null = null;
let health: Health | null = null;
let messaging: Messaging | null = null;

export function initializeAppwrite(config: AppwriteConfig): void {
  client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);

  databases = new Databases(client);
  users = new Users(client);
  storage = new Storage(client);
  functions = new Functions(client);
  health = new Health(client);
  messaging = new Messaging(client);
}

export function getDatabases(): Databases {
  if (!databases) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return databases;
}

export function getUsers(): Users {
  if (!users) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return users;
}

export function getStorage(): Storage {
  if (!storage) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return storage;
}

export function getFunctions(): Functions {
  if (!functions) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return functions;
}

export function getHealth(): Health {
  if (!health) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return health;
}

export function getMessaging(): Messaging {
  if (!messaging) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return messaging;
}

export function getClient(): Client {
  if (!client) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return client;
}

