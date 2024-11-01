import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Shared/Navbar";
import Hero from "./components/Shared/Hero";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import Footer from "./components/Shared/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState(""); // Ensure token is set properly

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      });
      const data = await result.json();
      setProjects(data);
    };
    if (token) fetchProjects(); // Fetch projects only if token is set
  }, [token]);

  const addTask = async (event, projectId) => {
    event.preventDefault();

    const newTask = {
      name: event.target.task.value,
      deadline: event.target.deadline.value,
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Authorization header
      },
      body: JSON.stringify(newTask),
    });

    event.target.task.value = "";
    event.target.deadline.value = "";
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Routes>
          <Route path="/" element={<HomePage projects={projects} />} />
          <Route
            path="/create-project"
            element={<CreateProjectPage addTask={addTask} />}
          />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
