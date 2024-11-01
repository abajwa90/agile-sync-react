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
      try {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects`);
        if (!result.ok) {
          throw new Error('Network response was not ok'); // Handle errors
        }
        const data = await result.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects(); // Fetch projects when component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

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
