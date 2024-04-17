function SideBar({ podcastDetail }) {
  if (!podcastDetail || podcastDetail.length === 0) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="sidebar">
      <img
        src={podcastDetail[0]?.artworkUrl600}
        alt="Imagen del podcast"
        className="podcast-image"
      />
      <hr
        style={{
          height: "0.5px",
          backgroundColor: "lightblue",
          border: "none",
        }}
      />
      <h2 className="podcast-title">{podcastDetail[0].collectionTitle}</h2>
      <hr
        style={{
          height: "0.5px",
          backgroundColor: "lightblue",
          border: "none",
        }}
      />
      <p className="podcast-author">by {podcastDetail[0].artistName}</p>
      <p className="podcast-description">{podcastDetail[0].description}</p>
    </div>
  );
}

export default SideBar;
