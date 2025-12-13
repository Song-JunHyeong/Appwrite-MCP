import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getMessaging } from "../appwrite-client.js";
import { ID, MessagePriority, SmtpEncryption } from "node-appwrite";

export const messagingTools: Tool[] = [
  // Topic Management
  {
    name: "create_topic",
    description: "Create a messaging topic for grouping subscribers",
    inputSchema: {
      type: "object",
      properties: {
        topicId: { type: "string", description: "Unique topic ID" },
        name: { type: "string", description: "Topic name" },
        subscribe: { type: "array", items: { type: "string" }, description: "Roles that can subscribe" },
      },
      required: ["name"],
    },
  },
  {
    name: "get_topic",
    description: "Get topic by ID",
    inputSchema: {
      type: "object",
      properties: {
        topicId: { type: "string", description: "Topic ID" },
      },
      required: ["topicId"],
    },
  },
  {
    name: "list_topics",
    description: "List all topics",
    inputSchema: {
      type: "object",
      properties: {
        queries: { type: "array", items: { type: "string" }, description: "Query filters" },
        search: { type: "string", description: "Search term" },
      },
    },
  },
  {
    name: "update_topic",
    description: "Update topic by ID",
    inputSchema: {
      type: "object",
      properties: {
        topicId: { type: "string", description: "Topic ID" },
        name: { type: "string", description: "Topic name" },
        subscribe: { type: "array", items: { type: "string" }, description: "Roles that can subscribe" },
      },
      required: ["topicId"],
    },
  },
  {
    name: "delete_topic",
    description: "Delete topic by ID",
    inputSchema: {
      type: "object",
      properties: {
        topicId: { type: "string", description: "Topic ID" },
      },
      required: ["topicId"],
    },
  },

  // Subscriber Management
  {
    name: "create_subscriber",
    description: "Add a subscriber to a topic",
    inputSchema: {
      type: "object",
      properties: {
        topicId: { type: "string", description: "Topic ID" },
        subscriberId: { type: "string", description: "Subscriber ID" },
        targetId: { type: "string", description: "Target ID (user target)" },
      },
      required: ["topicId", "subscriberId", "targetId"],
    },
  },
  {
    name: "list_subscribers",
    description: "List subscribers of a topic",
    inputSchema: {
      type: "object",
      properties: {
        topicId: { type: "string", description: "Topic ID" },
        queries: { type: "array", items: { type: "string" }, description: "Query filters" },
        search: { type: "string", description: "Search term" },
      },
      required: ["topicId"],
    },
  },
  {
    name: "delete_subscriber",
    description: "Remove a subscriber from a topic",
    inputSchema: {
      type: "object",
      properties: {
        topicId: { type: "string", description: "Topic ID" },
        subscriberId: { type: "string", description: "Subscriber ID" },
      },
      required: ["topicId", "subscriberId"],
    },
  },

  // Email Messages
  {
    name: "create_email",
    description: "Create and send an email message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: { type: "string", description: "Message ID" },
        subject: { type: "string", description: "Email subject" },
        content: { type: "string", description: "Email body (HTML supported)" },
        topics: { type: "array", items: { type: "string" }, description: "Topic IDs to send to" },
        users: { type: "array", items: { type: "string" }, description: "User IDs to send to" },
        targets: { type: "array", items: { type: "string" }, description: "Target IDs to send to" },
        cc: { type: "array", items: { type: "string" }, description: "CC email addresses" },
        bcc: { type: "array", items: { type: "string" }, description: "BCC email addresses" },
        draft: { type: "boolean", description: "Save as draft" },
        html: { type: "boolean", description: "Content is HTML" },
        scheduledAt: { type: "string", description: "Schedule time (ISO 8601)" },
      },
      required: ["subject", "content"],
    },
  },

  // SMS Messages
  {
    name: "create_sms",
    description: "Create and send an SMS message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: { type: "string", description: "Message ID" },
        content: { type: "string", description: "SMS content" },
        topics: { type: "array", items: { type: "string" }, description: "Topic IDs" },
        users: { type: "array", items: { type: "string" }, description: "User IDs" },
        targets: { type: "array", items: { type: "string" }, description: "Target IDs" },
        draft: { type: "boolean", description: "Save as draft" },
        scheduledAt: { type: "string", description: "Schedule time (ISO 8601)" },
      },
      required: ["content"],
    },
  },

  // Push Notifications
  {
    name: "create_push",
    description: "Create and send a push notification",
    inputSchema: {
      type: "object",
      properties: {
        messageId: { type: "string", description: "Message ID" },
        title: { type: "string", description: "Notification title" },
        body: { type: "string", description: "Notification body" },
        topics: { type: "array", items: { type: "string" }, description: "Topic IDs" },
        users: { type: "array", items: { type: "string" }, description: "User IDs" },
        targets: { type: "array", items: { type: "string" }, description: "Target IDs" },
        data: { type: "object", description: "Custom data payload" },
        action: { type: "string", description: "Click action URL" },
        icon: { type: "string", description: "Icon URL" },
        sound: { type: "string", description: "Sound file" },
        color: { type: "string", description: "Notification color" },
        tag: { type: "string", description: "Notification tag" },
        badge: { type: "integer", description: "Badge count" },
        draft: { type: "boolean", description: "Save as draft" },
        scheduledAt: { type: "string", description: "Schedule time (ISO 8601)" },
      },
      required: ["title", "body"],
    },
  },

  // Message Management
  {
    name: "get_message",
    description: "Get message by ID",
    inputSchema: {
      type: "object",
      properties: {
        messageId: { type: "string", description: "Message ID" },
      },
      required: ["messageId"],
    },
  },
  {
    name: "list_messages",
    description: "List all messages",
    inputSchema: {
      type: "object",
      properties: {
        queries: { type: "array", items: { type: "string" }, description: "Query filters" },
        search: { type: "string", description: "Search term" },
      },
    },
  },
  {
    name: "delete_message",
    description: "Delete message by ID",
    inputSchema: {
      type: "object",
      properties: {
        messageId: { type: "string", description: "Message ID" },
      },
      required: ["messageId"],
    },
  },

  // Provider Management
  {
    name: "list_providers",
    description: "List all messaging providers",
    inputSchema: {
      type: "object",
      properties: {
        queries: { type: "array", items: { type: "string" }, description: "Query filters" },
        search: { type: "string", description: "Search term" },
      },
    },
  },
  {
    name: "get_provider",
    description: "Get provider by ID",
    inputSchema: {
      type: "object",
      properties: {
        providerId: { type: "string", description: "Provider ID" },
      },
      required: ["providerId"],
    },
  },
  {
    name: "delete_provider",
    description: "Delete provider by ID",
    inputSchema: {
      type: "object",
      properties: {
        providerId: { type: "string", description: "Provider ID" },
      },
      required: ["providerId"],
    },
  },

  // SMTP Provider
  {
    name: "create_smtp_provider",
    description: "Create SMTP email provider",
    inputSchema: {
      type: "object",
      properties: {
        providerId: { type: "string", description: "Provider ID" },
        name: { type: "string", description: "Provider name" },
        host: { type: "string", description: "SMTP host" },
        port: { type: "integer", description: "SMTP port" },
        username: { type: "string", description: "SMTP username" },
        password: { type: "string", description: "SMTP password" },
        encryption: { type: "string", enum: ["none", "ssl", "tls"], description: "Encryption type" },
        autoTLS: { type: "boolean", description: "Auto TLS" },
        mailer: { type: "string", description: "Mailer name" },
        fromName: { type: "string", description: "From name" },
        fromEmail: { type: "string", description: "From email" },
        replyToName: { type: "string", description: "Reply-to name" },
        replyToEmail: { type: "string", description: "Reply-to email" },
        enabled: { type: "boolean", description: "Enable provider" },
      },
      required: ["name", "host"],
    },
  },
];

