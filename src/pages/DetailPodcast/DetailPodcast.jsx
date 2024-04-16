import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPodcastDetail } from "../../services/apipodcast";
import { NavLink } from "react-router-dom";
import "./DetailPodcast.css";
import SideBar from "../../components/SideBar";

function DetailPodcast() {
  const { podcastid } = useParams();
  const [podcastDetail, setPodcastDetail] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      const response = await getPodcastDetail(podcastid);
      setPodcastDetail(response);
      setLoader(false);
    };
    fetchPodcastDetail();
  }, [podcastid]);
  console.log(podcastDetail);

  return loader ? (
    <p>Cargando...</p>
  ) : (
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

        <section className="main-section">
          <div className="episodes-count">{podcastDetail.length}</div>
          <ul className="episode-list">
            {podcastDetail.map((episode) => (
              <NavLink to={`/podcast/${podcastid}/episode/${episode.trackId}`}>
                <li key={episode.trackId}>
                  <h4>{episode.trackTitle}</h4>
                  <p>Fecha de publicación: {episode.releaseDate}</p>
                  <p>Duración: {episode.trackTimeMillis} minutos</p>
                  <p>id:{episode.trackId}</p>
                </li>
              </NavLink>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DetailPodcast;
