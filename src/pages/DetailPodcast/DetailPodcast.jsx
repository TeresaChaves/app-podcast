import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPodcastDetail } from "../../services/apipodcast";
import { NavLink } from "react-router-dom";
import "./DetailPodcast.css";
import SideBar from "../../components/SideBar";
import Loader from "../../components/Loader";

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("es-ES", options); // Ajusta el idioma según tu preferencia
  }

  return loader ? (
    <div className="loader">
      <Loader />
    </div>
  ) : (
    <div className="container-principal">
      <div className="container-title-principal-view">
        <NavLink to={"/"}>
          <h1 className="title-principal-view">Podcaster</h1>
        </NavLink>
      </div>
      <div className="container-section-detail">
        <SideBar podcastDetail={podcastDetail} />
      </div>
      <section className="main-section">
        <div className="table-episodes-tittle">
          <p>Episodes {podcastDetail?.length - 1}</p>
          <hr
            style={{
              height: "0.5px",
              backgroundColor: "lightblue",
              border: "none",
              minWidth: "800px",
            }}
          />
        </div>
        <div className="table">
          <div className="table-row header">
            <div className="table-cell-tittle">
              <p>Title</p>
            </div>
            <div className="table-cell">
              <p>Date</p>
            </div>
            <div className="table-cell">
              <p>Duratión</p>
            </div>
          </div>
          {podcastDetail?.map((episode, index) => (
            <div
              className={`table-row ${index % 2 === 0 ? "even" : "odd"}`}
              key={episode.trackId}
            >
              <NavLink
                to={`/podcast/${podcastid}/episode/${episode.trackId}`}
                className="table-cell-tittle"
              >
                <div>
                  <span>{episode.trackTitle}</span>
                </div>
              </NavLink>
              <NavLink
                to={`/podcast/${podcastid}/episode/${episode.trackId}`}
                className="table-cell"
              >
                <div className="table-cell">
                  {formatDate(episode.releaseDate)}
                </div>
              </NavLink>
              <NavLink
                to={`/podcast/${podcastid}/episode/${episode.trackId}`}
                className="table-cell"
              >
                <div>
                  {(episode.trackTimeMillis / 60000).toFixed(2)} minutos
                </div>
              </NavLink>
              <hr />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DetailPodcast;
