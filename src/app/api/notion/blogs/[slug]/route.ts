import { NextRequest, NextResponse } from 'next/server'
import { createHighlighter, type Highlighter } from 'shiki'

// Types for Notion API responses
interface NotionRichText {
    plain_text: string
    annotations?: {
        bold?: boolean
        italic?: boolean
        code?: boolean
    }
    href?: string
}

interface NotionBlock {
    id: string
    type: string
    [key: string]: unknown
}

// Cache the highlighter instance
let highlighterInstance: Highlighter | null = null

async function getShikiHighlighter(): Promise<Highlighter> {
    if (!highlighterInstance) {
        highlighterInstance = await createHighlighter({
            themes: ['github-dark', 'github-light'],
            langs: [
                'javascript', 'typescript', 'html', 'css', 'python', 'java', 'go', 'rust',
                'bash', 'shell', 'json', 'yaml', 'sql', 'php', 'c', 'cpp', 'csharp',
                'jsx', 'tsx', 'vue', 'svelte', 'markdown', 'dockerfile', 'nginx',
                'dart', 'kotlin', 'swift', 'ruby', 'perl', 'scala', 'haskell', 'lua',
                'r', 'matlab', 'powershell', 'batch', 'xml', 'graphql', 'solidity'
            ]
        })
    }
    return highlighterInstance
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        if (!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID) {
            console.error('Missing Notion configuration')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }        // Query Notion database for the specific article by slug or ID

        // Check if the slug looks like a Notion ID (contains hyphens in UUID format)
        if (slug.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            // It's an ID, search by page ID directly
            const pageResponse = await fetch(`https://api.notion.com/v1/pages/${slug}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
                    'Notion-Version': '2022-06-28',
                },
            })

            if (!pageResponse.ok) {
                return NextResponse.json(
                    { error: 'Article not found' },
                    { status: 404 }
                )
            }

            const page = await pageResponse.json()

            // Get the page content
            const contentResponse = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
                    'Notion-Version': '2022-06-28',
                },
            })

            const contentData = await contentResponse.json()

            // Convert Notion blocks to HTML (simplified version)
            const content = await convertNotionBlocksToHTML(contentData.results || [])

            // Extract article data
            const article = {
                id: page.id,
                title: page.properties.Name?.title?.[0]?.plain_text || 'Untitled',
                date: page.properties.Date?.date?.start || page.created_time,
                tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
                slug: page.properties.slug?.rich_text?.[0]?.plain_text || page.id,
                content: content,
                excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text || '',
                readTime: estimateReadTime(content)
            }

            return NextResponse.json(article)
        }

        // It's a slug, use the original filter
        const filter = {
            property: 'slug',
            rich_text: {
                equals: slug
            }
        }

        const response = await fetch('https://api.notion.com/v1/databases/' + process.env.NOTION_DATABASE_ID + '/query', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28',
            },
            body: JSON.stringify({ filter }),
        })

        if (!response.ok) {
            console.error('Notion API error:', response.status, response.statusText)
            return NextResponse.json(
                { error: 'Failed to fetch from Notion' },
                { status: response.status }
            )
        }

        const data = await response.json()

        if (!data.results || data.results.length === 0) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            )
        }

        const page = data.results[0]

        // Get the page content
        const contentResponse = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
                'Notion-Version': '2022-06-28',
            },
        })

        const contentData = await contentResponse.json()

        // Convert Notion blocks to HTML (simplified version)
        const content = await convertNotionBlocksToHTML(contentData.results || [])

        // Extract article data
        const article = {
            id: page.id,
            title: page.properties.Name?.title?.[0]?.plain_text || 'Untitled',
            date: page.properties.Date?.date?.start || page.created_time,
            tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
            slug: page.properties.slug?.rich_text?.[0]?.plain_text || page.id,
            content: content,
            excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text || '',
            readTime: estimateReadTime(content)
        }

        return NextResponse.json(article)

    } catch (error) {
        console.error('Error fetching article:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Helper function to convert Notion blocks to HTML
async function convertNotionBlocksToHTML(blocks: NotionBlock[]): Promise<string> {
    const highlighter = await getShikiHighlighter()

    const htmlBlocks = await Promise.all(blocks.map(async (block: NotionBlock) => {
        switch (block.type) {
            case 'paragraph': {
                const blockData = block as any
                const text = blockData.paragraph.rich_text
                    .map((t: NotionRichText) => formatRichText(t))
                    .join('')
                return `<p>${text}</p>`
            }

            case 'heading_1': {
                const blockData = block as any
                const h1Text = blockData.heading_1.rich_text
                    .map((t: NotionRichText) => formatRichText(t))
                    .join('')
                return `<h1>${h1Text}</h1>`
            }

            case 'heading_2': {
                const blockData = block as any
                const h2Text = blockData.heading_2.rich_text
                    .map((t: NotionRichText) => formatRichText(t))
                    .join('')
                return `<h2>${h2Text}</h2>`
            }

            case 'heading_3': {
                const blockData = block as any
                const h3Text = blockData.heading_3.rich_text
                    .map((t: NotionRichText) => formatRichText(t))
                    .join('')
                return `<h3>${h3Text}</h3>`
            }

            case 'bulleted_list_item': {
                const blockData = block as any
                const bulletText = blockData.bulleted_list_item.rich_text
                    .map((t: NotionRichText) => formatRichText(t))
                    .join('')
                return `<li>${bulletText}</li>`
            }

            case 'numbered_list_item': {
                const blockData = block as any
                const numberedText = blockData.numbered_list_item.rich_text
                    .map((t: NotionRichText) => formatRichText(t))
                    .join('')
                return `<li>${numberedText}</li>`
            } case 'code': {
                const blockData = block as any
                const codeText = blockData.code.rich_text
                    .map((t: NotionRichText) => t.plain_text)
                    .join('')

                const language = blockData.code.language || 'text'

                try {
                    // Check if the language is supported by our highlighter
                    const supportedLangs = highlighter.getLoadedLanguages()
                    const langToUse = supportedLangs.includes(language) ? language : 'text'

                    // Use Shiki to highlight the code with dark theme only (consistent appearance)
                    const darkHtml = highlighter.codeToHtml(codeText, {
                        lang: langToUse,
                        theme: 'github-dark'
                    })

                    // Return only the dark theme version since we want consistent dark code blocks
                    return `<div class="code-block-container">${darkHtml}</div>`
                } catch (error) {
                    // Fallback to plain code block if highlighting fails
                    console.warn(`Failed to highlight code with language '${language}':`, error)
                    return `<pre><code class="language-${language}">${codeText}</code></pre>`
                }
            }

            case 'quote': {
                const blockData = block as any
                const quoteText = blockData.quote.rich_text
                    .map((t: NotionRichText) => formatRichText(t))
                    .join('')
                return `<blockquote>${quoteText}</blockquote>`
            }

            default:
                return ''
        }
    }))

    return htmlBlocks.join('\n')
}

// Helper function to format rich text with styling
function formatRichText(textObj: NotionRichText): string {
    let text = textObj.plain_text || ''

    if (textObj.annotations?.bold) {
        text = `<strong>${text}</strong>`
    }
    if (textObj.annotations?.italic) {
        text = `<em>${text}</em>`
    }
    if (textObj.annotations?.code) {
        text = `<code>${text}</code>`
    }
    if (textObj.href) {
        text = `<a href="${textObj.href}" target="_blank" rel="noopener noreferrer">${text}</a>`
    }

    return text
}

// Helper function to estimate read time
function estimateReadTime(content: string): string {
    const wordsPerMinute = 200
    const textContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
    const wordCount = textContent.split(/\s+/).length
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
    return `${readTimeMinutes} min read`
}
