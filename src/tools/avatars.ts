import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getAvatars } from "../appwrite-client.js";
import { Browser, CreditCard, Flag } from "node-appwrite";

export const avatarTools: Tool[] = [
    {
        name: "get_avatar_initials",
        description: "Get user initials avatar image",
        inputSchema: {
            type: "object",
            properties: {
                name: { type: "string", description: "Full name to generate initials from" },
                width: { type: "integer", description: "Image width (0-2000, default: 500)" },
                height: { type: "integer", description: "Image height (0-2000, default: 500)" },
                background: { type: "string", description: "Background color hex (without #)" },
            },
        },
    },
    {
        name: "get_avatar_image",
        description: "Get avatar image from URL",
        inputSchema: {
            type: "object",
            properties: {
                url: { type: "string", description: "URL of the image" },
                width: { type: "integer", description: "Image width (0-2000, default: 400)" },
                height: { type: "integer", description: "Image height (0-2000, default: 400)" },
            },
            required: ["url"],
        },
    },
    {
        name: "get_qr_code",
        description: "Generate a QR code image",
        inputSchema: {
            type: "object",
            properties: {
                text: { type: "string", description: "Text/URL to encode in QR code" },
                size: { type: "integer", description: "QR code size (1-1000, default: 400)" },
                margin: { type: "integer", description: "Margin around QR code (0-10, default: 1)" },
                download: { type: "boolean", description: "Return as downloadable file" },
            },
            required: ["text"],
        },
    },
    {
        name: "get_favicon",
        description: "Get favicon from a website URL",
        inputSchema: {
            type: "object",
            properties: {
                url: { type: "string", description: "Website URL to get favicon from" },
            },
            required: ["url"],
        },
    },
    {
        name: "get_browser_icon",
        description: "Get browser icon by code",
        inputSchema: {
            type: "object",
            properties: {
                code: {
                    type: "string",
                    enum: ["aa", "an", "ch", "ci", "cm", "cr", "df", "ec", "ed", "ep", "er", "ff", "fx", "ga", "go", "gr", "gt", "ht", "ia", "ic", "ir", "ko", "mi", "mm", "mo", "mz", "nb", "nr", "og", "op", "or", "ot", "ov", "ow", "ps", "pt", "qp", "qt", "qw", "qx", "sa", "sf", "sm", "sr", "te", "to", "tv", "tw", "uc", "vi", "wc", "we", "wh", "wm", "wo", "ya", "yo"],
                    description: "Browser code"
                },
                width: { type: "integer", description: "Image width (0-2000, default: 100)" },
                height: { type: "integer", description: "Image height (0-2000, default: 100)" },
                quality: { type: "integer", description: "Image quality (0-100, default: 100)" },
            },
            required: ["code"],
        },
    },
    {
        name: "get_credit_card_icon",
        description: "Get credit card icon by provider",
        inputSchema: {
            type: "object",
            properties: {
                code: {
                    type: "string",
                    enum: ["amex", "argencard", "cabal", "cencosud", "diners", "discover", "elo", "hipercard", "jcb", "mastercard", "naranja", "targeta-shopping", "union-china-pay", "visa", "mir", "maestro"],
                    description: "Credit card provider code"
                },
                width: { type: "integer", description: "Image width (0-2000, default: 100)" },
                height: { type: "integer", description: "Image height (0-2000, default: 100)" },
                quality: { type: "integer", description: "Image quality (0-100, default: 100)" },
            },
            required: ["code"],
        },
    },
    {
        name: "get_flag",
        description: "Get country flag image by country code",
        inputSchema: {
            type: "object",
            properties: {
                code: { type: "string", description: "ISO 3166-1 alpha-2 country code (e.g., 'us', 'kr', 'jp')" },
                width: { type: "integer", description: "Image width (0-2000, default: 100)" },
                height: { type: "integer", description: "Image height (0-2000, default: 100)" },
                quality: { type: "integer", description: "Image quality (0-100, default: 100)" },
            },
            required: ["code"],
        },
    },
];

export async function handleAvatarTool(
    name: string,
    args: Record<string, unknown>
): Promise<unknown | null> {
    const avatars = getAvatars();

    switch (name) {
        case "get_avatar_initials": {
            const result = await avatars.getInitials(
                args.name as string | undefined,
                args.width as number | undefined,
                args.height as number | undefined,
                args.background as string | undefined
            );
            return {
                type: "image",
                description: `Initials avatar for ${args.name || 'default'}`,
                data: Buffer.from(result).toString('base64')
            };
        }
        case "get_avatar_image": {
            const result = await avatars.getImage(
                args.url as string,
                args.width as number | undefined,
                args.height as number | undefined
            );
            return {
                type: "image",
                description: `Avatar from URL: ${args.url}`,
                data: Buffer.from(result).toString('base64')
            };
        }
        case "get_qr_code": {
            const result = await avatars.getQR(
                args.text as string,
                args.size as number | undefined,
                args.margin as number | undefined,
                args.download as boolean | undefined
            );
            return {
                type: "image",
                description: `QR code for: ${args.text}`,
                data: Buffer.from(result).toString('base64')
            };
        }
        case "get_favicon": {
            const result = await avatars.getFavicon(args.url as string);
            return {
                type: "image",
                description: `Favicon from: ${args.url}`,
                data: Buffer.from(result).toString('base64')
            };
        }
        case "get_browser_icon": {
            const result = await avatars.getBrowser(
                args.code as Browser,
                args.width as number | undefined,
                args.height as number | undefined,
                args.quality as number | undefined
            );
            return {
                type: "image",
                description: `Browser icon: ${args.code}`,
                data: Buffer.from(result).toString('base64')
            };
        }
        case "get_credit_card_icon": {
            const result = await avatars.getCreditCard(
                args.code as CreditCard,
                args.width as number | undefined,
                args.height as number | undefined,
                args.quality as number | undefined
            );
            return {
                type: "image",
                description: `Credit card icon: ${args.code}`,
                data: Buffer.from(result).toString('base64')
            };
        }
        case "get_flag": {
            const result = await avatars.getFlag(
                args.code as Flag,
                args.width as number | undefined,
                args.height as number | undefined,
                args.quality as number | undefined
            );
            return {
                type: "image",
                description: `Flag: ${args.code}`,
                data: Buffer.from(result).toString('base64')
            };
        }

        default:
            return null;
    }
}
