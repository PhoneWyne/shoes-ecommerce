import { Navbar } from "./navbar/Navbar";
import { Footer } from "./footer/Footer";

export function Layout({ children }) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-8">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
  