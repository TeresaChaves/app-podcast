import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPodcast from "../pages/ListPodcast/ListPodcast";
import DetailPodcast from "../pages/DetailPodcast/DetailPodcast";
import EpisodeDetail from "../pages/EpisodeDetail/EpisodeDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListPodcast />} />
      <Route path="/podcast/:podcastid" element={<DetailPodcast />} />
      <Route
        path="/podcast/:podcastid/episode/:episodeId"
        element={<EpisodeDetail />}
      />
    </Routes>
  );
}
export default AppRoutes;
