# Appwrite MCP

MCP (Model Context Protocol) server for Appwrite - Enable AI agents to fully automate backend operations.

## Features

- **93 Tools** for complete Appwrite automation
- Databases, Users, Storage, Functions, Health, Messaging
- Relationship attributes for table linking
- File upload support (Base64)
- Email, SMS, Push notifications

## Comparison with Official Appwrite MCP

| Feature | Official MCP | @jun-b/appwrite-mcp |
|---------|-------------|---------------------|
| Total Tools | ~30 | **93** |
| Databases | Basic CRUD | Full CRUD + All Attribute Types |
| Relationship Attributes | No | **Yes** (1:1, 1:N, N:M) |
| File Upload | No | **Yes** (Base64) |
| Health Monitoring | No | **Yes** (Comprehensive) |
| Messaging (Email/SMS/Push) | No | **Yes** |
| User Management | Basic | **Full** (Sessions, Logs, Prefs) |
| Function Variables | No | **Yes** |

## Installation

```bash
npm install -g @jun-b/appwrite-mcp@latest
```

Or use directly with npx:

```bash
npx @jun-b/appwrite-mcp@latest --project-id <id> --api-key <key>
```

## Configuration

### Environment Variables

```bash
APPWRITE_PROJECT_ID="your-project-id"
APPWRITE_API_KEY="your-api-key"
APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"  # Optional
```

### CLI Arguments

```bash
npx @jun-b/appwrite-mcp@latest --project-id xxx --api-key xxx --endpoint xxx
```

## MCP Client Configuration

### Claude Desktop

Edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "appwrite": {
      "command": "npx",
      "args": ["-y", "@jun-b/appwrite-mcp@latest"],
      "env": {
        "APPWRITE_PROJECT_ID": "your-project-id",
        "APPWRITE_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Cursor

Edit `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "appwrite": {
      "command": "npx",
      "args": ["-y", "@jun-b/appwrite-mcp@latest"],
      "env": {
        "APPWRITE_PROJECT_ID": "your-project-id",
        "APPWRITE_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Antigravity IDE

Edit MCP settings with CLI arguments:

```json
{
  "mcpServers": {
    "appwrite": {
      "command": "npx",
      "args": [
        "-y",
        "@jun-b/appwrite-mcp@latest",
        "--project-id",
        "your-project-id",
        "--api-key",
        "your-api-key",
        "--endpoint",
        "https://cloud.appwrite.io/v1"
      ]
    }
  }
}
```

## Available Tools (93 Total)

### Databases (27 tools)

- `create_database`, `get_database`, `list_databases`, `update_database`, `delete_database`
- `create_collection`, `get_collection`, `list_collections`, `update_collection`, `delete_collection`
- `create_document`, `get_document`, `list_documents`, `update_document`, `delete_document`
- `create_string_attribute`, `create_integer_attribute`, `create_float_attribute`, `create_boolean_attribute`
- `create_email_attribute`, `create_enum_attribute`, `create_datetime_attribute`, `create_url_attribute`
- `create_relationship_attribute` - Create relationships (1:1, 1:N, N:M)
- `list_attributes`, `get_attribute`, `delete_attribute`
- `create_index`, `list_indexes`, `get_index`, `delete_index`

### Users (13 tools)

- `create_user`, `get_user`, `list_users`, `delete_user`
- `update_user` - Update email, name, password, phone in one call
- `update_user_labels`, `update_user_status`, `update_user_prefs`, `get_user_prefs`
- `list_user_sessions`, `delete_user_sessions` - Delete specific or all sessions
- `list_user_memberships`, `list_user_logs`

### Storage (11 tools)

- `create_bucket`, `get_bucket`, `list_buckets`, `update_bucket`, `delete_bucket`
- `create_file` - Upload files (Base64 encoded)
- `get_file`, `list_files`, `update_file`, `delete_file`
- `get_file_url` - Get download or view URL

### Functions (15 tools)

- `create_function`, `get_function`, `list_functions`, `update_function`, `delete_function`
- `create_execution`, `get_execution`, `list_executions`, `delete_execution`
- `create_variable`, `get_variable`, `list_variables`, `update_variable`, `delete_variable`
- `list_runtimes`

### Health (5 tools)

- `get_health`, `get_health_db`, `get_health_cache`, `get_health_storage`
- `get_health_all` - Comprehensive health check (HTTP, DB, cache, storage, time)

### Messaging (18 tools)

- `create_topic`, `get_topic`, `list_topics`, `update_topic`, `delete_topic`
- `create_subscriber`, `list_subscribers`, `delete_subscriber`
- `create_email`, `create_sms`, `create_push`
- `get_message`, `list_messages`, `delete_message`
- `list_providers`, `get_provider`, `delete_provider`, `create_smtp_provider`

## License

MIT
