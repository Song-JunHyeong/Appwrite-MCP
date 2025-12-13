import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getUsers } from "../appwrite-client.js";
import { ID } from "node-appwrite";

export const userTools: Tool[] = [
  // User Management
  {
    name: "create_user",
    description: "Create a new user",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "Unique user ID. Use 'unique()' for auto-generation" },
        email: { type: "string", description: "User email" },
        phone: { type: "string", description: "User phone number" },
        password: { type: "string", description: "User password" },
        name: { type: "string", description: "User name" },
      },
    },
  },
  {
    name: "get_user",
    description: "Get user by ID",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
      },
      required: ["userId"],
    },
  },
  {
    name: "list_users",
    description: "List all users",
    inputSchema: {
      type: "object",
      properties: {
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
        search: { type: "string", description: "Search term" },
      },
    },
  },
  {
    name: "update_user",
    description: "Update user properties (email, name, password, phone)",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
        email: { type: "string", description: "New email address" },
        name: { type: "string", description: "New name" },
        password: { type: "string", description: "New password" },
        phone: { type: "string", description: "New phone number" },
      },
      required: ["userId"],
    },
  },
  {
    name: "update_user_labels",
    description: "Update user labels",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
        labels: { type: "array", items: { type: "string" }, description: "Array of user labels" },
      },
      required: ["userId", "labels"],
    },
  },
  {
    name: "update_user_status",
    description: "Update user status (enable/disable)",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
        status: { type: "boolean", description: "User status (true = active, false = blocked)" },
      },
      required: ["userId", "status"],
    },
  },
  {
    name: "update_user_prefs",
    description: "Update user preferences",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
        prefs: { type: "object", description: "User preferences as JSON object" },
      },
      required: ["userId", "prefs"],
    },
  },
  {
    name: "get_user_prefs",
    description: "Get user preferences",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
      },
      required: ["userId"],
    },
  },
  {
    name: "delete_user",
    description: "Delete user by ID",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
      },
      required: ["userId"],
    },
  },

  // Session Management
  {
    name: "list_user_sessions",
    description: "List all sessions for a user",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
      },
      required: ["userId"],
    },
  },
  {
    name: "delete_user_sessions",
    description: "Delete user sessions (specific or all)",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
        sessionId: { type: "string", description: "Session ID (omit to delete all sessions)" },
      },
      required: ["userId"],
    },
  },

  // User Info
  {
    name: "list_user_memberships",
    description: "List all team memberships for a user",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
      },
      required: ["userId"],
    },
  },
  {
    name: "list_user_logs",
    description: "List user activity logs",
    inputSchema: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
      },
      required: ["userId"],
    },
  },
];

export async function handleUserTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown | null> {
  const users = getUsers();

  switch (name) {
    // User Management
    case "create_user": {
      const userId = (args.userId as string) || ID.unique();
      return await users.create(
        userId,
        args.email as string | undefined,
        args.phone as string | undefined,
        args.password as string | undefined,
        args.name as string | undefined
      );
    }
    case "get_user": {
      return await users.get(args.userId as string);
    }
    case "list_users": {
      return await users.list(
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "update_user": {
      const userId = args.userId as string;
      const results: Record<string, unknown> = {};

      if (args.email) {
        results.email = await users.updateEmail(userId, args.email as string);
      }
      if (args.name) {
        results.name = await users.updateName(userId, args.name as string);
      }
      if (args.password) {
        results.password = await users.updatePassword(userId, args.password as string);
      }
      if (args.phone) {
        results.phone = await users.updatePhone(userId, args.phone as string);
      }

      return { success: true, updated: Object.keys(results), userId };
    }
    case "update_user_labels": {
      return await users.updateLabels(
        args.userId as string,
        args.labels as string[]
      );
    }
    case "update_user_status": {
      return await users.updateStatus(
        args.userId as string,
        args.status as boolean
      );
    }
    case "update_user_prefs": {
      return await users.updatePrefs(
        args.userId as string,
        args.prefs as Record<string, unknown>
      );
    }
    case "get_user_prefs": {
      return await users.getPrefs(args.userId as string);
    }
    case "delete_user": {
      await users.delete(args.userId as string);
      return { success: true, message: `User ${args.userId} deleted` };
    }

    // Session Management
    case "list_user_sessions": {
      return await users.listSessions(args.userId as string);
    }
    case "delete_user_sessions": {
      if (args.sessionId) {
        await users.deleteSession(args.userId as string, args.sessionId as string);
        return { success: true, message: `Session ${args.sessionId} deleted` };
      } else {
        await users.deleteSessions(args.userId as string);
        return { success: true, message: `All sessions for user ${args.userId} deleted` };
      }
    }

    // User Info
    case "list_user_memberships": {
      return await users.listMemberships(args.userId as string);
    }
    case "list_user_logs": {
      return await users.listLogs(
        args.userId as string,
        args.queries as string[] | undefined
      );
    }

    default:
      return null;
  }
}
