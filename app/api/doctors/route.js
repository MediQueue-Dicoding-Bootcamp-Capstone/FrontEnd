import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(req) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/doctors/`)
    .then((res) => res).catch((err) => err.response);
    return NextResponse.json({status:response.data.status, data: response.data})
}