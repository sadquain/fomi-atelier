import { NextResponse } from "next/server";
import { MODELS } from "@/data/modelsData";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MODELS,
  });
}
