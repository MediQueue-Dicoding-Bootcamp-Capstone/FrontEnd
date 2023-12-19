import getToken from "@/lib/getToken";
import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(req) {
    try {
        const token = getToken();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/doctors`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });
      return NextResponse.json({status: response.data.status, data: response.data});
    } catch (error) {
      return NextResponse.json({status: false, message: 'Failed to get doctors'});
    }
  }

  export async function POST(req) {
    console.log("triggered")
  
    // Use req.body instead of req.json()
    const data = req.body;
    const data2 = await req.formData();
    console.log(data2)
    console.log(data)
  
    try {
      const token = getToken();
      console.log(data)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/doctors`, data2, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response)
      return NextResponse.json({status: true, data: response.data});
    } catch (error) {
        console.log(error)
      console.error('Failed to create doctor:', error);
      return NextResponse.json({status: false, message: 'Failed to create doctor'});
    }
  }