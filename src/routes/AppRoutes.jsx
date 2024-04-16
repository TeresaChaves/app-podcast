import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPodcast from "../pages/ListPodcast/ListPodcast";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListPodcast />} />
    </Routes>
  );
}
export default AppRoutes;
