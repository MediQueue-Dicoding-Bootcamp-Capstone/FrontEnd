"use client";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { FcSearch } from "react-icons/fc";
import { useState } from "react";
import Image from "next/image";
import doctor from "@/public/doctor1.jpg";
import Link from "next/link";
import ChooseDoctor from "@/components/pages/appointment/ChooseDoctor";
import Form from "@/components/pages/appointment/Form";
import AppointmentSuccess from "@/components/pages/appointment/AppointmentSuccess";
export default function Page() {
  const [showComponent, setShowComponent] = useState(1);
  const [isSuccess, setIsSuccess] = useState({ 1: true, 2: false, 3: false });
  const [selectedDoctor, setSelectedDoctor] = useState(null); 
  const [doctor , setDoctor] = useState(null);
  const [appointment, setAppointment] = useState();
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  }
  const handleShowComponent = (e, doctorId, doctor) => {
    e.preventDefault();
    if(!doctorId && !doctor){
      setShowComponent(showComponent + 1);
      setIsSuccess({ ...isSuccess, [showComponent + 1]: true });
      return;
    }
    handleSelectDoctor(doctorId)
    if (showComponent == 3) return;
    setShowComponent(showComponent + 1);
    setDoctor(doctor);
    setIsSuccess({ ...isSuccess, [showComponent + 1]: true });
  };
  const handleBackComponent = (e) => {
    e.preventDefault();
    if (showComponent == 1) return;
    setShowComponent(showComponent - 1);
    setIsSuccess({ ...isSuccess, [showComponent]: false });
  };
  const handleSendData = (data) => {
    setAppointment(data);
  };
  return (
    <main className="w-full flex justify-center py-20 lg:py-24">
      <div className="max-w-5xl  w-full flex flex-col items-center">
        <div className="px-4 md:px-0 w-full md:w-2/3 flex text-center rounded-md overflow-hidden">
          <div
            className={`text-sm md:text-base flex-1 p-2 border border-primary rounded-l-md font-semibold  flex items-center justify-center gap-1 md:gap-2 ${
              showComponent == 1 ? "bg-primary text-white" : "text-primary"
            }`}
          >
            {isSuccess[1] == true ? (
              <FiCheckCircle className="text-xl" />
            ) : (
              <FiCircle className="text-xl" />
            )}{" "}
            Choose Doctor
          </div>
          <div
            className={`text-sm md:text-base flex-1 p-2 border border-primary  font-semibold flex justify-center items-center gap-1 md:gap-2 ${
              showComponent == 2 ? "bg-primary text-white" : "text-primary"
            }`}
          >
            {isSuccess[2] == true ? (
              <FiCheckCircle className="text-xl" />
            ) : (
              <FiCircle className="text-xl" />
            )}
            Fill The Form
          </div>
          <div
            className={`text-sm md:text-base flex-1 p-2 border border-primary font-semibold flex justify-center items-center gap-1 md:gap-2 rounded-r-md ${
              showComponent == 3 ? "bg-primary text-white" : "text-primary"
            }`}
          >
            {isSuccess[3] == true ? (
              <FiCheckCircle className="text-xl" />
            ) : (
              <FiCircle className="text-xl" />
            )}
            Success
          </div>
        </div>
        {showComponent == 1 ? (
          <ChooseDoctor handleShowComponent={handleShowComponent} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} handleSelectDoctor={handleSelectDoctor}/> 
        ) : showComponent == 2 ? (
          <Form
            handleShowComponent={handleShowComponent}
            handleBackComponent={handleBackComponent}
            handleSendData={handleSendData}
            doctor={doctor}
          />
        ) : (
          <AppointmentSuccess appointment={appointment} />
        )}
       
      </div>
    </main>
  );
}






