import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function MovieSearch() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllShows = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.tvmaze.com/shows?page=${page}`
        );
        const json = await response.json();
        setShows(json);
      } catch (error) {
        console.log("Fetching All Shows Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllShows();
  }, [page]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleShowClick = (id) => {
    navigate(`/show/${id}`);
  };

  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>TV Shows</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "300px",
          fontSize: "16px",
        }}
      />

      {loading ? (
        <p>Loading shows...</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {filteredShows.length > 0 ? (
            filteredShows.map((show) => (
              <div
                key={show.id}
                onClick={() => handleShowClick(show.id)}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "200px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h3>{show.name}</h3>
                <p>
                  <strong>Rating:</strong> {show.rating?.average ?? "N/A"}
                </p>
                <p>
                  <strong>Year:</strong>{" "}
                  {show.premiered?.split("-")[0] ?? "N/A"}
                </p>
                {show.image?.medium && (
                  <img
                    src={show.image.medium}
                    alt={show.name}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No shows found.</p>
          )}
        </div>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Previous
        </button>
        <span style={{ fontWeight: "bold" }}>Page {page + 1}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ marginLeft: "10px", padding: "10px 20px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MovieSearch;
