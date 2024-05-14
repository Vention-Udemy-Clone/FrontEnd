import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />

      <main className="container flex-1 mx-auto px-4 py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
