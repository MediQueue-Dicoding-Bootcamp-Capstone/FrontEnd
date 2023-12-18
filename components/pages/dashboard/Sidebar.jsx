'use client'
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { BsFilePersonFill, BsXCircle } from "react-icons/bs";
import { FaCapsules, FaUserGear, FaArrowRightFromBracket, FaUserDoctor } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const handleLogout = () => {
      // delete all localstorage & cookies
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push("/");
      // delete all cookies
      
    }
    return (
      <aside className="fixed h-full lg:static bg-primary z-20 flex flex-col">
        <div className="w-full flex justify-center pt-4 items-center">
          <Image
            src={logo}
            alt="logo"
            width={300}
            height={300}
            className="w-40 h-full"
          />
          <button className="absolute top-8 right-2 text-white lg:hidden">
            <BsXCircle size={32} />
          </button>
        </div>
        <nav className="w-full p-4 h-full overflow-y-auto">
          <ul className="w-full px-2">
            <li className="w-full py-2">
              <Link
                href="/dashboard/patient"
                className={`w-full flex text-base items-center px-4 py-2 ${pathname == "/dashboard/patient" ? "text-secondary":"text-white"} hover:text-primary hover:bg-white rounded gap-2 `}
              >
                <BsFilePersonFill size={24} />
  
                <span className="font-semibold">Patient</span>
              </Link>
            </li>
            <li className="w-full py-2">
              <Link
                href="/dashboard/doctor"
                className={`w-full flex text-base items-center px-4 py-2 ${pathname == "/dashboard/doctor" ? "text-secondary":"text-white"} hover:text-primary hover:bg-white rounded gap-2 `}
              >
                <FaUserDoctor  size={24} />
  
                <span className="font-semibold">Doctor</span>
              </Link>
            </li>
            <li className="w-full py-2">
              <Link
                href="/dashboard/drug"
                className={`w-full flex text-base items-center px-4 py-2 hover:bg-white hover:text-primary rounded gap-2 ${pathname == "/dashboard/drug" ? "text-secondary":"text-white"}`}
              >
                <FaCapsules size={24} />
  
                <span className="font-semibold">Drug</span>
              </Link>
            </li>
            <li className="w-full py-2">
              <Link
                href="/dashboard/management-user"
                className={`w-full flex text-base items-center px-4 py-2 hover:bg-white hover:text-primary rounded gap-2 ${pathname == "/dashboard/management-user" ? "text-secondary":"text-white"}`}
              >
                <FaUserGear size={24} />
  
                <span className="font-semibold">Management User</span>
              </Link>
            </li>
            <li className="w-full py-2">
              <button className="w-full flex text-base items-center bg-secondary/50 px-4 py-2 text-white hover:bg-white hover:text-primary rounded gap-2 " onClick={handleLogout}>
                <FaArrowRightFromBracket size={24} />
  
                <span className="font-semibold">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    );
  };

  export default Sidebar;