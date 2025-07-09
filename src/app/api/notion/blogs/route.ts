import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_SECRET })
const databaseId = process.env.NOTION_DATABASE_ID!

export async function GET() {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [{ property: 'Date', direction: 'descending' }],
        })

        const posts = response.results.map((page: any) => ({
            id: page.id,
            last_edit: page.last_edited_time,
            title: page.properties.Name?.title?.[0]?.plain_text || 'Untitled',
            date: page.properties.Date?.date?.start || null,
            tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) || [],
            slug: page.properties.slug?.rich_text?.[0]?.plain_text || page.id, // Use lowercase 'slug' and fallback to ID
        }))

        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error fetching Notion data:', error)
        return NextResponse.json({ error: 'Failed to load blog posts' }, { status: 500 })
    }
}
