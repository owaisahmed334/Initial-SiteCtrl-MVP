import { NextResponse } from "next/server";
export async function POST(req: Request){const {url}=await req.json(); const start=Date.now(); try{const res=await fetch(url,{cache:"no-store"}); return NextResponse.json({status:res.ok?'online':'warning', statusCode:res.status, responseTimeMs:Date.now()-start});}catch{return NextResponse.json({status:'offline', responseTimeMs:Date.now()-start});}}
