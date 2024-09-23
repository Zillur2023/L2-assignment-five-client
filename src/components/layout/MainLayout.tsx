import {  Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";


export default function MainLayout() {

  return (
    <>
      <div className="min-h-full">
        <Navbar />

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
             <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
