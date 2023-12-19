import Image from "next/image";
import Link from "next/link";
import herosection from "@/public/herosection.webp";
import doctor from "@/public/doctor1.jpg";
import facility from "@/public/facility.png";
import facility2 from "@/public/facility2.jpg";
import ListDoctor from "@/components/pages/home/ListDoctor";
export const metadata = {
  title: 'Home | MediQueue',
  description: 'MediQueue is an application to make it easier for patients who want to consult about their health.',
}
export default function Home() {
  return (
    <main className="w-full">
      <section className="bg-primary w-full flex justify-center" id="home">
        <div className="max-w-5xl py-24 md:items-center justify-center px-6 flex flex-col-reverse gap-8 md:gap-4 md:flex-row md:h-[90VH] lg:h-[95vh]">
          <div className="w-full md:w-1/2 flex justify-center flex-col p-1">
            <h2 className="text-2xl lg:text-6xl font-bold text-white md:text-4xl mb-2">
              MediQueue
              <span className="text-tertiary"> Easy To Use</span>
            </h2>
            <p className="mb-4 text-white ">
            MediQueue is an application to make it easier for patients who want to consult about their health.
            </p>
            <div className="flex w-full justify-center md:justify-start">
              <Link
                href={"/appointment"}
                className="bg-secondary text-white font-semibold py-3 px-5  rounded-md"
              >
                Book Appointment
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 rounded-3xl overflow-hidden md:h-3/4">
            <Image
              src={herosection}
              width={500}
              height={500}
              alt="hero"
              className="w-full h-full"
              priority
            />
          </div>
        </div>
      </section>
      <ListDoctor />
      <section className="py-20 w-full flex flex-col  items-center lg:min-h-screen" id="facilities">
        <div className="max-w-5xl w-full flex flex-col gap-8 px-4">
          <h2 className="text-3xl font-semibold mb-2 md:mb-8 text-center">
            Facilities
          </h2>

          <div className="flex gap-4 items-center max-w-3xl ">
            <Image
              src={facility}
              width={500}
              height={500}
              alt="asasda"
              className="w-60 h-80 rounded-xl object-cover"
            />
            <div className="mr-12">
              <h2 className="text-xl font-bold mb-4">Facility</h2>
              <p className="">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto alias reprehenderit quibusdam cum laudantium optio
                eligendi dicta repellat ducimus ipsam?
              </p>
            </div>
          </div>
          <div className="ml-auto flex flex-row-reverse gap-4 items-center max-w-3xl ">
            <Image
              src={facility2}
              width={500}
              height={500}
              alt="asasda"
              className="w-60 h-80 rounded-xl object-cover"
            />
            <div className="ml-12">
              <h2 className="text-xl font-bold mb-4">Facility</h2>
              <p className="">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto alias reprehenderit quibusdam cum laudantium optio
                eligendi dicta repellat ducimus ipsam?
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-screen flex items-center justify-center bg-primary py-20 border-b border-white" id="gallery">
        <div className="max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Image
              src={doctor}
              width={500}
              height={500}
              alt="asasda"
              className="w-full h-60 rounded-xl"
            />
            <Image
              src={doctor}
              width={500}
              height={500}
              alt="asasda"
              className="w-full h-60 rounded-xl"
            />
            <Image
              src={doctor}
              width={500}
              height={500}
              alt="asasda"
              className="w-full h-60 rounded-xl"
            />
            <Image
              src={doctor}
              width={500}
              height={500}
              alt="asasda"
              className="w-full h-60 rounded-xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
