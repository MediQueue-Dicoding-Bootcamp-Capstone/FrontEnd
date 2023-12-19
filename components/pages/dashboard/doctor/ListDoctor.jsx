'use client'
import fetcher from "@/lib/fetcher";
import { formatTime } from "@/lib/format";
import useSWR from "swr";
const ListDoctor = () => {
    const {data, isLoading, error} = useSWR("/api/dashboard/doctor", fetcher);
    console.log(data)
    const doctors = data?.data?.data
  return (
    <>
      {isLoading ? (
        <div className="w-full bg-white rounded-md p-4">Loading...</div>
      ) : (
        <div className="w-full bg-white rounded-md p-4">
          <h2 className="font-semibold text-primary">List Doctor</h2>
          <div className="w-full h-[75vh] overflow-y-scroll">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Name</th>
                  <th className="py-2">Start Hour</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors?.map((doctor) => (
                  <tr className="" key={doctor.id}>
                    <td className="py-2">
                      <a
                        href="mailto:
                          "
                        className="w-44 inline-block truncate"
                      >
                        {doctor.name}
                      </a>
                    </td>
                    <td className="py-2">{formatTime(doctor?.start_hour)}</td>
                    <td className="py-2 flex gap-2">
                      <button className="bg-primary text-white py-1 px-2 rounded-md">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white py-1 px-2 rounded-md">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ListDoctor;