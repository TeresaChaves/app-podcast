import { useEffect } from "react";
import { useState } from "react";
import { getListPodcast } from "../../services/apipodcast";
import "./ListPodcast.css";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";

function ListPostcast() {
  const [podcastList, setPodcastList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getListPodcast().then((data) => {
      setPodcastList(data);
      setLoader(false);
    });
  }, []);
  console.log(podcastList);

  return loader ? (
    <div className="loader">
      <Loader />
    </div>
  ) : (
    <div className="container-principal">
      <div className="container-header">
        <div className="container-title-principal-view">
          <NavLink to={"/"}>
            <h1 className="title-principal-view">Podcaster</h1>
          </NavLink>
        </div>
        <div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input-search"
          />

          <button className="button-search">Buscar</button>
        </div>
      </div>
      <div className="grid-container">
        {podcastList
          .filter((podcast) => {
            const titleMatches = podcast.name
              .toLowerCase()
              .includes(searchText.toLowerCase());
            const authorMatches = podcast.author
              .toLowerCase()
              .includes(searchText.toLowerCase());
            return titleMatches || authorMatches;
          })
          .map((podcast) => (
            <NavLink to={`/podcast/${podcast.id}`}>
              <div className="grid-item" key={podcast.id}>
                <img src={podcast.img} alt={podcast.name} />
                <h2 className="list-name-artist">{podcast.name}</h2>
                <p className="list-name-author">Author:{podcast.author}</p>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
}
export default ListPostcast;
