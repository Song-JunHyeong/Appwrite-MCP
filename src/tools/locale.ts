import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getLocale } from "../appwrite-client.js";

export const localeTools: Tool[] = [
    {
        name: "list_countries",
        description: "List all countries",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "list_countries_eu",
        description: "List all EU countries",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "list_countries_phones",
        description: "List all countries with phone codes",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "list_continents",
        description: "List all continents",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "list_languages",
        description: "List all supported languages",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "list_currencies",
        description: "List all currencies",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "list_codes",
        description: "List all locale codes",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
];

export async function handleLocaleTool(
    name: string,
    args: Record<string, unknown>
): Promise<unknown | null> {
    const locale = getLocale();

    switch (name) {
        case "list_countries": {
            return await locale.listCountries();
        }
        case "list_countries_eu": {
            return await locale.listCountriesEU();
        }
        case "list_countries_phones": {
            return await locale.listCountriesPhones();
        }
        case "list_continents": {
            return await locale.listContinents();
        }
        case "list_languages": {
            return await locale.listLanguages();
        }
        case "list_currencies": {
            return await locale.listCurrencies();
        }
        case "list_codes": {
            return await locale.listCodes();
        }

        default:
            return null;
    }
}
