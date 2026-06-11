import { NextResponse } from "next/server";
import { detectStack } from "@/lib/detect-stack";
export async function POST(req: Request){const {url}=await req.json(); if(!url) return NextResponse.json({error:"URL is required"},{status:400}); const platform=await detectStack(url); return NextResponse.json({platform});}
