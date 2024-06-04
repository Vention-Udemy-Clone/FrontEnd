import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <main className="container flex flex-1 py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
