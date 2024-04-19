import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Shared/Navbar";
import CreateProjectPage from "./pages/CreateProjectPage";
import { Toaster } from "react-hot-toast";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import Footer from "./components/Shared/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
