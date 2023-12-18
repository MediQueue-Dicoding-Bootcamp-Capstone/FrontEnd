import getToken from "@/lib/getToken";
import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req) {
    const token = getToken();
    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/users/logout`,{
            Headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res).catch((err) => err.response);
        return NextResponse.json({status:response.data.status, data: response.data},{
            status: 200,
            headers: {
                "set-cookie": response.headers["set-cookie"],
            },
        })
    }catch(error){
        console.error('Failed to logout:', error);
        return NextResponse.json({status: false, message: 'Failed to logout'});
    }
}