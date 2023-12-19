'use client'
import ListUser from "@/components/pages/dashboard/management-user/ListUser";
import { useRef } from "react";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Swal from "sweetalert2";
import ListDoctor from "@/components/pages/dashboard/doctor/ListDoctor";

export default function Page() {
  const { data, error } = useSWR("/api/dashboard/doctor/user", fetcher);
  console.log(data)
  const formRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
  
    try {
      const response = await axios.post("/api/dashboard/doctor", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Success create doctor",
      });
      formRef.current.reset();
    } catch (error) {
      console.error('Failed to post data:', error);
    }
  };

  return (
    <>
      <div className="w-full bg-white py-2 rounded-md mb-4">
        <p className="text-xl font-semibold text-primary text-center">
          {" "}
          Management Doctor
        </p>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-1/2">
          <div className="w-full p-4 bg-white rounded-md">
            <h2 className="font-semibold text-primary">Create Doctor</h2>
            <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit} ref={formRef} enctype="multipart/form-data" >
              <div className="w-full">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
                  placeholder="Your name"
                />
              </div>
              <div className="w-full">
                <label htmlFor="start_hour">Start Hour</label>
                <input
                  type="time"
                  name="start_hour"
                  id="start_hour"
                  className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
                  />
              </div>
              <div className="w-full">
                <label htmlFor="end_hour">End Hour</label>
                <input
                  type="time"
                  name="end_hour"
                  id="end_hour"
                  className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
                  />
              </div>
              {/* specialist */}
              <div className="w-full">
                <label htmlFor="specialist">Specialist</label>
                <input
                  type="text"
                  name="specialist"
                  id="specialist"
                  className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
                  placeholder="Doctor specialist"
                />
              </div>
              {/* image */}
              <div className="w-full">
                <label htmlFor="image_url">Image</label>
                <input
                  type="file"
                  name="image_url"
                  id="image_url"
                  className="w-full border-2 border-primary rounded-md p-2 focus:outline-none focus:border-secondary"
                  />  
              </div>
              {/* user id dropdown */}
              <div className="w-full">
                <label htmlFor="user_id">User</label>
                <select
                  name="user_id"
                  id="user_id"
                  className="w-full border-2 border-primary rounded-md p-2 focus:outline-none focus:border-secondary"
                  >
                    {data?.data?.data?.map((user) => (
                  <option value={user.id} key={user.id}>{user.name}</option>))}
                </select>
              </div>

    
              <button className="w-full bg-primary text-white py-2 rounded-md">
                Create Doctor
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2">
                      <ListDoctor />
        </div>
      </div>
    </>
  );
}
