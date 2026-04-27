import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ScrollToTop from "./components/utils/ScrollToTop";

import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors theme="light" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

