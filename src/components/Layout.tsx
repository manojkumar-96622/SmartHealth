import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0D1117] transition-colors">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};
