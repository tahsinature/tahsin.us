[Skip to main content](https://developers.notion.com/guides/data-apis/enhanced-markdown#content-area)

[Notion Docs home page![light logo](https://mintcdn.com/notion-demo/gxhrU3D49w5WpEjL/logo/light.svg?fit=max&auto=format&n=gxhrU3D49w5WpEjL&q=85&s=3ff0c52eacba5d25a47ee2e6861bf6b2)![dark logo](https://mintcdn.com/notion-demo/gxhrU3D49w5WpEjL/logo/dark.svg?fit=max&auto=format&n=gxhrU3D49w5WpEjL&q=85&s=1eab3903c1679ca77980622998633397)](https://developers.notion.com/)

Search...

Ctrl KAsk AI

Search...

Navigation

Working with markdown content

Enhanced markdown format

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

- [Overview](https://developers.notion.com/guides/data-apis/enhanced-markdown#overview)
- [Indentation](https://developers.notion.com/guides/data-apis/enhanced-markdown#indentation)
- [Escaping](https://developers.notion.com/guides/data-apis/enhanced-markdown#escaping)
- [Block types](https://developers.notion.com/guides/data-apis/enhanced-markdown#block-types)
- [Text](https://developers.notion.com/guides/data-apis/enhanced-markdown#text)
- [Headings](https://developers.notion.com/guides/data-apis/enhanced-markdown#headings)
- [Lists](https://developers.notion.com/guides/data-apis/enhanced-markdown#lists)
- [To-do](https://developers.notion.com/guides/data-apis/enhanced-markdown#to-do)
- [Quote](https://developers.notion.com/guides/data-apis/enhanced-markdown#quote)
- [Toggle](https://developers.notion.com/guides/data-apis/enhanced-markdown#toggle)
- [Callout](https://developers.notion.com/guides/data-apis/enhanced-markdown#callout)
- [Code](https://developers.notion.com/guides/data-apis/enhanced-markdown#code)
- [Equation](https://developers.notion.com/guides/data-apis/enhanced-markdown#equation)
- [Table](https://developers.notion.com/guides/data-apis/enhanced-markdown#table)
- [Divider](https://developers.notion.com/guides/data-apis/enhanced-markdown#divider)
- [Empty line](https://developers.notion.com/guides/data-apis/enhanced-markdown#empty-line)
- [Columns](https://developers.notion.com/guides/data-apis/enhanced-markdown#columns)
- [Media blocks](https://developers.notion.com/guides/data-apis/enhanced-markdown#media-blocks)
- [Page and database references](https://developers.notion.com/guides/data-apis/enhanced-markdown#page-and-database-references)
- [Table of contents](https://developers.notion.com/guides/data-apis/enhanced-markdown#table-of-contents)
- [Synced block](https://developers.notion.com/guides/data-apis/enhanced-markdown#synced-block)
- [Rich text formatting](https://developers.notion.com/guides/data-apis/enhanced-markdown#rich-text-formatting)
- [Mentions](https://developers.notion.com/guides/data-apis/enhanced-markdown#mentions)
- [Custom emoji](https://developers.notion.com/guides/data-apis/enhanced-markdown#custom-emoji)
- [Citations](https://developers.notion.com/guides/data-apis/enhanced-markdown#citations)
- [Colors](https://developers.notion.com/guides/data-apis/enhanced-markdown#colors)
- [Text colors](https://developers.notion.com/guides/data-apis/enhanced-markdown#text-colors)
- [Background colors](https://developers.notion.com/guides/data-apis/enhanced-markdown#background-colors)
- [Usage](https://developers.notion.com/guides/data-apis/enhanced-markdown#usage)
- [Complete example](https://developers.notion.com/guides/data-apis/enhanced-markdown#complete-example)

## [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#overview)  Overview

Enhanced markdown (also called “Notion-flavored Markdown”) is an extended Markdown format that supports all Notion block and rich text types. It is used by the markdown content endpoints: `POST /v1/pages` (via the `markdown` body param), `GET /v1/pages/:page_id/markdown`, and `PATCH /v1/pages/:page_id/markdown`.This format extends standard Markdown with XML-like tags and attribute lists to represent Notion-specific features such as callouts, toggles, columns, mentions, and block-level colors.

## [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#indentation)  Indentation

Use tabs for indentation. Child blocks are indented one tab deeper than their parent.

## [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#escaping)  Escaping

Use backslashes to escape special characters. The following characters should be escaped outside of code blocks: `\``*``~```````$``[``]``<``>``{``}``|``^`Do **not** escape characters inside code blocks. Code block content is literal.

## [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#block-types)  Block types

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#text)  Text

Report incorrect code

Copy

Ask AI

```
Rich text {color="Color"}
	Children
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#headings)  Headings

Report incorrect code

Copy

Ask AI

```
# Heading 1 {color="Color"}
## Heading 2 {color="Color"}
### Heading 3 {color="Color"}
#### Heading 4 {color="Color"}
```

Headings do not support children. Headings 5 and 6 are converted to heading 4.

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#lists)  Lists

Report incorrect code

Copy

Ask AI

```
- Bulleted list item {color="Color"}
	Children

1. Numbered list item {color="Color"}
	Children
```

List items should contain inline rich text. Other block types render as children of an empty list item.

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#to-do)  To-do

Report incorrect code

Copy

Ask AI

```
- [ ] Unchecked item {color="Color"}
	Children
- [x] Checked item {color="Color"}
	Children
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#quote)  Quote

Report incorrect code

Copy

Ask AI

```
> Rich text {color="Color"}
	Children
```

For multi-line quotes, use `<br>` tags within a single `>` line:

Report incorrect code

Copy

Ask AI

```
> Line 1<br>Line 2<br>Line 3 {color="Color"}
```

Multiple `>` lines render as separate quote blocks, not a single multi-line quote.

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#toggle)  Toggle

Report incorrect code

Copy

Ask AI

```
<details color="Color">
<summary>Toggle title</summary>
Children (must be indented)
</details>
```

Toggle headings use the `{toggle="true"}` attribute:

Report incorrect code

Copy

Ask AI

```
# Heading {toggle="true" color="Color"}
	Children
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#callout)  Callout

Report incorrect code

Copy

Ask AI

```
<callout icon="emoji" color="Color">
	Rich text
	Children
</callout>
```

Callouts can contain multiple blocks and nested children, not just inline rich text. Each child block should be indented.

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#code)  Code

Report incorrect code

Copy

Ask AI

````
```language
Code content
```
````

Do not escape special characters inside code blocks. Set the language if known. Use ``````mermaid``` for Mermaid diagrams.

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#equation)  Equation

Report incorrect code

Copy

Ask AI

```
$$
Equation
$$
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#table)  Table

Report incorrect code

Copy

Ask AI

```
<table fit-page-width="true|false" header-row="true|false" header-column="true|false">
	<colgroup>
		<col color="Color">
	</colgroup>
	<tr color="Color">
		<td color="Color">Cell content</td>
	</tr>
</table>
```

All attributes are optional (default to `false`). Color precedence from highest to lowest: cell, row, column. Table cells can only contain rich text.

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#divider)  Divider

Report incorrect code

Copy

Ask AI

```
---
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#empty-line)  Empty line

Report incorrect code

Copy

Ask AI

```
<empty-block/>
```

Must be on its own line. Plain empty lines are stripped out.

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#columns)  Columns

Report incorrect code

Copy

Ask AI

```
<columns>
	<column>
		Children
	</column>
	<column>
		Children
	</column>
</columns>
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#media-blocks)  Media blocks

Report incorrect code

Copy

Ask AI

```
![Caption](URL) {color="Color"}
```

Report incorrect code

Copy

Ask AI

```
<audio src="URL" color="Color">Caption</audio>
<video src="URL" color="Color">Caption</video>
<file src="URL" color="Color">Caption</file>
<pdf src="URL" color="Color">Caption</pdf>
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#page-and-database-references)  Page and database references

Report incorrect code

Copy

Ask AI

```
<page url="URL" color="Color">Title</page>
<database url="URL" inline="true|false" icon="Emoji" color="Color">Title</database>
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#table-of-contents)  Table of contents

Report incorrect code

Copy

Ask AI

```
<table_of_contents color="Color"/>
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#synced-block)  Synced block

Report incorrect code

Copy

Ask AI

```
<synced_block url="URL">
	Children
</synced_block>

<synced_block_reference url="URL">
	Children
</synced_block_reference>
```

## [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#rich-text-formatting)  Rich text formatting

| Format | Syntax |
| --- | --- |
| Bold | `**text**` |
| Italic | `*text*` |
| Strikethrough | `~~text~~` |
| Underline | `<span underline="true">text</span>` |
| Inline code | ```code``` |
| Link | `[text](URL)` |
| Inline math | `$equation$` |
| Line break | `<br>` |
| Color | `<span color="Color">text</span>` |

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#mentions)  Mentions

Report incorrect code

Copy

Ask AI

```
<mention-user url="URL">User name</mention-user>
<mention-page url="URL">Page title</mention-page>
<mention-database url="URL">Database name</mention-database>
<mention-data-source url="URL">Data source name</mention-data-source>
<mention-agent url="URL">Agent name</mention-agent>
<mention-date start="YYYY-MM-DD" end="YYYY-MM-DD"/>
<mention-date start="YYYY-MM-DD" startTime="HH:mm" timeZone="IANA_TIMEZONE"/>
```

Self-closing format is also supported: `<mention-user url="URL"/>`.

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#custom-emoji)  Custom emoji

Report incorrect code

Copy

Ask AI

```
:emoji_name:
```

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#citations)  Citations

Report incorrect code

Copy

Ask AI

```
[^URL]
```

## [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#colors)  Colors

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#text-colors)  Text colors

`gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#background-colors)  Background colors

`gray_bg`, `brown_bg`, `orange_bg`, `yellow_bg`, `green_bg`, `blue_bg`, `purple_bg`, `pink_bg`, `red_bg`

### [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#usage)  Usage

- **Block colors**: Add `{color="Color"}` attribute to the first line of any block.
- **Inline text colors**: Use `<span color="Color">Rich text</span>`.

## [​](https://developers.notion.com/guides/data-apis/enhanced-markdown\#complete-example)  Complete example

A Notion page with a heading, a callout, a to-do list, and a code block renders as:

Report incorrect code

Copy

Ask AI

````
# Project kickoff {color="blue"}

<callout icon="🎯" color="blue_bg">
	Ship the MVP by **Friday**.
</callout>

- [x] Write spec
- [ ] Build prototype
- [ ] Collect feedback

```python
def greet(name):
    return f"Hello, {name}!"
```

| Status | Owner |
|---|---|
| In progress | <mention-user url="{{user://abc123}}">Ada</mention-user> |
````

[Working with markdown content\\
\\
Previous](https://developers.notion.com/guides/data-apis/working-with-markdown-content) [Working with files and media\\
\\
Next](https://developers.notion.com/guides/data-apis/working-with-files-and-media)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.