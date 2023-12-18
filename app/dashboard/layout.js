import Sidebar from "@/components/pages/dashboard/Sidebar";

export default function RootLayout({ children }) {
  return (
    <main className=" w-full h-screen  flex overflow-hidden bg-primary">
      <Sidebar />
      <div className="p-2 w-full">
        <div className="bg-slate-200 w-full h-full overflow-auto rounded-3xl p-4">
          {children}
        </div>
      </div>
    </main>
  );
}
