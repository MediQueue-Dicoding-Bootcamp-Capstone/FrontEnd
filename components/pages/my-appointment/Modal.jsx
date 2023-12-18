import fetcher from "@/lib/fetcher";
import { formatDate, formatTime } from "@/lib/format";
import Image from "next/image";
import useSWR from "swr";
export default function Modal({ id, closeModal }) {
  console.log(id);
  const { data, isLoading, error } = useSWR(`/api/appointment/${id}`, fetcher);
  const appointment = data?.data;
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  return (
    <div>
      <div
        className="top-0 left-0 right-0 fixed flex justify-center items-center w-full h-screen z-20 bg-white/80 "
        onClick={closeModal}
      >
        <div
          className="flex justify-center  max-w-2xl w-full h-[70vh]  bg-slate-300 z-20 relative rounded-md"
          onClick={stopPropagation}
        >
          <button className="bg-blue-400 absolute -top-2 -right-2 h-10 aspect-square w-auto rounded-full" onClick={closeModal}>
            X
          </button>
          <div className="w-full max-w-2xl overflow-y-auto">
            <div className="w-full flex flex-col p-3">
              <h2 className="text-xl font-semibold text-center mb-4">
                Appointment Detail
              </h2>

              <div class="relative overflow-x-auto">
                {isLoading ? <div>Loading...</div> : (
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Appointment Code
                      </th>

                      <td class="px-2 py-1">{appointment.appointment_code}</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Appointment Date
                      </th>

                      <td class="px-2 py-1">
                        {formatDate(appointment.appointment_date)}
                      </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Appointment Time
                      </th>

                      <td class="px-2 py-1">
                        {formatTime(appointment.appointment_time)}
                      </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Patient Name
                      </th>

                      <td class="px-2 py-1">{appointment.patient_name}</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Patient Phone Number
                      </th>

                      <td class="px-2 py-1">
                        {appointment.patient_phone_number}
                      </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Patient Address
                      </th>

                      <td class="px-2 py-1">{appointment.patient_address}</td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Status
                      </th>

                      <td class="px-2 py-1">{appointment.status}</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Type Appointment
                      </th>

                      <td class="px-2 py-1">{appointment.type_appointment}</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        No Queue
                      </th>

                      <td class="px-2 py-1">{appointment.no_queue}</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Doctor
                      </th>

                      <td class="px-2 py-1">{appointment.doctor.name}</td>
                    </tr>
                  </tbody>
                </table>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
