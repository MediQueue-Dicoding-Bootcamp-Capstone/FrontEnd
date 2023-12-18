import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(req) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/doctors/`);
      return NextResponse.json({status: response.data.status, data: response.data});
    } catch (error) {
      return NextResponse.json({status: false, message: 'Failed to get doctors'});
    }
  }