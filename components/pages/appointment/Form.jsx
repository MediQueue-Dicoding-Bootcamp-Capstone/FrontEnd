'use client';
import { useRef, useState } from "react";
import axios from "axios";
const Form = ({ handleShowComponent, handleBackComponent,doctor, handleSendData }) => {
   const formRef = useRef(null);
    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData);
      const dataParams = {
        ...data,
        doctor_id: doctor.doctor_id,
      }
      const response = await axios.post("/api/appointment", dataParams);
      handleSendData(response.data);
      handleShowComponent(e);
    }
    const [selectTypeAppointment, setSelectTypeAppointment] = useState();
    return (
      <div className="w-full flex justify-center mt-4 px-4 lg:px-0">
        <div className="w-full md:w-2/3  flex flex-wrap md:flex-nowrap bg-slate-200 rounded-md ">
          <form className="w-full flex flex-col px-8 py-4" onSubmit={handleSubmit} ref={formRef}>
            <p className="text-base font-semibold mb-2">Data Patient</p>
            <div className="text-sm mb-2">
              <label htmlFor="doctor">Doctor</label>
              <input type="text"  value={`${doctor.name} - ${doctor.specialist}`} disabled name="doctor" id="doctor"
               className="w-full border-2 border-primary rounded-md py-1 px-2 text-sm focus:outline-none focus:border-secondary bg-slate-300"/>
            </div>
            <div className="text-sm mb-2">
              <label htmlFor="patient_name">Name</label>
              <input
                type="text"
                name="patient_name"
                id="patient_name"
                className="w-full border-2 border-primary rounded-md py-1 px-2 text-sm focus:outline-none focus:border-secondary bg-slate-50"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="text-sm mb-2">
              <label htmlFor="patient_phone_number">No. Telephone</label>
              <input
                type="text"
                name="patient_phone_number"
                id="patient_phone_number"
                className="w-full border-2 border-primary rounded-md py-1 px-2 text-sm focus:outline-none focus:border-secondary bg-slate-50"
                placeholder="085123123321"
                required
              />
            </div>
            <div className="text-sm mb-2">
              <label htmlFor="appointment_date">Appointment Date</label>
              <input
                type="date"
                name="appointment_date"
                id="appointment_date"
                className="w-full border-2 border-primary rounded-md py-1 px-2 text-sm focus:outline-none focus:border-secondary bg-slate-50"
                required
              />
            </div>
            <div className="text-sm mb-2">
              <label htmlFor="patient_address">Address</label>
              <textarea
                name="patient_address"
                id="patient_address"
                className="w-full border-2 border-primary rounded-md py-1 px-2 text-sm focus:outline-none focus:border-secondary bg-slate-50"
                placeholder="Jl. Jalan No. 1"
                required
              />
            </div>
            {/* type appointment = Mandiri, Asuransi, BPJS. create radio button but style like button */}
            <div className="text-sm mb-6">
              <label htmlFor="type_appointment">Type Appointment</label>
              <div className="flex gap-2 pt-2">
                <div className={`flex items-center gap-1  rounded cursor-pointer `}>
                  <input
                    type="radio"
                    name="type_appointment"
                    id="mandiri"
                    className="hidden"
                    value={"Mandiri"}
                    checked={selectTypeAppointment == "Mandiri"}
                    onChange={(e) => setSelectTypeAppointment(e.target.value)}
                  />
                  <label
                    className={`cursor-pointer w-full px-4 py-2 h-full ${selectTypeAppointment == "Mandiri" ? "bg-primary text-white" : "text-primary bg-slate-100" }`}
                    htmlFor="mandiri"
                  >
                    Mandiri
                  </label>
                </div>
                <div className={`flex items-center gap-1 px-4 py-2 rounded cursor-pointer ${selectTypeAppointment == "Asuransi" ? "bg-primary text-white" : "text-primary bg-slate-100" }`}>
                  <input
                    type="radio"
                    name="type_appointment"
                    id="Asuransi"
                    className="hidden"
                    value={"Asuransi"}
                    checked={selectTypeAppointment == "Asuransi"}
                    onChange={(e) => setSelectTypeAppointment(e.target.value)}
                  />
                  <label
                    className="cursor-pointer"
                    htmlFor="Asuransi"
                  >
                    Asuransi
                  </label>
                </div>
                <div className={`flex items-center gap-1 px-4 py-2 rounded cursor-pointer ${selectTypeAppointment == "BPJS" ? "bg-primary text-white" : "text-primary bg-slate-100" }`}>
                  <input
                    type="radio"
                    name="type_appointment"
                    id="BPJS"
                    className="hidden"
                    value={"BPJS"}
                    checked={selectTypeAppointment == "BPJS"}
                    onChange={(e) => setSelectTypeAppointment(e.target.value)}
                  />
                  <label
                    className="cursor-pointer"
                    htmlFor="BPJS"
                  >
                    BPJS
                  </label>
                </div>
            
               
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-2 md:gap-8 md:px-4">
              <button
                className="bg-secondary/20 py-1 rounded-md text-secondary font-semibold border border-secondary"
                onClick={handleBackComponent}
              >
                Back
              </button>
              <button
                className="bg-secondary py-1 rounded-md text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Form;