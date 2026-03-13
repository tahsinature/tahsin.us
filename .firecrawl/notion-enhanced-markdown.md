[Skip to main content](https://developers.notion.com/guides/data-apis/working-with-markdown-content#content-area)

[Notion Docs home page![light logo](https://mintcdn.com/notion-demo/gxhrU3D49w5WpEjL/logo/light.svg?fit=max&auto=format&n=gxhrU3D49w5WpEjL&q=85&s=3ff0c52eacba5d25a47ee2e6861bf6b2)![dark logo](https://mintcdn.com/notion-demo/gxhrU3D49w5WpEjL/logo/dark.svg?fit=max&auto=format&n=gxhrU3D49w5WpEjL&q=85&s=1eab3903c1679ca77980622998633397)](https://developers.notion.com/)

Search...

Ctrl KAsk AI

Search...

Navigation

Working with markdown content

Working with markdown content

[Home](https://developers.notion.com/) [Guides](https://developers.notion.com/guides/get-started/getting-started) [API Reference](https://developers.notion.com/reference/intro) [Changelog](https://developers.notion.com/page/changelog) [Examples](https://developers.notion.com/page/examples)

- [Status](https://www.notion-status.com/)
- [Community](https://www.notion.com/community)
- [Blog](https://www.notion.com/blog)

##### Get started

- [Overview](https://developers.notion.com/guides/get-started/getting-started)
- [Build your first integration](https://developers.notion.com/guides/get-started/create-a-notion-integration)
- [Authorization](https://developers.notion.com/guides/get-started/authorization)
- [Publishing to Notion’s integration gallery](https://developers.notion.com/guides/get-started/publishing-integrations-to-notions-integration-gallery)
- Upgrading to 2026-03-11

- Upgrading to 2025-09-03


##### Agent APIs

- Notion MCP

- Custom agents


##### Data APIs

- [Working with page content](https://developers.notion.com/guides/data-apis/working-with-page-content)
- Working with databases

- [Working with comments](https://developers.notion.com/guides/data-apis/working-with-comments)
- Working with markdown content

  - [Working with markdown content](https://developers.notion.com/guides/data-apis/working-with-markdown-content)
  - [Enhanced markdown format](https://developers.notion.com/guides/data-apis/enhanced-markdown)
- Working with files and media


##### Link previews

- [Introduction](https://developers.notion.com/guides/link-previews/link-previews)
- [Build a link preview integration](https://developers.notion.com/guides/link-previews/build-a-link-preview-integration)

##### Resources

- [Best practices for handling API keys](https://developers.notion.com/guides/resources/best-practices-for-handling-api-keys)
- [Example code](https://developers.notion.com/page/examples)
- [Postman workspace](https://www.postman.com/notionhq/notion-s-api-workspace/collection/52041987-03f70d8f-b6e5-4306-805c-f95f7cdf05b9)
- [Historical changelog](https://developers.notion.com/guides/resources/historical-changelog)

##### Compliance

- [Compliance](https://developers.notion.com/compliance/overview)
- Event reference


On this page

- [Overview](https://developers.notion.com/guides/data-apis/working-with-markdown-content#overview)
- [Block type support](https://developers.notion.com/guides/data-apis/working-with-markdown-content#block-type-support)
- [Supported block types](https://developers.notion.com/guides/data-apis/working-with-markdown-content#supported-block-types)
- [Unsupported block types](https://developers.notion.com/guides/data-apis/working-with-markdown-content#unsupported-block-types)
- [Creating a page with markdown](https://developers.notion.com/guides/data-apis/working-with-markdown-content#creating-a-page-with-markdown)
- [Retrieving a page as markdown](https://developers.notion.com/guides/data-apis/working-with-markdown-content#retrieving-a-page-as-markdown)
- [Query parameters](https://developers.notion.com/guides/data-apis/working-with-markdown-content#query-parameters)
- [Unknown blocks, truncation, and permissions](https://developers.notion.com/guides/data-apis/working-with-markdown-content#unknown-blocks-truncation-and-permissions)
- [Updating a page with markdown](https://developers.notion.com/guides/data-apis/working-with-markdown-content#updating-a-page-with-markdown)
- [Updating content with search-and-replace](https://developers.notion.com/guides/data-apis/working-with-markdown-content#updating-content-with-search-and-replace)
- [Replacing all page content](https://developers.notion.com/guides/data-apis/working-with-markdown-content#replacing-all-page-content)
- [Legacy commands](https://developers.notion.com/guides/data-apis/working-with-markdown-content#legacy-commands)
- [Safety: protecting child pages and databases](https://developers.notion.com/guides/data-apis/working-with-markdown-content#safety-protecting-child-pages-and-databases)
- [Update response](https://developers.notion.com/guides/data-apis/working-with-markdown-content#update-response)
- [Error responses](https://developers.notion.com/guides/data-apis/working-with-markdown-content#error-responses)
- [Meeting note transcripts](https://developers.notion.com/guides/data-apis/working-with-markdown-content#meeting-note-transcripts)
- [Access control summary](https://developers.notion.com/guides/data-apis/working-with-markdown-content#access-control-summary)

## [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#overview)  Overview

The Notion API supports reading, writing, and updating page content using **enhanced markdown** (also called “Notion-flavored Markdown”) as an alternative to the [block-based API](https://developers.notion.com/guides/data-apis/working-with-page-content). This is especially useful for agentic systems and developer tools that work natively with markdown.Three API surfaces are available:

| Operation | Endpoint | Description |
| --- | --- | --- |
| Create | `POST /v1/pages` | Create a page with markdown content (via `markdown` body param) |
| Read | `GET /v1/pages/:page_id/markdown` | Retrieve a page’s full content as markdown |
| Update | `PATCH /v1/pages/:page_id/markdown` | Insert or replace content using markdown |

All three endpoints use the same **enhanced markdown** format. See the [Enhanced markdown format reference](https://developers.notion.com/guides/data-apis/enhanced-markdown) for the full specification.

## [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#block-type-support)  Block type support

The markdown API supports most Notion block types. The table below shows how each block type maps to its markdown representation.

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#supported-block-types)  Supported block types

| Block type | Markdown format |
| --- | --- |
| [Paragraph](https://developers.notion.com/reference/block#paragraph) | Plain text |
| [Heading 1 / 2 / 3](https://developers.notion.com/reference/block#headings) | `#` / `##` / `###` |
| [Bulleted list item](https://developers.notion.com/reference/block#bulleted-list-item) | `- item` |
| [Numbered list item](https://developers.notion.com/reference/block#numbered-list-item) | `1. item` |
| [To do](https://developers.notion.com/reference/block#to-do) | `- [ ]` / `- [x]` |
| [Toggle](https://developers.notion.com/reference/block#toggle-blocks) | `<details>` / `<summary>` |
| [Quote](https://developers.notion.com/reference/block#quote) | `> quote` |
| [Callout](https://developers.notion.com/reference/block#callout) | `<callout>` |
| [Divider](https://developers.notion.com/reference/block#divider) | `---` |
| [Code](https://developers.notion.com/reference/block#code) | Fenced code block with language |
| [Equation](https://developers.notion.com/reference/block#equation) | `$$ equation $$` |
| [Table](https://developers.notion.com/reference/block#table) | `<table>` with `<tr>` and `<td>` |
| [Image](https://developers.notion.com/reference/block#image) | `![caption](url)` |
| [File](https://developers.notion.com/reference/block#file) | `<file src="url">caption</file>` |
| [Video](https://developers.notion.com/reference/block#video) | `<video src="url">caption</video>` |
| [Audio](https://developers.notion.com/reference/block#audio) | `<audio src="url">caption</audio>` |
| [PDF](https://developers.notion.com/reference/block#pdf) | `<pdf src="url">caption</pdf>` |
| [Child page](https://developers.notion.com/reference/block#child-page) | `<page url="...">title</page>` |
| [Child database](https://developers.notion.com/reference/block#child-database) | `<database url="...">title</database>` |
| [Synced block](https://developers.notion.com/reference/block#synced-block) | `<synced_block>` with content |
| [Column list / Column](https://developers.notion.com/reference/block#column-list-and-column) | `<columns>` / `<column>` |
| [Table of contents](https://developers.notion.com/reference/block#table-of-contents) | `<table_of_contents/>` |
| [Transcription](https://developers.notion.com/reference/block#transcription) | `<meeting-notes>` (transcript included when `include_transcript=true`) |

For file-based blocks (image, file, video, audio, PDF), the URLs in the markdown output are pre-signed and ready to download. They expire after a short period, consistent with the [block-based API](https://developers.notion.com/reference/block#file).

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#unsupported-block-types)  Unsupported block types

The following block types are not yet rendered in the markdown output. When encountered, they appear as `<unknown url="..." alt="block_type"/>` tags. The `url` links to the block in Notion, and `alt` indicates the original block type.

| Block type | Notes |
| --- | --- |
| [Bookmark](https://developers.notion.com/reference/block#bookmark) | Web bookmarks with URL previews |
| [Embed](https://developers.notion.com/reference/block#embed) | Embedded third-party content |
| [Link preview](https://developers.notion.com/reference/block#link-preview) | Unfurled URL previews |
| [Breadcrumb](https://developers.notion.com/reference/block#breadcrumb) | Navigation breadcrumbs |
| [Template](https://developers.notion.com/reference/block#template) | Template buttons (deprecated) |

Block types that are not recognized by the block API (returned as `"unsupported"`) will also appear as `<unknown>` in the markdown output.

You can use the [block-based API](https://developers.notion.com/reference/block) to retrieve structured data for any unsupported block types you encounter in the markdown output.

## [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#creating-a-page-with-markdown)  Creating a page with markdown

Use `POST /v1/pages` with the `markdown` parameter instead of `children` to create a page from a markdown string.

The `markdown` field expects actual newline characters. In JSON, use `\n` to encode them — for example, `"# Heading\n\nParagraph"`. When using cURL, wrap the `--data` body in **single quotes** so that `\n` is preserved for the JSON parser.

cURL

JavaScript

Report incorrect code

Copy

Ask AI

```
curl -X POST https://api.notion.com/v1/pages \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2026-03-11" \
  --data '{
    "parent": { "page_id": "YOUR_PAGE_ID" },
    "markdown": "# Meeting Notes\n\nDiscussed roadmap priorities.\n\n## Action items\n\n- [ ] Draft proposal\n- [ ] Schedule follow-up"
  }'
```

**Key behaviors:**

- The `markdown` parameter is mutually exclusive with `children` and `content`. You cannot use both.
- If `properties.title` is omitted, the first `# h1` heading is extracted as the page title.
- Available to all integration types (public and internal).
- Requires `insert_content` and `insert_property` capabilities.

The response is a standard [page object](https://developers.notion.com/reference/page).

## [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#retrieving-a-page-as-markdown)  Retrieving a page as markdown

Use `GET /v1/pages/:page_id/markdown` to retrieve a page’s content rendered as enhanced markdown.

cURL

JavaScript

Report incorrect code

Copy

Ask AI

```
curl 'https://api.notion.com/v1/pages/YOUR_PAGE_ID/markdown' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Notion-Version: 2026-03-11"
```

**Response:**

Report incorrect code

Copy

Ask AI

```
{
  "object": "page_markdown",
  "id": "page-uuid",
  "markdown": "# Meeting Notes\n\nDiscussed roadmap priorities.\n\n## Action items\n\n- [ ] Draft proposal\n- [ ] Schedule follow-up",
  "truncated": false,
  "unknown_block_ids": []
}
```

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#query-parameters)  Query parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `include_transcript` | boolean | Include meeting note transcripts (default: `false`). |

cURL (with transcript)

JavaScript

Report incorrect code

Copy

Ask AI

```
curl 'https://api.notion.com/v1/pages/YOUR_PAGE_ID/markdown?include_transcript=true' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Notion-Version: 2026-03-11"
```

**Key behaviors:**

- Available to all integration types (public and internal).
- Requires `read_content` capability.
- File URIs in the content are automatically converted to pre-signed URLs.

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#unknown-blocks-truncation-and-permissions)  Unknown blocks, truncation, and permissions

Some blocks in a page may appear as `<unknown>` tags in the markdown output. This can happen for two reasons:

1. **Truncation** — the page exceeds the record limit (approximately 20,000 blocks) and some blocks were not loaded.
2. **Permissions** — the page contains child pages or other content that is not shared with the integration. The integration can access the parent page, but not those specific child blocks.

In both cases:

- The `truncated` field is set to `true`.
- The affected blocks appear as `<unknown url="..." alt="..."/>` tags in the markdown.
- The `unknown_block_ids` array contains the IDs of these blocks.

Report incorrect code

Copy

Ask AI

```
{
  "object": "page_markdown",
  "id": "page-uuid",
  "markdown": "# Large Document\n\nFirst section content...\n\n<unknown url=\"https://notion.so/abc123#def456\"/>",
  "truncated": true,
  "unknown_block_ids": ["def456-with-dashes-uuid"]
}
```

You can attempt to fetch the content of unknown blocks by passing their IDs back to the same endpoint:

cURL (fetching an unknown block)

JavaScript

Report incorrect code

Copy

Ask AI

```
curl 'https://api.notion.com/v1/pages/UNKNOWN_BLOCK_ID/markdown' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Notion-Version: 2026-03-11"
```

For blocks that were unknown due to truncation, this returns the subtree rooted at that block. For blocks that are unknown due to permissions, the request returns an `object_not_found` error — the integration does not have access to that content.

The `unknown_block_ids` array does not distinguish between truncated and inaccessible blocks. When re-fetching unknown block IDs, handle `object_not_found` errors gracefully as they indicate blocks the integration cannot access.

For the best experience, keep pages under a few thousand blocks. Very large pages may require multiple requests to fully retrieve.

**Example: iteratively fetching a large page**

Python

JavaScript

Report incorrect code

Copy

Ask AI

```
import requests

headers = {
    "Authorization": f"Bearer {NOTION_API_KEY}",
    "Notion-Version": "2026-03-11",
}

resp = requests.get(
    f"https://api.notion.com/v1/pages/{page_id}/markdown",
    headers=headers,
).json()

all_markdown = resp["markdown"]

for block_id in resp.get("unknown_block_ids", []):
    block_resp = requests.get(
        f"https://api.notion.com/v1/pages/{block_id}/markdown",
        headers=headers,
    ).json()
    all_markdown += "\n" + block_resp["markdown"]
```

## [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#updating-a-page-with-markdown)  Updating a page with markdown

Use `PATCH /v1/pages/:page_id/markdown` to insert or replace content in an existing page using markdown.The request body uses a **discriminated union** with four command variants. We recommend `update_content` and `replace_content` for new integrations — they offer more precise control and better performance than the older `insert_content` and `replace_content_range` commands.

The `content` field expects standard markdown with actual newline characters. In your JSON request body, use `\n` to encode newlines — for example, `"## Heading\n\nParagraph text"` creates a heading followed by a paragraph. Literal backslash-n sequences (like typing `\n` into a form field) will not be interpreted as newlines.When using cURL, wrap the `--data` body in **single quotes** so that `\n` is preserved for the JSON parser. Avoid `$'...'` quoting, which converts `\n` into a literal newline and produces invalid JSON.

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#updating-content-with-search-and-replace)  Updating content with search-and-replace

Use `update_content` to make targeted edits with an array of search-and-replace operations. Each operation specifies `old_str` (content to find) and `new_str` (replacement content).

cURL

JavaScript

Report incorrect code

Copy

Ask AI

```
curl -X PATCH 'https://api.notion.com/v1/pages/YOUR_PAGE_ID/markdown' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2026-03-11" \
  --data '{
    "type": "update_content",
    "update_content": {
      "content_updates": [\
        {\
          "old_str": "Draft proposal",\
          "new_str": "Draft proposal (due Friday)"\
        },\
        {\
          "old_str": "Schedule follow-up",\
          "new_str": "Schedule follow-up with design team"\
        }\
      ]
    }
  }'
```

Each `old_str` must match exactly one location in the page. If it matches multiple locations, a `validation_error` is returned — set `replace_all_matches: true` on that operation to replace all occurrences.

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#replacing-all-page-content)  Replacing all page content

Use `replace_content` to replace the entire page content with new markdown.

cURL

JavaScript

Report incorrect code

Copy

Ask AI

```
curl -X PATCH 'https://api.notion.com/v1/pages/YOUR_PAGE_ID/markdown' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2026-03-11" \
  --data '{
    "type": "replace_content",
    "replace_content": {
      "new_str": "# Fresh Start\n\nThis replaces all previous content."
    }
  }'
```

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#legacy-commands)  Legacy commands

The `insert_content` and `replace_content_range` commands are still supported but are no longer recommended. They use an ellipsis-based selection format that is less precise than the search-and-replace approach of `update_content`. New integrations should use `update_content` or `replace_content` instead.

insert\_content (legacy)

Insert new markdown content after a specific point in the page, or append to the end.

cURL (insert after selection)

JavaScript

Report incorrect code

Copy

Ask AI

```
curl -X PATCH 'https://api.notion.com/v1/pages/YOUR_PAGE_ID/markdown' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2026-03-11" \
  --data '{
    "type": "insert_content",
    "insert_content": {
      "content": "## New Section\n\nInserted content here.",
      "after": "# Meeting Notes...Action items"
    }
  }'
```

cURL (append to end)

JavaScript

Report incorrect code

Copy

Ask AI

```
curl -X PATCH 'https://api.notion.com/v1/pages/YOUR_PAGE_ID/markdown' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2026-03-11" \
  --data '{
    "type": "insert_content",
    "insert_content": {
      "content": "## Appendix\n\nAdded at the end of the page."
    }
  }'
```

The `after` parameter uses an **ellipsis-based selection** format: `"start text...end text"`. This matches a range from the first occurrence of the start text to the end text. When `after` is omitted, content is appended to the end of the page.

replace\_content\_range (legacy)

Replace a matched range of existing content with new markdown.

cURL

JavaScript

Report incorrect code

Copy

Ask AI

```
curl -X PATCH 'https://api.notion.com/v1/pages/YOUR_PAGE_ID/markdown' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2026-03-11" \
  --data '{
    "type": "replace_content_range",
    "replace_content_range": {
      "content": "## Updated Section\n\nNew content replaces the old.",
      "content_range": "## Old Section...end of old content"
    }
  }'
```

The `content_range` parameter uses the same ellipsis-based selection as `after`.

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#safety-protecting-child-pages-and-databases)  Safety: protecting child pages and databases

By default, the update endpoint refuses to delete child pages or databases. If an operation would delete them, a `validation_error` is returned listing the affected items.To allow deletion, set `allow_deleting_content: true` in the command body. This option is supported by `replace_content_range`, `update_content`, and `replace_content`:

Report incorrect code

Copy

Ask AI

```
{
  "type": "replace_content",
  "replace_content": {
    "new_str": "Replacement content.",
    "allow_deleting_content": true
  }
}
```

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#update-response)  Update response

All variants return the full page content as markdown after the update:

Report incorrect code

Copy

Ask AI

```
{
  "object": "page_markdown",
  "id": "page-uuid",
  "markdown": "...full page content after update...",
  "truncated": false,
  "unknown_block_ids": []
}
```

**Key behaviors:**

- Available to all integration types (public and internal).
- Requires `update_content` capability.
- The `content_range` / `after` / `old_str` matching is case-sensitive.

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#error-responses)  Error responses

| Error code | Condition |
| --- | --- |
| `validation_error` | The `content_range` or `after` selection does not match any content in the page, or an `old_str` in `update_content` is not found. |
| `validation_error` | An `old_str` in `update_content` matches multiple locations and `replace_all_matches` is not `true`. |
| `validation_error` | The operation would delete child pages or databases and `allow_deleting_content` is not `true`. The error message lists the affected items. |
| `validation_error` | The provided ID is a database or non-page block (use the appropriate API for those record types). |
| `validation_error` | The target page is a synced page (`external_object_instance_page`). Synced pages cannot be updated. |
| `object_not_found` | The page does not exist or the integration does not have access to it. |
| `restricted_resource` | The integration lacks `update_content` capability. |

### [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#meeting-note-transcripts)  Meeting note transcripts

The update endpoint always skips meeting note transcript content, matching the default behavior of the GET endpoint. If you retrieve a page with `include_transcript=true`, the transcript text will appear in the response but cannot be used in `content_range` or `after` selections — the update endpoint does not see transcript content during matching and will return a `validation_error` for selections that span transcript text.

## [​](https://developers.notion.com/guides/data-apis/working-with-markdown-content\#access-control-summary)  Access control summary

| Endpoint | Public integrations | Internal integrations | Required capability |
| --- | --- | --- | --- |
| Create (`POST /v1/pages`) | Yes | Yes | `insert_content` |
| Read (`GET .../markdown`) | Yes | Yes | `read_content` |
| Update (`PATCH .../markdown`) | Yes | Yes | `update_content` |

[Working with comments\\
\\
Previous](https://developers.notion.com/guides/data-apis/working-with-comments) [Enhanced markdown format\\
\\
Next](https://developers.notion.com/guides/data-apis/enhanced-markdown)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.