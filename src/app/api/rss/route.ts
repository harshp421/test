export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server";
import { convertableToString, parseString } from 'xml2js';

const parseStringPromise = (data: string | convertableToString) => new Promise((resolve, reject) => {
  parseString(data, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('search') || '';
    const q = searchParams.get('q') || '';
    const sort = searchParams.get('sort') || '';

    const fetchUrl = `https://indiankanoon.org/feeds/search/${query} sortby:${sort} doctypes:${q === 'true ' ? 'judgments' : ''} /`;
    const response = await fetch(fetchUrl);
    // const data = await response.text();

    try {
     // const result = await parseStringPromise(data);
      return NextResponse.json({ data: response });
    } catch (err: unknown) {
      return NextResponse.json({ error: (err as Error).message });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
