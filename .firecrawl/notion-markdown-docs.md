[Skip to main content](https://developers.notion.com/reference/retrieve-page-markdown#content-area)

[Notion Docs home page![light logo](https://mintcdn.com/notion-demo/gxhrU3D49w5WpEjL/logo/light.svg?fit=max&auto=format&n=gxhrU3D49w5WpEjL&q=85&s=3ff0c52eacba5d25a47ee2e6861bf6b2)![dark logo](https://mintcdn.com/notion-demo/gxhrU3D49w5WpEjL/logo/dark.svg?fit=max&auto=format&n=gxhrU3D49w5WpEjL&q=85&s=1eab3903c1679ca77980622998633397)](https://developers.notion.com/)

Search...

Ctrl KAsk AI

Search...

Navigation

Markdown content

Retrieve a page as markdown

[Home](https://developers.notion.com/) [Guides](https://developers.notion.com/guides/get-started/getting-started) [API Reference](https://developers.notion.com/reference/intro) [Changelog](https://developers.notion.com/page/changelog) [Examples](https://developers.notion.com/page/examples)

- [Status](https://www.notion-status.com/)
- [Community](https://www.notion.com/community)
- [Blog](https://www.notion.com/blog)

##### Notion API

- [Introduction](https://developers.notion.com/reference/intro)
- [Integration capabilities](https://developers.notion.com/reference/capabilities)
- Webhooks

- [Request limits](https://developers.notion.com/reference/request-limits)
- [Status codes](https://developers.notion.com/reference/status-codes)
- Versioning


##### Objects

- Block

- Page

- [Database](https://developers.notion.com/reference/database)
- Data source

- Comment

- File

- [User](https://developers.notion.com/reference/user)
- [Parent](https://developers.notion.com/reference/parent-object)
- [Emoji](https://developers.notion.com/reference/emoji-object)
- [Unfurl attribute (Link Previews)](https://developers.notion.com/reference/unfurl-attribute-object)

##### Endpoints

- Authentication

- Blocks

- Pages

  - [POST\\
    \\
    Create a page](https://developers.notion.com/reference/post-page)
  - [GET\\
    \\
    Retrieve a page](https://developers.notion.com/reference/retrieve-a-page)
  - [GET\\
    \\
    Retrieve a page property item](https://developers.notion.com/reference/retrieve-a-page-property)
  - [POST\\
    \\
    Move a page](https://developers.notion.com/reference/move-page)
  - Update page

  - Markdown content

    - [GET\\
      \\
      Retrieve a page as markdown](https://developers.notion.com/reference/retrieve-page-markdown)
    - [PATCH\\
      \\
      Update a page's content as markdown](https://developers.notion.com/reference/update-page-markdown)
- Databases

- Data sources

- Databases (deprecated)

- Comments

- File Uploads

- Search

- Users


##### Webhook events

- Pages

- Databases

- Data sources

- Comments

- File uploads


TypeScript SDK

JavaScript

Copy

Ask AI

```
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const response = await notion.pages.retrieveMarkdown({
  page_id: "b55c9c91-384d-452b-81db-d1ef79372b75"
})

console.log(response.markdown)
```

200

400

401

403

404

409

429

500

503

Copy

Ask AI

```
{
  "object": "<string>",
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "markdown": "<string>",
  "truncated": true,
  "unknown_block_ids": [\
    "3c90c3cc-0d44-4b50-8888-8dd25736052a"\
  ]
}
```

GET

/

v1

/

pages

/

{page\_id}

/

markdown

Try it

TypeScript SDK

JavaScript

Copy

Ask AI

```
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const response = await notion.pages.retrieveMarkdown({
  page_id: "b55c9c91-384d-452b-81db-d1ef79372b75"
})

console.log(response.markdown)
```

200

400

401

403

404

409

429

500

503

Copy

Ask AI

```
{
  "object": "<string>",
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "markdown": "<string>",
  "truncated": true,
  "unknown_block_ids": [\
    "3c90c3cc-0d44-4b50-8888-8dd25736052a"\
  ]
}
```

### [​](https://developers.notion.com/reference/retrieve-page-markdown\#use-cases)  Use cases

Use this endpoint to retrieve the full content of a Notion page as [enhanced markdown](https://developers.notion.com/guides/data-apis/enhanced-markdown), instead of working with the [block-based API](https://developers.notion.com/reference/get-block-children). This is especially useful for agentic systems and developer tools that work natively with markdown.The endpoint also accepts non-navigable block IDs returned in `unknown_block_ids` from a previous truncated response. Pass these IDs to fetch additional subtrees of a large page.

### [​](https://developers.notion.com/reference/retrieve-page-markdown\#general-behavior)  General behavior

Returns a `page_markdown` object containing the page content as an enhanced markdown string.

**Requirements**Your integration must have [read content capabilities](https://developers.notion.com/reference/capabilities#content-capabilities) on the target page in order to call this endpoint. To update your integration’s capabilities, navigate to the [My integrations](https://www.notion.so/profile/integrations) dashboard, select your integration, go to the **Capabilities** tab, and update your settings as needed.Attempting to call this endpoint without read content capabilities returns an HTTP response with a 403 status code.

### [​](https://developers.notion.com/reference/retrieve-page-markdown\#unknown-blocks)  Unknown blocks

Some blocks may appear as `<unknown url="..." alt="..."/>` tags in the markdown output. This happens when:

- **Truncation**: The page exceeds the record limit (approximately 20,000 blocks) and some blocks could not be loaded.
- **Permissions**: The page contains child pages or other content that is not shared with the integration.
- **Unsupported block types**: Certain block types (such as bookmarks, embeds, and link previews) are [not yet supported](https://developers.notion.com/guides/data-apis/working-with-markdown-content#unsupported-block-types) in the markdown format.

When truncation or permissions cause unknown blocks, the `truncated` field is set to `true` and the `unknown_block_ids` array contains the affected block IDs.You can attempt to fetch unloaded blocks by passing their IDs back to this same endpoint as the `page_id` path parameter. Blocks that are unknown due to permissions will return a 404 error since the integration does not have access.

The `unknown_block_ids` array does not distinguish between truncated and inaccessible blocks. Handle `object_not_found` errors gracefully when re-fetching unknown block IDs.

For unsupported block types, use the [block-based API](https://developers.notion.com/reference/retrieve-a-block) to retrieve the full structured data.

### [​](https://developers.notion.com/reference/retrieve-page-markdown\#errors)  Errors

Returns a 404 HTTP response if the page doesn’t exist, or if the integration doesn’t have access to the page.Returns a 400 or 429 HTTP response if the request exceeds the [request limits](https://developers.notion.com/reference/request-limits)._Each Public API endpoint can return several possible error codes. See the [Error codes section](https://developers.notion.com/reference/status-codes#error-codes) of the Status codes documentation for more information._

#### Authorizations

[​](https://developers.notion.com/reference/retrieve-page-markdown#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

[​](https://developers.notion.com/reference/retrieve-page-markdown#parameter-notion-version)

Notion-Version

enum<string>

required

The [API version](https://developers.notion.com/reference/versioning) to use for this request. The latest version is `2026-03-11`.

Available options:

`2026-03-11`

#### Path Parameters

[​](https://developers.notion.com/reference/retrieve-page-markdown#parameter-page-id)

page\_id

string

required

The ID of the page (or block) to retrieve as markdown. Non-navigable block IDs from truncated responses can be passed here to fetch their subtrees.

#### Query Parameters

[​](https://developers.notion.com/reference/retrieve-page-markdown#parameter-include-transcript)

include\_transcript

boolean

Whether to include meeting note transcripts. Defaults to false. When true, full transcripts are included; when false, a placeholder with the meeting note URL is shown instead.

#### Response

200

application/json

[​](https://developers.notion.com/reference/retrieve-page-markdown#response-object)

object

string

required

The type of object, always 'page\_markdown'.

Allowed value: `"page_markdown"`

[​](https://developers.notion.com/reference/retrieve-page-markdown#response-id)

id

string<uuid>

required

The ID of the page or block.

[​](https://developers.notion.com/reference/retrieve-page-markdown#response-markdown)

markdown

string

required

The page content rendered as enhanced Markdown.

[​](https://developers.notion.com/reference/retrieve-page-markdown#response-truncated)

truncated

boolean

required

Whether the content was truncated due to exceeding the record count limit.

[​](https://developers.notion.com/reference/retrieve-page-markdown#response-unknown-block-ids)

unknown\_block\_ids

string<uuid>\[\]

required

Block IDs that could not be loaded (appeared as  tags in the markdown). Pass these IDs back to this endpoint to fetch their content separately.

Maximum array length: `100`

[Trash a page\\
\\
Previous](https://developers.notion.com/reference/trash-page) [Update a page's content as markdown\\
\\
Next](https://developers.notion.com/reference/update-page-markdown)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.