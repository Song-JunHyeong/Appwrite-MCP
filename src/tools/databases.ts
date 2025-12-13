import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getDatabases } from "../appwrite-client.js";
import { ID, Query, IndexType, RelationshipType, RelationMutate } from "node-appwrite";

export const databaseTools: Tool[] = [
  // Database Management
  {
    name: "create_database",
    description: "Create a new database",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Unique database ID. Use 'unique()' for auto-generation" },
        name: { type: "string", description: "Database name" },
        enabled: { type: "boolean", description: "Enable database (default: true)" },
      },
      required: ["name"],
    },
  },
  {
    name: "get_database",
    description: "Get database by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
      },
      required: ["databaseId"],
    },
  },
  {
    name: "list_databases",
    description: "List all databases",
    inputSchema: {
      type: "object",
      properties: {
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
        search: { type: "string", description: "Search term" },
      },
    },
  },
  {
    name: "update_database",
    description: "Update database by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        name: { type: "string", description: "New database name" },
        enabled: { type: "boolean", description: "Enable or disable database" },
      },
      required: ["databaseId", "name"],
    },
  },
  {
    name: "delete_database",
    description: "Delete database by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
      },
      required: ["databaseId"],
    },
  },

  // Collection Management
  {
    name: "create_collection",
    description: "Create a new collection in a database",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Unique collection ID. Use 'unique()' for auto-generation" },
        name: { type: "string", description: "Collection name" },
        permissions: { type: "array", items: { type: "string" }, description: "Array of permission strings" },
        documentSecurity: { type: "boolean", description: "Enable document-level security" },
        enabled: { type: "boolean", description: "Enable collection" },
      },
      required: ["databaseId", "name"],
    },
  },
  {
    name: "get_collection",
    description: "Get collection by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
      },
      required: ["databaseId", "collectionId"],
    },
  },
  {
    name: "list_collections",
    description: "List all collections in a database",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
        search: { type: "string", description: "Search term" },
      },
      required: ["databaseId"],
    },
  },
  {
    name: "update_collection",
    description: "Update collection by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        name: { type: "string", description: "New collection name" },
        permissions: { type: "array", items: { type: "string" }, description: "Array of permission strings" },
        documentSecurity: { type: "boolean", description: "Enable document-level security" },
        enabled: { type: "boolean", description: "Enable collection" },
      },
      required: ["databaseId", "collectionId", "name"],
    },
  },
  {
    name: "delete_collection",
    description: "Delete collection by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
      },
      required: ["databaseId", "collectionId"],
    },
  },

  // Document Management
  {
    name: "create_document",
    description: "Create a new document in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        documentId: { type: "string", description: "Unique document ID. Use 'unique()' for auto-generation" },
        data: { type: "object", description: "Document data as JSON object" },
        permissions: { type: "array", items: { type: "string" }, description: "Array of permission strings" },
      },
      required: ["databaseId", "collectionId", "data"],
    },
  },
  {
    name: "get_document",
    description: "Get document by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        documentId: { type: "string", description: "Document ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for selecting fields" },
      },
      required: ["databaseId", "collectionId", "documentId"],
    },
  },
  {
    name: "list_documents",
    description: "List documents in a collection with optional filtering",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering (e.g., 'Query.equal(\"name\", \"John\")' or 'Query.limit(10)')" },
      },
      required: ["databaseId", "collectionId"],
    },
  },
  {
    name: "update_document",
    description: "Update document by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        documentId: { type: "string", description: "Document ID" },
        data: { type: "object", description: "Document data to update as JSON object" },
        permissions: { type: "array", items: { type: "string" }, description: "Array of permission strings" },
      },
      required: ["databaseId", "collectionId", "documentId"],
    },
  },
  {
    name: "delete_document",
    description: "Delete document by ID",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        documentId: { type: "string", description: "Document ID" },
      },
      required: ["databaseId", "collectionId", "documentId"],
    },
  },

  // Attribute Management
  {
    name: "create_string_attribute",
    description: "Create a string attribute in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
        size: { type: "integer", description: "Maximum string length" },
        required: { type: "boolean", description: "Is attribute required" },
        default: { type: "string", description: "Default value" },
        array: { type: "boolean", description: "Is array attribute" },
        encrypt: { type: "boolean", description: "Encrypt attribute value" },
      },
      required: ["databaseId", "collectionId", "key", "size", "required"],
    },
  },
  {
    name: "create_integer_attribute",
    description: "Create an integer attribute in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
        required: { type: "boolean", description: "Is attribute required" },
        min: { type: "integer", description: "Minimum value" },
        max: { type: "integer", description: "Maximum value" },
        default: { type: "integer", description: "Default value" },
        array: { type: "boolean", description: "Is array attribute" },
      },
      required: ["databaseId", "collectionId", "key", "required"],
    },
  },
  {
    name: "create_float_attribute",
    description: "Create a float attribute in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
        required: { type: "boolean", description: "Is attribute required" },
        min: { type: "number", description: "Minimum value" },
        max: { type: "number", description: "Maximum value" },
        default: { type: "number", description: "Default value" },
        array: { type: "boolean", description: "Is array attribute" },
      },
      required: ["databaseId", "collectionId", "key", "required"],
    },
  },
  {
    name: "create_boolean_attribute",
    description: "Create a boolean attribute in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
        required: { type: "boolean", description: "Is attribute required" },
        default: { type: "boolean", description: "Default value" },
        array: { type: "boolean", description: "Is array attribute" },
      },
      required: ["databaseId", "collectionId", "key", "required"],
    },
  },
  {
    name: "create_email_attribute",
    description: "Create an email attribute in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
        required: { type: "boolean", description: "Is attribute required" },
        default: { type: "string", description: "Default value" },
        array: { type: "boolean", description: "Is array attribute" },
      },
      required: ["databaseId", "collectionId", "key", "required"],
    },
  },
  {
    name: "create_enum_attribute",
    description: "Create an enum attribute in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
        elements: { type: "array", items: { type: "string" }, description: "Allowed enum values" },
        required: { type: "boolean", description: "Is attribute required" },
        default: { type: "string", description: "Default value" },
        array: { type: "boolean", description: "Is array attribute" },
      },
      required: ["databaseId", "collectionId", "key", "elements", "required"],
    },
  },
  {
    name: "create_datetime_attribute",
    description: "Create a datetime attribute in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
        required: { type: "boolean", description: "Is attribute required" },
        default: { type: "string", description: "Default value in ISO 8601 format" },
        array: { type: "boolean", description: "Is array attribute" },
      },
      required: ["databaseId", "collectionId", "key", "required"],
    },
  },
  {
    name: "create_url_attribute",
    description: "Create a URL attribute in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
        required: { type: "boolean", description: "Is attribute required" },
        default: { type: "string", description: "Default value" },
        array: { type: "boolean", description: "Is array attribute" },
      },
      required: ["databaseId", "collectionId", "key", "required"],
    },
  },
  {
    name: "list_attributes",
    description: "List all attributes in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
      },
      required: ["databaseId", "collectionId"],
    },
  },
  {
    name: "get_attribute",
    description: "Get attribute by key",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
      },
      required: ["databaseId", "collectionId", "key"],
    },
  },
  {
    name: "delete_attribute",
    description: "Delete attribute by key",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Attribute key" },
      },
      required: ["databaseId", "collectionId", "key"],
    },
  },

  // Relationship Attribute
  {
    name: "create_relationship_attribute",
    description: "Create a relationship attribute between two collections (1:1, 1:N, N:1, N:M)",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID (parent)" },
        relatedCollectionId: { type: "string", description: "Related collection ID" },
        type: { type: "string", enum: ["oneToOne", "oneToMany", "manyToOne", "manyToMany"], description: "Relationship type" },
        twoWay: { type: "boolean", description: "Create two-way relationship" },
        key: { type: "string", description: "Attribute key" },
        twoWayKey: { type: "string", description: "Two-way attribute key (for related collection)" },
        onDelete: { type: "string", enum: ["cascade", "restrict", "setNull"], description: "On delete behavior" },
      },
      required: ["databaseId", "collectionId", "relatedCollectionId", "type"],
    },
  },

  // Index Management
  {
    name: "create_index",
    description: "Create an index in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Index key/name" },
        type: { type: "string", enum: ["key", "unique", "fulltext"], description: "Index type" },
        attributes: { type: "array", items: { type: "string" }, description: "Attribute keys to index" },
        orders: { type: "array", items: { type: "string" }, description: "Order direction for each attribute (asc/desc)" },
      },
      required: ["databaseId", "collectionId", "key", "type", "attributes"],
    },
  },
  {
    name: "list_indexes",
    description: "List all indexes in a collection",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query strings for filtering" },
      },
      required: ["databaseId", "collectionId"],
    },
  },
  {
    name: "get_index",
    description: "Get index by key",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Index key" },
      },
      required: ["databaseId", "collectionId", "key"],
    },
  },
  {
    name: "delete_index",
    description: "Delete index by key",
    inputSchema: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Database ID" },
        collectionId: { type: "string", description: "Collection ID" },
        key: { type: "string", description: "Index key" },
      },
      required: ["databaseId", "collectionId", "key"],
    },
  },
];

