import getToken from "@/lib/getToken";
import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req){
    const data = await req.json();
    const {patient_name, patient_phone_number, patient_address, appointment_date, type_appointment, doctor_id}= data;
    const token = getToken();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/appointments`, {
        patient_name: patient_name,
        patient_phone_number: patient_phone_number,
        patient_address: patient_address,
        appointment_date: appointment_date,
        type_appointment: type_appointment,
        doctor_id: doctor_id,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data).catch((err) => {throw err});
    return NextResponse.json({status: true, data: response.data});
}

