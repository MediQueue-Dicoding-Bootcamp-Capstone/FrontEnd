'use client'
import ListUser from "@/components/pages/dashboard/management-user/ListUser";
import { useRef } from "react";
import axios from "axios";

export default function Page() {
  const formRef = useRef(null);
  const handleSubmit  = async(e) =>{
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const dataParams = {
      ...data
    }
    console.log(dataParams)
    const response = await axios.post("/api/dashboard/user", dataParams);

  }

  return (
    <>
      <div className="w-full bg-white py-2 rounded-md mb-4">
        <p className="text-xl font-semibold text-primary text-center">
          {" "}
          Management User
        </p>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-1/2">
          <div className="w-full p-4 bg-white rounded-md">
            <h2 className="font-semibold text-primary">Create User</h2>
            <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit} ref={formRef}>
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
                  placeholder="Your email"
                />
              </div>
              <div className="w-full">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
                  placeholder="Your password"
                />
              </div>

              <div className="w-full">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="user">User</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
              <button className="w-full bg-primary text-white py-2 rounded-md">
                Create User
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2">
       <ListUser />
        </div>
      </div>
    </>
  );
}
