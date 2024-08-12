// import { Navbar } from "../../layout/navbar/Navbar";
// import { Footer } from "../../layout/footer/Footer";
// shifted to Layout.jsx
export function HomePage() {
    return (
      <div className="flex flex-col min-h-screen">
        {/* <Navbar /> */}
        <main className="flex-grow container mx-auto p-8">
          <h1 className="text-3xl font-bold text-center">Welcome to Our Store</h1>
          <p className="text-center mt-4">
            Discover a variety of shoes and add them to your cart!
          </p>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }
  