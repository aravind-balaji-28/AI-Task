import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PromptInput from "./components/PromptInput";

export default function App(): React.JSX.Element {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PromptInput />} />
          <Route path="/:id" element={<PromptInput />} />
        </Routes>
      </main>
    </div>
  );
}