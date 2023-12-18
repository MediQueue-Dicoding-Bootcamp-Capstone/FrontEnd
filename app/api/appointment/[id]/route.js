import getToken from "@/lib/getToken";
import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(req,{params}){
    const {id} = params;
    const token = getToken();
    console.log(token)
    console.log(id)
    const response = await axios.get(`http://127.0.0.1:8000/api/appointments/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data).catch((err) => {throw err});
    console.log(response);
    return NextResponse.json({status: true, data: response.data});
}

