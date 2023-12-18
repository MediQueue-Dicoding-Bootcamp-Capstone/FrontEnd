import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(req) {
    const response = await axios.get("http://127.0.0.1:8000/api/doctors/")
    .then((res) => res).catch((err) => err.response);
    console.log(response);
    return NextResponse.json({status:response.data.status, data: response.data})
}