import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getHealth } from "../appwrite-client.js";

export const healthTools: Tool[] = [
  {
    name: "get_health",
    description: "Check Appwrite HTTP server status",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_health_db",
    description: "Check database server status",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_health_cache",
    description: "Check cache server status",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_health_storage",
    description: "Check storage server status",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_health_all",
    description: "Get comprehensive health status (HTTP, DB, cache, storage, time)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

export async function handleHealthTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown | null> {
  const health = getHealth();

  switch (name) {
    case "get_health": {
      return await health.get();
    }
    case "get_health_db": {
      return await health.getDB();
    }
    case "get_health_cache": {
      return await health.getCache();
    }
    case "get_health_storage": {
      return await health.getStorage();
    }
    case "get_health_all": {
      const [http, db, cache, storage, time] = await Promise.all([
        health.get().catch(e => ({ status: "error", message: e.message })),
        health.getDB().catch(e => ({ status: "error", message: e.message })),
        health.getCache().catch(e => ({ status: "error", message: e.message })),
        health.getStorage().catch(e => ({ status: "error", message: e.message })),
        health.getTime().catch(e => ({ status: "error", message: e.message })),
      ]);
      return { http, db, cache, storage, time };
    }

    default:
      return null;
  }
}
