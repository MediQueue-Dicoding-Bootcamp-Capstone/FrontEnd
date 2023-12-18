import getToken from "@/lib/getToken";
import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(req,{params}){
    const {id} = params;
    const token = getToken();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/appointments/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data).catch((err) => {throw err});
    return NextResponse.json({status: true, data: response.data});
}

