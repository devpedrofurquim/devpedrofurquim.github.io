import { NextResponse } from 'next/server'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID // Your YouTube channel ID

export async function GET() {
    try {
        if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
            console.error('Missing YouTube API key or Channel ID')
            return NextResponse.json(
                { error: 'YouTube API configuration missing' },
                { status: 500 }
            )
        }

        // First, verify the channel exists
        const channelCheckResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=snippet`,
            {
                next: { revalidate: 3600 }
            }
        )

        if (!channelCheckResponse.ok) {
            throw new Error(`YouTube Channel Check API error: ${channelCheckResponse.status}`)
        }

        const channelCheckData = await channelCheckResponse.json()

        if (!channelCheckData.items || channelCheckData.items.length === 0) {
            console.error('Channel not found or not accessible')
            return NextResponse.json([])
        }

        // Now try the search endpoint
        const searchResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3&type=video`,
            {
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        )

        if (!searchResponse.ok) {
            console.error('Search API failed:', searchResponse.status)
            throw new Error(`YouTube API error: ${searchResponse.status}`)
        }

        const searchData = await searchResponse.json()

        // If search has results, use them
        if (searchData.items && searchData.items.length > 0) {
            const videos = searchData.items.map((item: any) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                publishDate: item.snippet.publishedAt
            }))

            return NextResponse.json(videos)
        }

        // If search returns no results, try the uploads playlist method

        // Get channel details to find uploads playlist
        const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=contentDetails`,
            {
                next: { revalidate: 3600 }
            }
        )

        if (!channelResponse.ok) {
            throw new Error(`YouTube Channel API error: ${channelResponse.status}`)
        }

        const channelData = await channelResponse.json()

        const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

        if (!uploadsPlaylistId) {
            return NextResponse.json([])
        }

        // Get videos from uploads playlist
        const playlistResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=3&order=date`,
            {
                next: { revalidate: 3600 }
            }
        )

        if (!playlistResponse.ok) {
            throw new Error(`YouTube Playlist API error: ${playlistResponse.status}`)
        }

        const playlistData = await playlistResponse.json()

        const videos = playlistData.items?.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
            publishDate: item.snippet.publishedAt
        })) || []

        return NextResponse.json(videos)
    } catch (error) {
        console.error('Error fetching YouTube videos:', error)

        // Return fallback data if API fails
        const fallbackVideos = [
            {
                id: 'fallback-1',
                title: 'Building My First Solana Token',
                description: 'Follow along as I create FLAP token on the Solana blockchain.',
                thumbnail: '/video-placeholder.jpg',
                url: 'https://youtube.com/@pedro_furquim',
                publishDate: '2024-12-10T00:00:00Z'
            },
            {
                id: 'fallback-2',
                title: 'Code Review: Clean Mobile Architecture',
                description: 'Reviewing a real mobile app codebase and discussing architecture patterns.',
                thumbnail: '/video-placeholder.jpg',
                url: 'https://youtube.com/@pedro_furquim',
                publishDate: '2024-11-15T00:00:00Z'
            },
            {
                id: 'fallback-3',
                title: 'Pixel Art Animation Techniques',
                description: 'Creating smooth animations for indie games using traditional pixel art methods.',
                thumbnail: '/video-placeholder.jpg',
                url: 'https://youtube.com/@pedro_furquim',
                publishDate: '2024-10-30T00:00:00Z'
            }
        ]

        return NextResponse.json(fallbackVideos)
    }
}
