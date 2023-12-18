"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import doctor from "@/public/doctor1.jpg";
import Link from "next/link";
import { BsFilePersonFill, BsXCircle } from "react-icons/bs";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

import {
  FaCapsules,
  FaUserGear,
  FaArrowRightFromBracket,
  FaCircleUser,
} from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToBackend, formatTime } from "@/lib/format";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Sidebar from "@/components/pages/dashboard/Sidebar";

export default function Page() {
  const [value, onChange] = useState(new Date());
  const date = formatDateToBackend(value);
  const { data, isLoading, error } = useSWR(
    `/api/dashboard/patient/${date}`,
    fetcher
  );
  const allDoctor = data?.data?.data;
  const [show, setShow] = useState(0);
  const [appointments, setAppointments] = useState();
  console.log(value);
  console.log(appointments);
  console.log(data);
  const [name, setName] = useState();
  useEffect(() => {
    const name = localStorage.getItem("name");
    setName(name);
    if (data) {
      setAppointments(data?.data?.data[show]?.appointments);
    }
  }, [data, show]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/dashboard/patient", {
          params: {
            date: formatDateToBackend(value), // or format it as your API expects
          },
        });

        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [value]);
  return (
    <>
      <div className="w-full bg-white py-2 rounded-md mb-4">
        <p className="text-xl font-semibold text-primary text-center">
          {" "}
          Patient
        </p>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-1/3">
          <div className="w-full mb-4  overflow-hidden">
            <Calendar
              onChange={onChange}
              value={value}
              locale="en-EN"
              className={"rounded-md"}
            />
          </div>
          <div className="w-full p-3 bg-white rounded-2xl">
            <p className="font-semibold">Doctor</p>
            <div className="w-full flex flex-col py-2 gap-2 h-[40vh] overflow-y-scroll">
              {allDoctor?.map((doctor, index) => (
                <div
                  className={`flex items-center p-3 gap-3 cursor-pointer ${
                    show == index ? "bg-primary text-white " : "text-primary"
                  } rounded-2xl`}
                  key={doctor.id}
                  onClick={() => setShow(index)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doctor.image_url}`}
                    alt="logo"
                    width={200}
                    height={200}
                    className="rounded-full aspect-square h-16 w-auto object-cover"
                  />
                  <div className="">
                    <p className="font-semibold">{doctor.name}</p>
                    <p>{doctor.specialist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-2/3">
          {appointments?.length == 0 ? (
            <div className="w-full bg-white p-4 text-center rounded-md mb-4">
              NO DATA
            </div>
          ) : (
            <div className="w-full p-3 bg-white rounded-xl">
              <Table className="h-[500px]">
                <TableHeader>
                  <TableRow className="place-items-start">
                    <TableHead>No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments?.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.no_queue}
                      </TableCell>
                      <TableCell>{appointment.patient_name}</TableCell>
                      <TableCell>{appointment.patient_phone_number}</TableCell>
                      <TableCell>{appointment.type_appointment}</TableCell>
                      <TableCell>
                        <span className="bg-yellow-100 py-1 px-2 border-2 border-yellow-500 text-yellow-400 rounded-md">
                          {appointment.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatTime(appointment.appointment_time)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
