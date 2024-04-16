import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPodcastDetail } from "../../services/apipodcast";
import { NavLink } from "react-router-dom";
import "./EpisodeDetail.css";
import SideBar from "../../components/SideBar";

function EpisodeDetail() {
  const { episodeId, podcastid } = useParams();
  const [podcastDetail, setPodcastDetail] = useState([]);
  const [episodeDetail, setEpisodeDetail] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      try {
        const response = await getPodcastDetail(podcastid);
        console.log("response:", response); // Verifica el contenido de response

        setPodcastDetail(response);

        // Verifica los trackId de cada objeto en response
        response.forEach((episode) => {
          console.log("trackId:", episode.trackId);
        });

        // Convierte episodeId a un número
        const episodeIdNumber = parseInt(episodeId, 10);

        // Busca el episodio con el episodeId
        const episode = response.find((episode) => {
          console.log(
            "Comparando episodeId:",
            episodeIdNumber,
            "con trackId:",
            episode.trackId
          );
          console.log(typeof episodeIdNumber, typeof episode.trackId); // Verifica los tipos de datos (number vs number)
          return episode.trackId === episodeIdNumber;
        });
        console.log("episode:", episode); // Verifica el episodio encontrado

        setEpisodeDetail(episode);
        setLoader(false);
      } catch (error) {
        console.error("Error al obtener el detalle del podcast:", error);
        setLoader(false);
      }
    };
    fetchPodcastDetail();
  }, [podcastid, episodeId]);

  if (loader) {
    return <p>Cargando...</p>;
  }

  if (!episodeDetail) {
    return <p>No se encontró el episodio.</p>;
  }

  return (
    <div className="container-principal">
      <div className="container-header-detail">
        <div className="container-title-principal-view">
          <NavLink to={"/"}>
            <h1 className="title-principal-view">Podcaster</h1>
          </NavLink>
        </div>
        <div className="container-section-detail">
          <SideBar podcastDetail={podcastDetail} />
        </div>

        <h1>{episodeDetail.trackTitle}</h1>
        <img src={episodeDetail.artworkUrl600} alt="Podcast Artwork" />
        <h2>{episodeDetail.artistName}</h2>
        <p>{episodeDetail.description}</p>
        <p>
          {episodeDetail.trackTitle} {episodeDetail.releaseDate}
        </p>
        <p>{episodeDetail.collectionTitle}</p>
      </div>
    </div>
  );
}

export default EpisodeDetail;
