import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <NuqsAdapter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </NuqsAdapter>
    </BrowserRouter>
  );
}

export default App;
