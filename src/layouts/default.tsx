import { Outlet } from "react-router-dom";

import { Header } from "../components/header";

export function DefaultLayout() {
  return (
    <>
      <Header />

      <main className="h-full p-2 max-h-screen">
        <div className="bg-white rounded border border-[#D8DFE6] p-4 size overflow-hidden">
          <Outlet />
        </div>
      </main>
    </>
  );
}
