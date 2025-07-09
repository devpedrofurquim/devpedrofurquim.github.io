import { NextResponse } from 'next/server';

const API_KEY = process.env.YOUTUBE_API_KEY!;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID!;

export async function GET() {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3`
    );

    const data = await res.json();

    const videos = data.items
        .filter((item: any) => item.id.kind === 'youtube#video')
        .map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            publishDate: item.snippet.publishedAt,
        }));

    return NextResponse.json(videos);
}
