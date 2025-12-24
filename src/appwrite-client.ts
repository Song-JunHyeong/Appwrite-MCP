import { Client, Databases, Users, Storage, Functions, Health, Messaging, Teams, Avatars, Locale } from "node-appwrite";

export interface AppwriteConfig {
  projectId: string;
  apiKey: string;
  endpoint: string;
}

let client: Client | null = null;
let config: AppwriteConfig | null = null;
let databases: Databases | null = null;
let users: Users | null = null;
let storage: Storage | null = null;
let functions: Functions | null = null;
let health: Health | null = null;
let messaging: Messaging | null = null;
let teams: Teams | null = null;
let avatars: Avatars | null = null;
let locale: Locale | null = null;

export function initializeAppwrite(appwriteConfig: AppwriteConfig): void {
  config = appwriteConfig;
  client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);


  databases = new Databases(client);
  users = new Users(client);
  storage = new Storage(client);
  functions = new Functions(client);
  health = new Health(client);
  messaging = new Messaging(client);
  teams = new Teams(client);
  avatars = new Avatars(client);
  locale = new Locale(client);
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

export function getTeams(): Teams {
  if (!teams) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return teams;
}

export function getAvatars(): Avatars {
  if (!avatars) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return avatars;
}

export function getLocale(): Locale {
  if (!locale) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return locale;
}

export function getConfig(): AppwriteConfig {
  if (!config) {
    throw new Error("Appwrite client not initialized. Call initializeAppwrite first.");
  }
  return config;
}
