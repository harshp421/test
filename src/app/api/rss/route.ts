// import { NextRequest, NextResponse } from "next/server";
// import { parseStringPromise } from 'xml2js';

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const url=new URL(req.url);
//     const query = url.searchParams.get('search');
//     const q = url.searchParams.get('q')
//     const sort = url.searchParams.get('sort');  
//     const response = await fetch(`https://indiankanoon.org/feeds/search/${query} sortby:${sort} doctypes:${q === 'true ' ? 'judgments' : ''} /`);
//     const data = await response.text();
//     //console.log(data, 'response'); 

//     try {
//       const result = await parseStringPromise(data);
//       return NextResponse.json({
//         data: result
//       });
//     } catch (err: unknown) {
//       return NextResponse.json({
//         error: (err as Error).message
//       });
//     }
//      } catch (error: any) {
//     return NextResponse.json({
//       error: error.message
//     });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from 'xml2js';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('search');
    const  q = req.nextUrl.searchParams.get('q');
    const sort= req.nextUrl.searchParams.get('sort');

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
