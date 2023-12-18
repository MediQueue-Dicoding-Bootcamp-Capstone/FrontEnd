import getToken from "@/lib/getToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req){
    const token = getToken();
    const response = await axios.get(`http://127.0.0.1:8000/api/dashboard/user`,{
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
    console.log(data)
    const token = getToken();
    console.log(token)
    const response = await axios.post(`http://127.0.0.1:8000/api/adduser`,{
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
    console.log(response)
    return NextResponse.json({status:response.data.status, data: response.data})
    }