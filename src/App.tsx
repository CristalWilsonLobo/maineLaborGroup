import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import JobSeekers from "./pages/JobSeekers";
import JobTickets from "./pages/JobTickets";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/job-seekers" element={<JobSeekers />} />
        <Route path="/job-tickets" element={<JobTickets />} />
      </Route>
    </Routes>
  );
}
