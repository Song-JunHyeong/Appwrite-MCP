import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getStorage } from "../appwrite-client.js";
import { ID, Compression } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export const storageTools: Tool[] = [
  // Bucket Management
  {
    name: "create_bucket",
    description: "Create a new storage bucket",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Unique bucket ID. Use 'unique()' for auto-generation" },
        name: { type: "string", description: "Bucket name" },
        permissions: { type: "array", items: { type: "string" }, description: "Array of permission strings" },
        fileSecurity: { type: "boolean", description: "Enable file-level security" },
        enabled: { type: "boolean", description: "Enable bucket" },
        maximumFileSize: { type: "integer", description: "Maximum file size in bytes" },
        allowedFileExtensions: { type: "array", items: { type: "string" }, description: "Allowed file extensions" },
        compression: { type: "string", enum: ["none", "gzip", "zstd"], description: "Compression algorithm" },
        encryption: { type: "boolean", description: "Enable encryption" },
        antivirus: { type: "boolean", description: "Enable antivirus scanning" },
      },
      required: ["name"],
    },
  },
  {
    name: "get_bucket",
    description: "Get bucket by ID",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
      },
      required: ["bucketId"],
    },
  },
  {
    name: "list_buckets",
    description: "List all storage buckets",
    inputSchema: {
      type: "object",
      properties: {
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
        search: { type: "string", description: "Search term" },
      },
    },
  },
  {
    name: "update_bucket",
    description: "Update bucket by ID",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
        name: { type: "string", description: "Bucket name" },
        permissions: { type: "array", items: { type: "string" }, description: "Array of permission strings" },
        fileSecurity: { type: "boolean", description: "Enable file-level security" },
        enabled: { type: "boolean", description: "Enable bucket" },
        maximumFileSize: { type: "integer", description: "Maximum file size in bytes" },
        allowedFileExtensions: { type: "array", items: { type: "string" }, description: "Allowed file extensions" },
        compression: { type: "string", enum: ["none", "gzip", "zstd"], description: "Compression algorithm" },
        encryption: { type: "boolean", description: "Enable encryption" },
        antivirus: { type: "boolean", description: "Enable antivirus scanning" },
      },
      required: ["bucketId", "name"],
    },
  },
  {
    name: "delete_bucket",
    description: "Delete bucket by ID",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
      },
      required: ["bucketId"],
    },
  },

  // File Management
  {
    name: "get_file",
    description: "Get file metadata by ID",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
        fileId: { type: "string", description: "File ID" },
      },
      required: ["bucketId", "fileId"],
    },
  },
  {
    name: "list_files",
    description: "List all files in a bucket",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
        search: { type: "string", description: "Search term" },
      },
      required: ["bucketId"],
    },
  },
  {
    name: "update_file",
    description: "Update file metadata (name and permissions)",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
        fileId: { type: "string", description: "File ID" },
        name: { type: "string", description: "New file name" },
        permissions: { type: "array", items: { type: "string" }, description: "Array of permission strings" },
      },
      required: ["bucketId", "fileId"],
    },
  },
  {
    name: "delete_file",
    description: "Delete file by ID",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
        fileId: { type: "string", description: "File ID" },
      },
      required: ["bucketId", "fileId"],
    },
  },
  {
    name: "get_file_url",
    description: "Get file URL (download or view)",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
        fileId: { type: "string", description: "File ID" },
        type: { type: "string", enum: ["download", "view"], description: "URL type: 'download' or 'view' (default: download)" },
      },
      required: ["bucketId", "fileId"],
    },
  },

  // File Upload
  {
    name: "create_file",
    description: "Upload a file to a bucket (provide base64 encoded content)",
    inputSchema: {
      type: "object",
      properties: {
        bucketId: { type: "string", description: "Bucket ID" },
        fileId: { type: "string", description: "Unique file ID" },
        fileName: { type: "string", description: "File name with extension" },
        fileContent: { type: "string", description: "Base64 encoded file content" },
        permissions: { type: "array", items: { type: "string" }, description: "File permissions" },
      },
      required: ["bucketId", "fileName", "fileContent"],
    },
  },
];

export async function handleStorageTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown | null> {
  const storage = getStorage();

  switch (name) {
    // Bucket Management
    case "create_bucket": {
      const bucketId = (args.bucketId as string) || ID.unique();
      return await storage.createBucket(
        bucketId,
        args.name as string,
        args.permissions as string[] | undefined,
        args.fileSecurity as boolean | undefined,
        args.enabled as boolean | undefined,
        args.maximumFileSize as number | undefined,
        args.allowedFileExtensions as string[] | undefined,
        args.compression as Compression | undefined,
        args.encryption as boolean | undefined,
        args.antivirus as boolean | undefined
      );
    }
    case "get_bucket": {
      return await storage.getBucket(args.bucketId as string);
    }
    case "list_buckets": {
      return await storage.listBuckets(
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "update_bucket": {
      return await storage.updateBucket(
        args.bucketId as string,
        args.name as string,
        args.permissions as string[] | undefined,
        args.fileSecurity as boolean | undefined,
        args.enabled as boolean | undefined,
        args.maximumFileSize as number | undefined,
        args.allowedFileExtensions as string[] | undefined,
        args.compression as Compression | undefined,
        args.encryption as boolean | undefined,
        args.antivirus as boolean | undefined
      );
    }
    case "delete_bucket": {
      await storage.deleteBucket(args.bucketId as string);
      return { success: true, message: `Bucket ${args.bucketId} deleted` };
    }

    // File Management
    case "get_file": {
      return await storage.getFile(
        args.bucketId as string,
        args.fileId as string
      );
    }
    case "list_files": {
      return await storage.listFiles(
        args.bucketId as string,
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "update_file": {
      return await storage.updateFile(
        args.bucketId as string,
        args.fileId as string,
        args.name as string | undefined,
        args.permissions as string[] | undefined
      );
    }
    case "delete_file": {
      await storage.deleteFile(
        args.bucketId as string,
        args.fileId as string
      );
      return { success: true, message: `File ${args.fileId} deleted` };
    }
    case "get_file_url": {
      const urlType = (args.type as string) || "download";
      if (urlType === "view") {
        const result = await storage.getFileView(
          args.bucketId as string,
          args.fileId as string
        );
        return { url: result.toString(), type: "view" };
      } else {
        const result = await storage.getFileDownload(
          args.bucketId as string,
          args.fileId as string
        );
        return { url: result.toString(), type: "download" };
      }
    }

    // File Upload
    case "create_file": {
      const fileId = (args.fileId as string) || ID.unique();
      const base64Content = args.fileContent as string;
      const buffer = Buffer.from(base64Content, "base64");
      const file = InputFile.fromBuffer(buffer, args.fileName as string);
      return await storage.createFile(
        args.bucketId as string,
        fileId,
        file,
        args.permissions as string[] | undefined
      );
    }

    default:
      return null;
  }
}
