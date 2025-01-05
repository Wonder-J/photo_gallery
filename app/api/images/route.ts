import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    const baseUrl = query
      ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`
      : 'https://api.pexels.com/v1/curated?per_page=15'

    const response = await fetch(baseUrl, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY as string,
      },
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}

