import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPodcastDetail } from "../../services/apipodcast";
import { NavLink } from "react-router-dom";
import "./EpisodeDetail.css";
import SideBar from "../../components/SideBar";
import Loader from "../../components/Loader";

function EpisodeDetail() {
  const { episodeId, podcastid } = useParams();
  const [podcastDetail, setPodcastDetail] = useState([]);
  const [episodeDetail, setEpisodeDetail] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      try {
        const response = await getPodcastDetail(podcastid);
        setPodcastDetail(response);
        const episodeIdNumber = parseInt(episodeId, 10);
        const episode = response.find((episode) => {
          return episode.trackId === episodeIdNumber;
        });
        setEpisodeDetail(episode);
        setLoader(false);
      } catch (error) {
        console.error("Error al obtener el detalle del podcast:", error);
        setLoader(false);
      }
    };
    fetchPodcastDetail();
  }, [podcastid, episodeId]);
  useEffect(() => {
    console.log("episodeDetail:ssss", episodeDetail);
  }, [episodeDetail]);

  if (loader) {
    return <p>Cargando...</p>;
  }

  if (!episodeDetail) {
    return <p>No se encontró el episodio.</p>;
  }

  return loader ? (
    <div className="loader">
      <Loader />
    </div>
  ) : (
    <div className="container-principal">
      <div className="container-header-detail">
        <div className="container-title-principal-view">
          <NavLink to={"/"}>
            <h1 className="title-principal-view">Podcaster</h1>
          </NavLink>
        </div>
        <div className="container-section-detail">
          <NavLink to={`/podcast/${podcastid}/`}>
            <SideBar podcastDetail={podcastDetail} />
          </NavLink>
        </div>
        <div className="container-player-episode">
          <h2>{episodeDetail.trackTitle}</h2>
          <p>
            {" "}
            <div
              dangerouslySetInnerHTML={{ __html: episodeDetail.description }}
            />
          </p>

          <audio controls className="black-audio-player">
            <source src={episodeDetail.previewUrl} type="audio/mp3" />
          </audio>
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetail;
