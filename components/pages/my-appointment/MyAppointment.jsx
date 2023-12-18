"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useState } from "react";
import { formatTime,formatDate } from "@/lib/format";
import Modal from "./Modal";

const MyAppointment = () => {
  const [page, setPage] = useState(1);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const { data, error,isLoading } = useSWR(
    `/api/appointment/my-appointment/${page}`,
    fetcher
  );
  const current_page = data?.data?.data?.current_page;
  const last_page = data?.data?.data?.last_page;
  const handleButton = (type) => {
    console.log("klik");
    if (type == "next") {
      if (current_page === last_page) {
        return;
      }
      setPage(page + 1);
      scrollToTop();
    } else if (type == "previous") {
      if (current_page === 1) {
        return;
      }
      setPage(page - 1);
      scrollToTop();
    }
  };
  console.log(page);
  console.log(current_page);
  console.log(data);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState();
  const handleDetail = (id) => {
    console.log(id)
    setModalShow(true);
    setId(id);
  }
  const closeModal = () => {
    console.log('trigger')
    setModalShow(false);
  }
  if(isLoading) return <div className="flex justify-center py-20">Loading...</div>
  return (
    <div className="max-w-5xl w-full relative">
      {modalShow ? <Modal id={id} closeModal={closeModal} /> : null}
      <h2 className="w-full border-b-2 border-primary mb-4">My Appointment</h2>
      <div className="w-full">
        <div className="w-full px-4 bg-slate-200 mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appointment Code</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>No Queue</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Option</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.data?.data.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {appointment.appointment_code}
                  </TableCell>
                  <TableCell>{formatDate(appointment.appointment_date)}</TableCell>
                  <TableCell>{appointment.no_queue}</TableCell>
                  <TableCell>{appointment.doctor.name}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>{formatTime(appointment.appointment_time)}</TableCell>
                  <TableCell className="text-right">
                    <button className="bg-blue-500 py-1 px-2 rounded-md text-white" onClick={() =>handleDetail(appointment.id)}>
                      Check Detail
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {isLoading ? null :(  <div className="w-full flex justify-center items-center">
          {current_page === 1 ? null : (
            <button
              className="bg-primary text-white py-1 px-2 text-base rounded-md"
              onClick={() => handleButton("previous")}
            >
              Previous
            </button>
          )}
          <p className="mx-2">
            Page {data?.data?.data?.current_page} of{" "}
            {data?.data?.data?.last_page}
          </p>
          {current_page === last_page ? null : (
            <button
              className="bg-primary text-white py-1 px-2 text-base rounded-md"
              onClick={() => handleButton("next")}
            >
              Next
            </button>
          )}
        
        </div>)}
      
      </div>
    </div>
  );
};
export default MyAppointment;
