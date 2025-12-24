#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { initializeAppwrite, AppwriteConfig } from "./appwrite-client.js";
import { databaseTools, handleDatabaseTool } from "./tools/databases.js";
import { userTools, handleUserTool } from "./tools/users.js";
import { storageTools, handleStorageTool } from "./tools/storage.js";
import { functionTools, handleFunctionTool } from "./tools/functions.js";
import { healthTools, handleHealthTool } from "./tools/health.js";
import { messagingTools, handleMessagingTool } from "./tools/messaging.js";
import { teamTools, handleTeamTool } from "./tools/teams.js";
import { avatarTools, handleAvatarTool } from "./tools/avatars.js";
import { localeTools, handleLocaleTool } from "./tools/locale.js";
import { graphqlTools, handleGraphqlTool } from "./tools/graphql.js";

function parseArgs(): AppwriteConfig {
  const args = process.argv.slice(2);
  let projectId = process.env.APPWRITE_PROJECT_ID || "";
  let apiKey = process.env.APPWRITE_API_KEY || "";
  let endpoint = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--project-id" && args[i + 1]) {
      projectId = args[++i];
    } else if (arg === "--api-key" && args[i + 1]) {
      apiKey = args[++i];
    } else if (arg === "--endpoint" && args[i + 1]) {
      endpoint = args[++i];
    } else if (arg.startsWith("--project-id=")) {
      projectId = arg.split("=")[1];
    } else if (arg.startsWith("--api-key=")) {
      apiKey = arg.split("=")[1];
    } else if (arg.startsWith("--endpoint=")) {
      endpoint = arg.split("=")[1];
    }
  }

  if (!projectId) {
    console.error("Error: APPWRITE_PROJECT_ID or --project-id is required");
    process.exit(1);
  }
  if (!apiKey) {
    console.error("Error: APPWRITE_API_KEY or --api-key is required");
    process.exit(1);
  }

  return { projectId, apiKey, endpoint };
}

async function main() {
  const config = parseArgs();
  initializeAppwrite(config);

  const server = new Server(
    {
      name: "appwrite-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register all tools
  const allTools = [
    ...databaseTools,
    ...userTools,
    ...storageTools,
    ...functionTools,
    ...healthTools,
    ...messagingTools,
    ...teamTools,
    ...avatarTools,
    ...localeTools,
    ...graphqlTools,
  ];

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: allTools,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      // Check database tools
      const dbResult = await handleDatabaseTool(name, args || {});
      if (dbResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(dbResult, null, 2) }],
        };
      }

      // Check user tools
      const userResult = await handleUserTool(name, args || {});
      if (userResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(userResult, null, 2) }],
        };
      }

      // Check storage tools
      const storageResult = await handleStorageTool(name, args || {});
      if (storageResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(storageResult, null, 2) }],
        };
      }

      // Check function tools
      const functionResult = await handleFunctionTool(name, args || {});
      if (functionResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(functionResult, null, 2) }],
        };
      }

      // Check health tools
      const healthResult = await handleHealthTool(name, args || {});
      if (healthResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(healthResult, null, 2) }],
        };
      }

      // Check messaging tools
      const messagingResult = await handleMessagingTool(name, args || {});
      if (messagingResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(messagingResult, null, 2) }],
        };
      }

      // Check team tools
      const teamResult = await handleTeamTool(name, args || {});
      if (teamResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(teamResult, null, 2) }],
        };
      }

      // Check avatar tools
      const avatarResult = await handleAvatarTool(name, args || {});
      if (avatarResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(avatarResult, null, 2) }],
        };
      }

      // Check locale tools
      const localeResult = await handleLocaleTool(name, args || {});
      if (localeResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(localeResult, null, 2) }],
        };
      }

      // Check GraphQL tools
      const graphqlResult = await handleGraphqlTool(name, args || {});
      if (graphqlResult !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(graphqlResult, null, 2) }],
        };
      }

      throw new Error(`Unknown tool: ${name}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${errorMessage}` }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
