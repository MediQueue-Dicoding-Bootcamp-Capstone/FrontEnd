import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const data = await req.json();
  const { email, password } = data;
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/login`, {
      email,
      password,
    })
    .then((res) => res)
    .catch((err) => err.response);
  if (response.status === 401)
    return NextResponse.json({
      status: false,
      message: response.data.errors.message,
    });
    console.log(response)
  // ...

  // if (response.headers["set-cookie"]) {
  //   NextResponse.setHeader("Set-Cookie", response.headers["set-cookie"]);
  // }

  return NextResponse.json(

    { status: true, data: response.data.data },
    {
      status: 200,
      headers: {
        "set-cookie": response.headers["set-cookie"],
      },
    }
  );
}
