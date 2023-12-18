import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
const AppointmentSuccess = ({appointment}) => {
    return (
      <div className="w-full flex flex-col items-center mt-4">
        <div className="w-full md:w-2/3  flex flex-col md:flex-nowrap bg-secondary/20 border-l-2 border-secondary p-6 ">
          <div className="w-full flex items-center flex-col gap-2 mb-2"> 
          <FiCheckCircle size={60} className="text-primary"/>
          <p className="text-xl font-bold text-primary">Success Create Appointment</p>
          </div>
          <p className="text-base font-semibold px-4 text-primary">Thank You <span className="text-secondary">{appointment.data.patient_name}</span> You have successfully made an appointment at <span className="text-secondary">Citra Clinic</span> with Appointment Code {appointment.data.appointment_code} and you will meet <span className="text-secondary">{appointment.data.doctor_name}</span>, you are registered in the queue with queue number <span className="text-secondary font-bold">{appointment.data.no_queue}</span>, please come before <span className="text-secondary">{appointment.data.appointment_time}</span> WIB</p>
        </div>
          <Link href={"/appointment/my-appointment"} className="bg-primary text-white font-semibold px-4 py-2 rounded-md mt-4">
          Check My Appointment
          </Link>
      </div>
    );
  };

  export default AppointmentSuccess;