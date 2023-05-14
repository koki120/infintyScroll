import { Outlet } from "react-router-dom";

import { ScrollButton } from "@/components/layouts/options/ScrollButton";

export function DefaultLayout() {
  return (
    <>
      <header />
      <main className="mx-auto h-full w-full ph-in:py-12 ph-out:min-w-[72rem] ph-out:py-16">
        <Outlet />
        <ScrollButton />
      </main>
      <footer />
    </>
  );
}
