import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import React, { Suspense } from "react";

const PromptInput = React.lazy(() => import("./components/PromptInput/index"))
const Dashboard = React.lazy(() => import("./components/Dashboard"))
const About = React.lazy(() => import("./components/About"))
const Contact = React.lazy(() => import('./components/Contact'))


export default function App(): React.JSX.Element {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Suspense fallback={<div>Loading...</div>} >
          <Routes>
            <Route path="/" element={<PromptInput />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:id" element={<PromptInput />} />
          </Routes>
        </Suspense >
      </main>
    </div>
  );
}