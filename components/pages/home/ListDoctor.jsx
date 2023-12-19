"use client";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import fetcher from "@/lib/fetcher";
const ListDoctor = () => {
  const { data, error } = useSWR("/api/doctors", fetcher);
  const doctors = data ? data.data.data : [];
  const isLoading = !data && !error;

  if (isLoading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }
  return (
    <section className="w-full flex justify-center lg:min-h-screen items-center" id="doctor">
      <div className="max-w-5xl py-24">
        <h2 className="text-2xl font-bold text-center mb-8">Doctors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:px-4 md:grid-cols-3 gap-4 ">
          {doctors.map((doctor) => (
            <div
              className="w-full bg-slate-300 rounded-xl overflow-hidden flex flex-col"
              key={doctor.id}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doctor.image_url}`}
                alt="Doctor 1"
                width={500}
                height={500}
                className="h-60 w-full"
              />
              <div className="p-4 text-center h-fit">
                <h3 className="text-xl font-semibold ">{doctor.name}</h3>
                <p className="text-sm mb-2">{doctor.specialist}</p>
                <Link
                  href={"/appointment"}
                  className="bg-secondary block text-white px-3 py-2 rounded-md"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ListDoctor;
