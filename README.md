# Appwrite MCP

MCP (Model Context Protocol) server for Appwrite - Enable AI agents to fully automate backend operations.

## Features

- **143 Tools** for complete Appwrite automation
- Databases, Users, Storage, Functions, Health, Messaging, Teams, Avatars, Locale, GraphQL
- GeoJSON attributes (Point, Polygon) for location-based services
- Relationship attributes for table linking
- File upload support (Base64)
- Function deployment with code upload
- Email, SMS, Push notifications
- Bulk document operations

## Realtime Support

> **Note**: Appwrite Realtime (WebSocket) is automatically available for all collections you create!

MCP tools are used to **build and configure** your backend. Once set up, your client apps can use Appwrite's Client SDK to subscribe to Realtime events:

```javascript
// After creating collections with MCP tools, your client app can:
import { Client } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('your-project-id');

// Subscribe to document changes in a collection
client.subscribe('databases.mydb.collections.messages.documents', (response) => {
  console.log('Document changed:', response.payload);
});
```

**No additional configuration needed** - Realtime works automatically with the database structures you create.

## Comparison with Official Appwrite MCP

| Feature | Official MCP | @jun-b/appwrite-mcp |
|---------|-------------|---------------------|
| Total Tools | ~30 | **143** |
| Databases | Basic CRUD | Full CRUD + All Attribute Types + Bulk Ops |
| GeoJSON Attributes | No | **Yes** (Point, Polygon) |
| Relationship Attributes | No | **Yes** (1:1, 1:N, N:M) |
| File Upload | No | **Yes** (Base64) |
| Function Deployment | No | **Yes** (Code upload) |
| GraphQL API | No | **Yes** |
| Health Monitoring | No | **Yes** (Comprehensive) |
| Messaging (Email/SMS/Push) | No | **Yes** |
| Teams Management | No | **Yes** |
| Avatars/QR Codes | No | **Yes** |
| Localization | No | **Yes** |
| User Management | Basic | **Full** (Sessions, Logs, Prefs) |
| Attribute Updates | No | **Yes** (All types) |

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

## Available Tools (143 Total)

### Databases (49 tools)

**CRUD Operations:**
- `create_database`, `get_database`, `list_databases`, `update_database`, `delete_database`
- `create_collection`, `get_collection`, `list_collections`, `update_collection`, `delete_collection`
- `create_document`, `get_document`, `list_documents`, `update_document`, `delete_document`

**Bulk Operations:**
- `create_documents` - Create multiple documents at once
- `update_documents` - Update multiple documents by query
- `delete_documents` - Delete multiple documents by query
- `upsert_document` - Create or update (upsert)

**Atomic Operations:**
- `increment_document_attribute` - Atomically increment numeric values

**Attribute Creation:**
- `create_string_attribute`, `create_integer_attribute`, `create_float_attribute`, `create_boolean_attribute`
- `create_email_attribute`, `create_enum_attribute`, `create_datetime_attribute`, `create_url_attribute`
- `create_ip_attribute`, `create_relationship_attribute`
- `create_point_attribute` - GeoJSON Point for coordinates
- `create_polygon_attribute` - GeoJSON Polygon for geographic boundaries

**Attribute Updates:**
- `update_string_attribute`, `update_integer_attribute`, `update_float_attribute`, `update_boolean_attribute`
- `update_email_attribute`, `update_enum_attribute`, `update_datetime_attribute`, `update_url_attribute`
- `update_ip_attribute`, `update_relationship_attribute`

**Index & Attribute Management:**
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

### Functions (20 tools)

**Function Management:**
- `create_function`, `get_function`, `list_functions`, `update_function`, `delete_function`

**Deployment Management:**
- `create_deployment` - Upload function code (Base64 tar.gz)
- `get_deployment`, `list_deployments`, `update_deployment`, `delete_deployment`

**Execution:**
- `create_execution`, `get_execution`, `list_executions`, `delete_execution`

**Variables:**
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

### Teams (11 tools)

**Team Management:**
- `create_team`, `get_team`, `list_teams`, `update_team`, `delete_team`, `update_team_prefs`

**Membership Management:**
- `create_membership`, `get_membership`, `list_memberships`, `update_membership`, `delete_membership`

### Avatars (7 tools)

- `get_avatar_initials` - Generate initials avatar
- `get_avatar_image` - Get avatar from URL
- `get_qr_code` - Generate QR code
- `get_favicon` - Get website favicon
- `get_browser_icon` - Get browser icon
- `get_credit_card_icon` - Get credit card provider icon
- `get_flag` - Get country flag

### Locale (7 tools)

- `list_countries` - List all countries
- `list_countries_eu` - List EU countries
- `list_countries_phones` - List countries with phone codes
- `list_continents` - List all continents
- `list_languages` - List all languages
- `list_currencies` - List all currencies
- `list_codes` - List locale codes

### GraphQL (2 tools)

- `graphql_query` - Execute GraphQL queries
- `graphql_mutation` - Execute GraphQL mutations

## License

MIT
