import { useEffect } from "react";
import { useState } from "react";
import { getListPodcast } from "../../services/apipodcast";
import "./ListPodcast.css";

function ListPostcast() {
  const [podcastList, setPodcastList] = useState([]);

  useEffect(() => {
    getListPodcast().then((data) => {
      setPodcastList(data);
    });
  }, []);
  console.log(podcastList);

  return (
    <>
      <div className="container-principal">
        <div className="container-header">
          <div className="container-title-principal-view">
            <h1 className="title-principal-view">Podcaster</h1>
          </div>
          <div>
            <input type="text" placeholder="Buscar por nombre" />
            <button>Buscar</button>
          </div>
        </div>
        <div className="grid-container">
          {podcastList.map((podcast) => (
            <div className="grid-item">
              <li key={podcast.id}>
                <img src={podcast.img} alt={podcast.name} />
                <h2 className="list-name-artist">{podcast.name}</h2>
                <p className="list-name-author">Author:{podcast.author}</p>
              </li>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default ListPostcast;
