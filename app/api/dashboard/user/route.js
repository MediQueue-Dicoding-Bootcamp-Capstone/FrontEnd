import getToken from "@/lib/getToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req){
    const token = getToken();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/dashboard/user`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    
    })
    .then((res) => res).catch((err) => err.response);
    console.log(response)
    return NextResponse.json({status:response.data.status, data: response.data})
}

export async function POST(req){
    const data = await req.json();
    const {name, email, password, role} = data;
    const token = getToken();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/adduser`,{
        name: name,
        email: email,
        password: password,
        role: role
    
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res).catch((err) => err.response);
    return NextResponse.json({status:response.data.status, data: response.data})
    }