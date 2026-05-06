import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.warn("⚠️ DATABASE_URL not configured - workshop registration disabled");
      return NextResponse.json(
        { error: "Workshop registration is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { 
      workshopName, 
      studentName, 
      studentClass, 
      schoolName, 
      parentName, 
      contactNumber, 
      email 
    } = body;

    // 1. Validation
    if (!workshopName || !studentName || !contactNumber || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Insert into DB
    const result = await sql`
      INSERT INTO public.workshop_registrations
        (workshop_name, student_name, student_class, school_name, parent_name, contact_number, email)
      VALUES
        (${workshopName}, ${studentName}, ${studentClass}, ${schoolName}, ${parentName}, ${contactNumber}, ${email})
      RETURNING id, created_at
    `;

    return NextResponse.json(
      { success: true, id: result[0].id },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Workshop Register Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}