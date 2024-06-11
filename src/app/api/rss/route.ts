
export const dynamic = 'force-dynamic'
export const revalidate = 0;
import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from 'xml2js';

export async function GET(req: NextRequest) {
  try {


    const { searchParams } = new URL(req.url);
    const query = searchParams.get('search') || '';
    const q = searchParams.get('q') || '';
    const sort = searchParams.get('sort') || '';

    const fetchUrl = `https://indiankanoon.org/feeds/search/${query} sortby:${sort} doctypes:${q === 'true ' ? 'judgments' : ''} /`;
    const response = await fetch(fetchUrl);
    const data = await response.text();

    try {
      const result = await parseStringPromise(data);
      return NextResponse.json({ data: result });
    } catch (err: unknown) {
      return NextResponse.json({ error: (err as Error).message });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
