import getToken from "@/lib/getToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const {page} = params;
    const token = getToken();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/appointments?page=${page}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res).catch((err) => err.response);
    return NextResponse.json({status:response.data.status, data: response.data})
}