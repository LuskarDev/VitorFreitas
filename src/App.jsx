import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useLenis from "./hooks/useLenis";
import CustomCursor from "./components/Cursor/CustomCursor";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  useLenis();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grain bg-[#060606] text-white antialiased">
      <CustomCursor />

      <div
        className={`fixed inset-0 z-[9999] bg-[#060606] flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="font-display text-4xl text-[var(--color-gold)] tracking-[0.15em] animate-pulse">
          VF
        </span>
      </div>

      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projeto/:slug" element={<ProjectPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
