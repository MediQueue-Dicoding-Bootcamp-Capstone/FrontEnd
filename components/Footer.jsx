'use client';

import { usePathname } from "next/navigation";

export default function Footer() {
    const pathName = usePathname();
    if (pathName === "/login" || pathName === "/register" || pathName.startsWith("/dashboard")) {
        return null;
    }
    return(
        <footer className="w-full flex flex-col items-center bg-primary text-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-3 px-20 gap-20 py-10 border-b border-slate-100 w-full ">
          <div className="w-full text-center flex flex-col gap-1">
            <h2 className="text-xl font-bold">Contact Us</h2>
            <p className="text-xl">Address</p>
            <p className="text-xl">Phone</p>
            <p className="text-xl">Email</p>
          </div>
          <div className="w-full text-center flex flex-col gap-1">
            <h2 className="text-xl font-bold">Contact Us</h2>
            <p className="text-xl">Address</p>
            <p className="text-xl">Phone</p>
            <p className="text-xl">Email</p>
          </div>
          <div className="w-full text-center flex flex-col gap-1">
            <h2 className="text-xl font-bold">Contact Us</h2>
            <p className="text-xl">Address</p>
            <p className="text-xl">Phone</p>
            <p className="text-xl">Email</p>
          </div>

        </div>
        <div className="w-full text-center font-medium py-4">
          <p>&copy; 2023 Mediqueue Design by Capstone team 1</p>
        </div>
      </footer>
    )
}