import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getConfig } from "../appwrite-client.js";

export const graphqlTools: Tool[] = [
    {
        name: "graphql_query",
        description: "Execute a GraphQL query against Appwrite. Use this for complex queries that combine multiple resources.",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "GraphQL query string" },
                variables: { type: "object", description: "Optional variables for the query" },
            },
            required: ["query"],
        },
    },
    {
        name: "graphql_mutation",
        description: "Execute a GraphQL mutation against Appwrite. Use this for complex mutations.",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "GraphQL mutation string" },
                variables: { type: "object", description: "Optional variables for the mutation" },
            },
            required: ["query"],
        },
    },
];

export async function handleGraphqlTool(
    name: string,
    args: Record<string, unknown>
): Promise<unknown | null> {
    const config = getConfig();

    switch (name) {
        case "graphql_query":
        case "graphql_mutation": {
            const query = args.query as string;
            const variables = args.variables as Record<string, unknown> | undefined;

            const response = await fetch(`${config.endpoint}/graphql`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Appwrite-Project": config.projectId,
                    "X-Appwrite-Key": config.apiKey,
                },
                body: JSON.stringify({ query, variables }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`GraphQL error: ${error}`);
            }

            return await response.json();
        }

        default:
            return null;
    }
}

