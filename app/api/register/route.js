import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const { email, password, name } = data;

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/register`, {
      email,
      password,
      name,
    });

    return NextResponse.json(
      { status: true, data: response.data },
      {
        status: 201,
        headers: {
          "set-cookie": response.headers["set-cookie"],
        },
      }
    );
  } catch (error) {
    console.error('Failed to register:', error);
    return NextResponse.json({status: false, message: 'Failed to register'});
  }
}