export async function handleMessagingTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown | null> {
  const messaging = getMessaging();

  switch (name) {
    // Topic Management
    case "create_topic": {
      const topicId = (args.topicId as string) || ID.unique();
      return await messaging.createTopic(
        topicId,
        args.name as string,
        args.subscribe as string[] | undefined
      );
    }
    case "get_topic": {
      return await messaging.getTopic(args.topicId as string);
    }
    case "list_topics": {
      return await messaging.listTopics(
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "update_topic": {
      return await messaging.updateTopic(
        args.topicId as string,
        args.name as string | undefined,
        args.subscribe as string[] | undefined
      );
    }
    case "delete_topic": {
      await messaging.deleteTopic(args.topicId as string);
      return { success: true, message: `Topic ${args.topicId} deleted` };
    }

    // Subscriber Management
    case "create_subscriber": {
      return await messaging.createSubscriber(
        args.topicId as string,
        args.subscriberId as string,
        args.targetId as string
      );
    }
    case "list_subscribers": {
      return await messaging.listSubscribers(
        args.topicId as string,
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "delete_subscriber": {
      await messaging.deleteSubscriber(
        args.topicId as string,
        args.subscriberId as string
      );
      return { success: true, message: `Subscriber ${args.subscriberId} removed` };
    }

    // Email Messages
    case "create_email": {
      const messageId = (args.messageId as string) || ID.unique();
      return await messaging.createEmail(
        messageId,
        args.subject as string,
        args.content as string,
        args.topics as string[] | undefined,
        args.users as string[] | undefined,
        args.targets as string[] | undefined,
        args.cc as string[] | undefined,
        args.bcc as string[] | undefined,
        undefined, // attachments
        args.draft as boolean | undefined,
        args.html as boolean | undefined,
        args.scheduledAt as string | undefined
      );
    }

    // SMS Messages
    case "create_sms": {
      const messageId = (args.messageId as string) || ID.unique();
      return await messaging.createSms(
        messageId,
        args.content as string,
        args.topics as string[] | undefined,
        args.users as string[] | undefined,
        args.targets as string[] | undefined,
        args.draft as boolean | undefined,
        args.scheduledAt as string | undefined
      );
    }

    // Push Notifications
    case "create_push": {
      const messageId = (args.messageId as string) || ID.unique();
      // Note: Using simplified call with essential parameters
      return await (messaging as any).createPush(
        messageId,
        args.title as string,
        args.body as string,
        args.topics as string[] | undefined,
        args.users as string[] | undefined,
        args.targets as string[] | undefined,
        args.data as Record<string, string> | undefined,
        args.action as string | undefined,
        args.icon as string | undefined,
        args.sound as string | undefined,
        args.color as string | undefined,
        args.tag as string | undefined,
        args.badge as number | undefined,
        args.draft as boolean | undefined,
        args.scheduledAt as string | undefined
      );
    }

    // Message Management
    case "get_message": {
      return await messaging.getMessage(args.messageId as string);
    }
    case "list_messages": {
      return await messaging.listMessages(
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "delete_message": {
      await messaging.delete(args.messageId as string);
      return { success: true, message: `Message ${args.messageId} deleted` };
    }

    // Provider Management
    case "list_providers": {
      return await messaging.listProviders(
        args.queries as string[] | undefined,
        args.search as string | undefined
      );
    }
    case "get_provider": {
      return await messaging.getProvider(args.providerId as string);
    }
    case "delete_provider": {
      await messaging.deleteProvider(args.providerId as string);
      return { success: true, message: `Provider ${args.providerId} deleted` };
    }

    // SMTP Provider
    case "create_smtp_provider": {
      const providerId = (args.providerId as string) || ID.unique();
      return await messaging.createSmtpProvider(
        providerId,
        args.name as string,
        args.host as string,
        args.port as number | undefined,
        args.username as string | undefined,
        args.password as string | undefined,
        args.encryption as SmtpEncryption | undefined,
        args.autoTLS as boolean | undefined,
        args.mailer as string | undefined,
        args.fromName as string | undefined,
        args.fromEmail as string | undefined,
        args.replyToName as string | undefined,
        args.replyToEmail as string | undefined,
        args.enabled as boolean | undefined
      );
    }

    default:
      return null;
  }
}