export async function handleDatabaseTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown | null> {
  const databases = getDatabases();

  switch (name) {
    // Database Management
    case "create_database": {
      const databaseId = (args.databaseId as string) || ID.unique();
      return await databases.create(
        databaseId,
        args.name as string,
        args.enabled as boolean | undefined
      );
    }
    case "get_database": {
      return await databases.get(args.databaseId as string);
    }
    case "list_databases": {
      return await databases.list(
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "update_database": {
      return await databases.update(
        args.databaseId as string,
        args.name as string,
        args.enabled as boolean | undefined
      );
    }
    case "delete_database": {
      await databases.delete(args.databaseId as string);
      return { success: true, message: `Database ${args.databaseId} deleted` };
    }

    // Collection Management
    case "create_collection": {
      const collectionId = (args.collectionId as string) || ID.unique();
      return await databases.createCollection(
        args.databaseId as string,
        collectionId,
        args.name as string,
        args.permissions as string[] | undefined,
        args.documentSecurity as boolean | undefined,
        args.enabled as boolean | undefined
      );
    }
    case "get_collection": {
      return await databases.getCollection(
        args.databaseId as string,
        args.collectionId as string
      );
    }
    case "list_collections": {
      return await databases.listCollections(
        args.databaseId as string,
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "update_collection": {
      return await databases.updateCollection(
        args.databaseId as string,
        args.collectionId as string,
        args.name as string,
        args.permissions as string[] | undefined,
        args.documentSecurity as boolean | undefined,
        args.enabled as boolean | undefined
      );
    }
    case "delete_collection": {
      await databases.deleteCollection(
        args.databaseId as string,
        args.collectionId as string
      );
      return { success: true, message: `Collection ${args.collectionId} deleted` };
    }

    // Document Management
    case "create_document": {
      const documentId = (args.documentId as string) || ID.unique();
      return await databases.createDocument(
        args.databaseId as string,
        args.collectionId as string,
        documentId,
        args.data as Record<string, unknown>,
        args.permissions as string[] | undefined
      );
    }
    case "get_document": {
      return await databases.getDocument(
        args.databaseId as string,
        args.collectionId as string,
        args.documentId as string,
        args.queries as string[] | undefined
      );
    }
    case "list_documents": {
      return await databases.listDocuments(
        args.databaseId as string,
        args.collectionId as string,
        args.queries as string[] | undefined
      );
    }
    case "update_document": {
      return await databases.updateDocument(
        args.databaseId as string,
        args.collectionId as string,
        args.documentId as string,
        args.data as Record<string, unknown> | undefined,
        args.permissions as string[] | undefined
      );
    }
    case "delete_document": {
      await databases.deleteDocument(
        args.databaseId as string,
        args.collectionId as string,
        args.documentId as string
      );
      return { success: true, message: `Document ${args.documentId} deleted` };
    }

    // Attribute Management
    case "create_string_attribute": {
      return await databases.createStringAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.size as number,
        args.required as boolean,
        args.default as string | undefined,
        args.array as boolean | undefined,
        args.encrypt as boolean | undefined
      );
    }
    case "create_integer_attribute": {
      return await databases.createIntegerAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.required as boolean,
        args.min as number | undefined,
        args.max as number | undefined,
        args.default as number | undefined,
        args.array as boolean | undefined
      );
    }
    case "create_float_attribute": {
      return await databases.createFloatAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.required as boolean,
        args.min as number | undefined,
        args.max as number | undefined,
        args.default as number | undefined,
        args.array as boolean | undefined
      );
    }
    case "create_boolean_attribute": {
      return await databases.createBooleanAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.required as boolean,
        args.default as boolean | undefined,
        args.array as boolean | undefined
      );
    }
    case "create_email_attribute": {
      return await databases.createEmailAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.required as boolean,
        args.default as string | undefined,
        args.array as boolean | undefined
      );
    }
    case "create_enum_attribute": {
      return await databases.createEnumAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.elements as string[],
        args.required as boolean,
        args.default as string | undefined,
        args.array as boolean | undefined
      );
    }
    case "create_datetime_attribute": {
      return await databases.createDatetimeAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.required as boolean,
        args.default as string | undefined,
        args.array as boolean | undefined
      );
    }
    case "create_url_attribute": {
      return await databases.createUrlAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.required as boolean,
        args.default as string | undefined,
        args.array as boolean | undefined
      );
    }
    case "list_attributes": {
      return await databases.listAttributes(
        args.databaseId as string,
        args.collectionId as string,
        args.queries as string[] | undefined
      );
    }
    case "get_attribute": {
      return await databases.getAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string
      );
    }
    case "delete_attribute": {
      await databases.deleteAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string
      );
      return { success: true, message: `Attribute ${args.key} deleted` };
    }

    // Index Management
    case "create_index": {
      return await databases.createIndex(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string,
        args.type as IndexType,
        args.attributes as string[],
        args.orders as string[] | undefined
      );
    }
    case "list_indexes": {
      return await databases.listIndexes(
        args.databaseId as string,
        args.collectionId as string,
        args.queries as string[] | undefined
      );
    }
    case "get_index": {
      return await databases.getIndex(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string
      );
    }
    case "delete_index": {
      await databases.deleteIndex(
        args.databaseId as string,
        args.collectionId as string,
        args.key as string
      );
      return { success: true, message: `Index ${args.key} deleted` };
    }

    // Relationship Attribute
    case "create_relationship_attribute": {
      return await databases.createRelationshipAttribute(
        args.databaseId as string,
        args.collectionId as string,
        args.relatedCollectionId as string,
        args.type as RelationshipType,
        args.twoWay as boolean | undefined,
        args.key as string | undefined,
        args.twoWayKey as string | undefined,
        args.onDelete as RelationMutate | undefined
      );
    }

    default:
      return null;
  }
}
