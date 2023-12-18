import Image from "next/image";
import logologin from "@/public/logologin.png";
import Link from "next/link";
import FormRegister from "@/components/pages/register/FormRegister";

export default function Page() {
 
  return (
    <main className="w-full min-h-screen flex ">
      <div className="w-1/2 hidden h-screen md:flex items-center justify-center bg-primary">
        <Image
          src={logologin}
          width={400}
          height={400}
          alt="login logo"
          className="w-80 md:w-96"
        />
      </div>
      <div className="w-full md:w-1/2 h-screen bg-slate-200 ">
        <div className="w-full h-5/6 flex flex-col items-center justify-center px-4 lg:px-8 ">
          <h2 className="text-3xl font-semibold mb-10">Sign Up</h2>
          <FormRegister />
      
        </div>
        <div className="w-full h-1/6  px-8">
          <div className="w-full bg-secondary/50 text-center py-4 text-secondary font-semibold rounded-md text-base md:text-base">
            Have an account?{" "}
            <Link href={"/login"} className="font-bold ">
              Sign In
            </Link>
          </div>
          <Link href={"/"} className="text-center block mt-4 text-blue-600">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
