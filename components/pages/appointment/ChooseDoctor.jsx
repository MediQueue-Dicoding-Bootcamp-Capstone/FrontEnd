"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import doctor from "@/public/doctor1.jpg";
import { FcSearch } from "react-icons/fc";
import useSWR, { preload } from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTime } from "@/lib/format";


const ChooseDoctor = ({
  handleShowComponent,
  selectedDoctor,
  handleSelectDoctor,
}) => {
  const [ListDoctor, setListDoctor] = useState();
  const { data, error, isLoading } = useSWR("/api/doctors", fetcher);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const searchRef = useRef(null);
  useEffect(() => {
    setListDoctor(data?.data?.data);
  }, [data]);

  const handleSearch = (e) => {
    const keyword = searchRef.current.value;
    if (keyword === "") return setListDoctor(data?.data?.data);
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      const search = ListDoctor.filter((doctor) => {
        if (doctor.name.toLowerCase().includes(keyword.toLowerCase())) {
          return doctor;
        }
      });
      setListDoctor(search);
    }
  };
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleOptionClick = (option) => {
    if (option === "No Filter") {
      setSelectedOption(option);
      setDropdownOpen(false);

      return setListDoctor(data?.data?.data);
    }
    const filter = data?.data?.data.filter((doctor) => {
      if (doctor.specialist.toLowerCase().includes(option.toLowerCase())) {
        return doctor;
      }
    });
    setListDoctor(filter);
    setSelectedOption(option);
    setDropdownOpen(false);
  };


  return (
    <div className="w-full mt-4 flex flex-col items-center ">
      <div className="px-4 md:px-0 w-full md:w-2/3  flex gap-3 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-2/3 overflow-hidden relative h-10">
          <input
            type="text"
            className="w-full h-full pl-7 pr-2 border-2 border-primary rounded-md"
            placeholder="Search Doctor"
            ref={searchRef}
            onKeyDown={handleSearch}
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 left-2 text-base"
            onClick={handleSearch}
          >
            <FcSearch />
          </button>
        </div>
        <div className="w-full md:w-1/3 relative flex h-10 ">
          <button
            className=" bg-primary text-white rounded-md w-full"
            onClick={toggleDropdown}
          >
            <p className="line-clamp-1 w-full text-sm">{selectedOption}</p>
          </button>
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {data.data.specialist.map((specialist) => (
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    role="menuitem"
                    onClick={() => handleOptionClick(specialist.specialist)}
                    key={specialist.specialist}
                  >
                    {specialist.specialist}
                  </button>
                ))}
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  role="menuitem"
                  onClick={() => handleOptionClick("No Filter")}
                >
                  No Filter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 md:px-0 w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-4">
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          ListDoctor?.map((doctor) => (
            <div
              className={`w-full ${
                selectedDoctor == doctor.id
                  ? "bg-primary text-white"
                  : "bg-slate-300 text-primary"
              } rounded-xl overflow-hidden flex flex-col cursor-pointer`}
              key={doctor.id}
              onClick={() => handleSelectDoctor(doctor.id)}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doctor.image_url}`}
                alt="Doctor 1"
                width={500}
                height={500}
                className="h-52 md:h-40 w-full object-cover"
              />
              <div className="p-2 text-center h-fit">
                <h3 className="text-base font-semibold ">{doctor.name}</h3>
                <p className="text-sm">{doctor.specialist}</p>
                <p className="text-sm mb-2">
                  {formatTime(doctor.start_hour)} -{" "}
                  {formatTime(doctor.end_hour)}
                </p>
                {/* <Link
                href={"/"}
                className="bg-secondary block text-white text-sm py-1 rounded-md"
              >
                Book Appointment
              </Link> */}
                <button
                  className="bg-secondary block text-white w-full text-sm py-1 rounded-md"
                  onClick={(e) =>
                    handleShowComponent(e, doctor.id, {
                      doctor_id: doctor.id,
                      name: doctor.name,
                      specialist: doctor.specialist,
                    })
                  }
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const SkeletonLoading = () => {
  return (
    <>
      <div
        className="w-full bg-slate-300 rounded-xl overflow-hidden flex flex-col"
        key={doctor.id}
      >
        <Skeleton className="h-52 md:h-40 w-full object-cover" />
        <div className="">
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          {/* <Link
                href={"/"}
                className="bg-secondary block text-white text-sm py-1 rounded-md"
              >
                Book Appointment
              </Link> */}
          <Skeleton className="w-full" />
        </div>
      </div>
      <div
        className="w-full bg-slate-300 rounded-xl overflow-hidden flex flex-col"
        key={doctor.id}
      >
        <Skeleton className="h-52 md:h-40 w-full object-cover" />
        <div className="">
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          {/* <Link
                href={"/"}
                className="bg-secondary block text-white text-sm py-1 rounded-md"
              >
                Book Appointment
              </Link> */}
          <Skeleton className="w-full" />
        </div>
      </div>
      <div
        className="w-full bg-slate-300 rounded-xl overflow-hidden flex flex-col"
        key={doctor.id}
      >
        <Skeleton className="h-52 md:h-40 w-full object-cover" />
        <div className="h-24">
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          {/* <Link
                href={"/"}
                className="bg-secondary block text-white text-sm py-1 rounded-md"
              >
                Book Appointment
              </Link> */}
          <Skeleton className="w-full" />
        </div>
      </div>
    </>
  );
};
export default ChooseDoctor;
