import { NextResponse } from "next/server";
import { STYLES } from "@/data/stylesData";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: STYLES,
  });
}
