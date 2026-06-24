import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="min-h-screen min-w-full bg-[#FAFAFA] font-sans">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}