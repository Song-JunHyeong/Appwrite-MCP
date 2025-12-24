import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getFunctions } from "../appwrite-client.js";
import { ID, Runtime, ExecutionMethod } from "node-appwrite";

export const functionTools: Tool[] = [
  // Function Management
  {
    name: "create_function",
    description: "Create a new serverless function",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Unique function ID. Use 'unique()' for auto-generation" },
        name: { type: "string", description: "Function name" },
        runtime: { type: "string", description: "Runtime environment (e.g., 'node-18.0', 'python-3.9')" },
        execute: { type: "array", items: { type: "string" }, description: "Execution permissions" },
        events: { type: "array", items: { type: "string" }, description: "Events that trigger the function" },
        schedule: { type: "string", description: "Cron schedule for automatic execution" },
        timeout: { type: "integer", description: "Execution timeout in seconds" },
        enabled: { type: "boolean", description: "Enable function" },
        logging: { type: "boolean", description: "Enable logging" },
        entrypoint: { type: "string", description: "Entrypoint file" },
        commands: { type: "string", description: "Build commands" },
        scopes: { type: "array", items: { type: "string" }, description: "Function scopes" },
      },
      required: ["name", "runtime"],
    },
  },
  {
    name: "get_function",
    description: "Get function by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
      },
      required: ["functionId"],
    },
  },
  {
    name: "list_functions",
    description: "List all functions",
    inputSchema: {
      type: "object",
      properties: {
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
        search: { type: "string", description: "Search term" },
      },
    },
  },
  {
    name: "update_function",
    description: "Update function by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        name: { type: "string", description: "Function name" },
        runtime: { type: "string", description: "Runtime environment" },
        execute: { type: "array", items: { type: "string" }, description: "Execution permissions" },
        events: { type: "array", items: { type: "string" }, description: "Events that trigger the function" },
        schedule: { type: "string", description: "Cron schedule" },
        timeout: { type: "integer", description: "Execution timeout in seconds" },
        enabled: { type: "boolean", description: "Enable function" },
        logging: { type: "boolean", description: "Enable logging" },
        entrypoint: { type: "string", description: "Entrypoint file" },
        commands: { type: "string", description: "Build commands" },
        scopes: { type: "array", items: { type: "string" }, description: "Function scopes" },
      },
      required: ["functionId", "name"],
    },
  },
  {
    name: "delete_function",
    description: "Delete function by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
      },
      required: ["functionId"],
    },
  },

  // Execution Management
  {
    name: "create_execution",
    description: "Execute a function",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        body: { type: "string", description: "Request body (string or JSON string)" },
        async: { type: "boolean", description: "Execute asynchronously" },
        path: { type: "string", description: "Request path" },
        method: { type: "string", enum: ["GET", "POST", "PUT", "PATCH", "DELETE"], description: "HTTP method" },
        headers: { type: "object", description: "Request headers" },
        scheduledAt: { type: "string", description: "Scheduled execution time (ISO 8601)" },
      },
      required: ["functionId"],
    },
  },
  {
    name: "get_execution",
    description: "Get execution result by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        executionId: { type: "string", description: "Execution ID" },
      },
      required: ["functionId", "executionId"],
    },
  },
  {
    name: "list_executions",
    description: "List all executions for a function",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
        search: { type: "string", description: "Search term" },
      },
      required: ["functionId"],
    },
  },
  {
    name: "delete_execution",
    description: "Delete execution by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        executionId: { type: "string", description: "Execution ID" },
      },
      required: ["functionId", "executionId"],
    },
  },

  // Variable Management
  {
    name: "create_variable",
    description: "Create a function environment variable",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        key: { type: "string", description: "Variable key" },
        value: { type: "string", description: "Variable value" },
      },
      required: ["functionId", "key", "value"],
    },
  },
  {
    name: "get_variable",
    description: "Get variable by key",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        variableId: { type: "string", description: "Variable ID" },
      },
      required: ["functionId", "variableId"],
    },
  },
  {
    name: "list_variables",
    description: "List all variables for a function",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
      },
      required: ["functionId"],
    },
  },
  {
    name: "update_variable",
    description: "Update variable by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        variableId: { type: "string", description: "Variable ID" },
        key: { type: "string", description: "Variable key" },
        value: { type: "string", description: "Variable value" },
      },
      required: ["functionId", "variableId", "key"],
    },
  },
  {
    name: "delete_variable",
    description: "Delete variable by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        variableId: { type: "string", description: "Variable ID" },
      },
      required: ["functionId", "variableId"],
    },
  },

  // Deployment Management
  {
    name: "create_deployment",
    description: "Create a new function deployment (upload code). Provide code as base64-encoded tar.gz file.",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        code: { type: "string", description: "Base64-encoded tar.gz file containing function code" },
        activate: { type: "boolean", description: "Activate deployment after creation" },
        entrypoint: { type: "string", description: "Entrypoint file (e.g., 'index.js')" },
        commands: { type: "string", description: "Build commands" },
      },
      required: ["functionId", "code", "activate"],
    },
  },
  {
    name: "get_deployment",
    description: "Get deployment by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        deploymentId: { type: "string", description: "Deployment ID" },
      },
      required: ["functionId", "deploymentId"],
    },
  },
  {
    name: "list_deployments",
    description: "List all deployments for a function",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
        search: { type: "string", description: "Search term" },
      },
      required: ["functionId"],
    },
  },
  {
    name: "update_deployment",
    description: "Update function deployment (activate a specific deployment)",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        deploymentId: { type: "string", description: "Deployment ID to activate" },
      },
      required: ["functionId", "deploymentId"],
    },
  },
  {
    name: "delete_deployment",
    description: "Delete deployment by ID",
    inputSchema: {
      type: "object",
      properties: {
        functionId: { type: "string", description: "Function ID" },
        deploymentId: { type: "string", description: "Deployment ID" },
      },
      required: ["functionId", "deploymentId"],
    },
  },

  // Utility
  {
    name: "list_runtimes",
    description: "List all available function runtimes",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

export async function handleFunctionTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown | null> {
  const functions = getFunctions();

  switch (name) {
    // Function Management
    case "create_function": {
      const functionId = (args.functionId as string) || ID.unique();
      return await functions.create(
        functionId,
        args.name as string,
        args.runtime as Runtime,
        args.execute as string[] | undefined,
        args.events as string[] | undefined,
        args.schedule as string | undefined,
        args.timeout as number | undefined,
        args.enabled as boolean | undefined,
        args.logging as boolean | undefined,
        args.entrypoint as string | undefined,
        args.commands as string | undefined,
        args.scopes as string[] | undefined
      );
    }
    case "get_function": {
      return await functions.get(args.functionId as string);
    }
    case "list_functions": {
      return await functions.list(
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "update_function": {
      return await functions.update(
        args.functionId as string,
        args.name as string,
        args.runtime as Runtime | undefined,
        args.execute as string[] | undefined,
        args.events as string[] | undefined,
        args.schedule as string | undefined,
        args.timeout as number | undefined,
        args.enabled as boolean | undefined,
        args.logging as boolean | undefined,
        args.entrypoint as string | undefined,
        args.commands as string | undefined,
        args.scopes as string[] | undefined
      );
    }
    case "delete_function": {
      await functions.delete(args.functionId as string);
      return { success: true, message: `Function ${args.functionId} deleted` };
    }

    // Execution Management
    case "create_execution": {
      return await functions.createExecution(
        args.functionId as string,
        args.body as string | undefined,
        args.async as boolean | undefined,
        args.path as string | undefined,
        args.method as ExecutionMethod | undefined,
        args.headers as Record<string, string> | undefined,
        args.scheduledAt as string | undefined
      );
    }
    case "get_execution": {
      return await functions.getExecution(
        args.functionId as string,
        args.executionId as string
      );
    }
    case "list_executions": {
      return await functions.listExecutions(
        args.functionId as string,
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "delete_execution": {
      await functions.deleteExecution(
        args.functionId as string,
        args.executionId as string
      );
      return { success: true, message: `Execution ${args.executionId} deleted` };
    }

    // Variable Management
    case "create_variable": {
      return await functions.createVariable(
        args.functionId as string,
        args.key as string,
        args.value as string
      );
    }
    case "get_variable": {
      return await functions.getVariable(
        args.functionId as string,
        args.variableId as string
      );
    }
    case "list_variables": {
      return await functions.listVariables(args.functionId as string);
    }
    case "update_variable": {
      return await functions.updateVariable(
        args.functionId as string,
        args.variableId as string,
        args.key as string,
        args.value as string | undefined
      );
    }
    case "delete_variable": {
      await functions.deleteVariable(
        args.functionId as string,
        args.variableId as string
      );
      return { success: true, message: `Variable ${args.variableId} deleted` };
    }

    // Deployment Management
    case "create_deployment": {
      const codeBuffer = Buffer.from(args.code as string, 'base64');
      const { InputFile } = await import('node-appwrite/file');
      const file = InputFile.fromBuffer(codeBuffer, 'code.tar.gz');
      return await functions.createDeployment(
        args.functionId as string,
        file,
        args.activate as boolean,
        args.entrypoint as string | undefined,
        args.commands as string | undefined
      );
    }
    case "get_deployment": {
      return await functions.getDeployment(
        args.functionId as string,
        args.deploymentId as string
      );
    }
    case "list_deployments": {
      return await functions.listDeployments(
        args.functionId as string,
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "update_deployment": {
      return await functions.updateDeployment(
        args.functionId as string,
        args.deploymentId as string
      );
    }
    case "delete_deployment": {
      await functions.deleteDeployment(
        args.functionId as string,
        args.deploymentId as string
      );
      return { success: true, message: `Deployment ${args.deploymentId} deleted` };
    }

    // Utility
    case "list_runtimes": {
      return await functions.listRuntimes();
    }

    default:
      return null;
  }
}
