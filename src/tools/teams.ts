import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getTeams } from "../appwrite-client.js";
import { ID } from "node-appwrite";

export const teamTools: Tool[] = [
    // Team Management
    {
        name: "create_team",
        description: "Create a new team",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Unique team ID. Use 'unique()' for auto-generation" },
                name: { type: "string", description: "Team name" },
                roles: { type: "array", items: { type: "string" }, description: "Array of roles" },
            },
            required: ["name"],
        },
    },
    {
        name: "get_team",
        description: "Get team by ID",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
            },
            required: ["teamId"],
        },
    },
    {
        name: "list_teams",
        description: "List all teams",
        inputSchema: {
            type: "object",
            properties: {
                queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
                search: { type: "string", description: "Search term" },
            },
        },
    },
    {
        name: "update_team",
        description: "Update team by ID",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
                name: { type: "string", description: "New team name" },
            },
            required: ["teamId", "name"],
        },
    },
    {
        name: "delete_team",
        description: "Delete team by ID",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
            },
            required: ["teamId"],
        },
    },
    {
        name: "update_team_prefs",
        description: "Update team preferences",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
                prefs: { type: "object", description: "Team preferences as JSON object" },
            },
            required: ["teamId", "prefs"],
        },
    },

    // Membership Management
    {
        name: "create_membership",
        description: "Create a new team membership (invite user)",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
                roles: { type: "array", items: { type: "string" }, description: "Array of roles for the member" },
                email: { type: "string", description: "User email (for email invitation)" },
                userId: { type: "string", description: "User ID (for direct membership)" },
                phone: { type: "string", description: "User phone (for SMS invitation)" },
                url: { type: "string", description: "URL to redirect after accepting invitation" },
                name: { type: "string", description: "User name" },
            },
            required: ["teamId", "roles"],
        },
    },
    {
        name: "get_membership",
        description: "Get team membership by ID",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
                membershipId: { type: "string", description: "Membership ID" },
            },
            required: ["teamId", "membershipId"],
        },
    },
    {
        name: "list_memberships",
        description: "List all memberships for a team",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
                queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
                search: { type: "string", description: "Search term" },
            },
            required: ["teamId"],
        },
    },
    {
        name: "update_membership",
        description: "Update team membership roles",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
                membershipId: { type: "string", description: "Membership ID" },
                roles: { type: "array", items: { type: "string" }, description: "New roles for the member" },
            },
            required: ["teamId", "membershipId", "roles"],
        },
    },
    {
        name: "delete_membership",
        description: "Delete team membership",
        inputSchema: {
            type: "object",
            properties: {
                teamId: { type: "string", description: "Team ID" },
                membershipId: { type: "string", description: "Membership ID" },
            },
            required: ["teamId", "membershipId"],
        },
    },
];

export async function handleTeamTool(
    name: string,
    args: Record<string, unknown>
): Promise<unknown | null> {
    const teams = getTeams();

    switch (name) {
        // Team Management
        case "create_team": {
            const teamId = (args.teamId as string) || ID.unique();
            return await teams.create(
                teamId,
                args.name as string,
                args.roles as string[] | undefined
            );
        }
        case "get_team": {
            return await teams.get(args.teamId as string);
        }
        case "list_teams": {
            return await teams.list(
                args.queries as string[] | undefined,
                args.search as string | undefined
            );
        }
        case "update_team": {
            return await teams.updateName(
                args.teamId as string,
                args.name as string
            );
        }
        case "delete_team": {
            await teams.delete(args.teamId as string);
            return { success: true, message: `Team ${args.teamId} deleted` };
        }
        case "update_team_prefs": {
            return await teams.updatePrefs(
                args.teamId as string,
                args.prefs as Record<string, unknown>
            );
        }

        // Membership Management
        case "create_membership": {
            return await teams.createMembership(
                args.teamId as string,
                args.roles as string[],
                args.email as string | undefined,
                args.userId as string | undefined,
                args.phone as string | undefined,
                args.url as string | undefined,
                args.name as string | undefined
            );
        }
        case "get_membership": {
            return await teams.getMembership(
                args.teamId as string,
                args.membershipId as string
            );
        }
        case "list_memberships": {
            return await teams.listMemberships(
                args.teamId as string,
                args.queries as string[] | undefined,
                args.search as string | undefined
            );
        }
        case "update_membership": {
            return await teams.updateMembership(
                args.teamId as string,
                args.membershipId as string,
                args.roles as string[]
            );
        }
        case "delete_membership": {
            await teams.deleteMembership(
                args.teamId as string,
                args.membershipId as string
            );
            return { success: true, message: `Membership ${args.membershipId} deleted` };
        }

        default:
            return null;
    }
}
