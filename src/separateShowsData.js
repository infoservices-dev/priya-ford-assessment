import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.log("Error fetching show details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [id]);

  if (loading) return <p>Loading show details...</p>;
  if (!show) return <p>Show not found.</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>{show.name}</h1>
      <p>
        <strong>Rating:</strong> {show.rating?.average ?? "N/A"}
      </p>
      <p>
        <strong>Premiered:</strong> {show.premiered ?? "N/A"}
      </p>
      <p>
        <strong>Language:</strong> {show.language}
      </p>
      <p>
        <strong>Genres:</strong> {show.genres.join(", ")}
      </p>
      {show.image?.original && (
        <img
          src={show.image.original}
          alt={show.name}
          style={{ width: "300px", marginTop: "20px" }}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: show.summary }}
        style={{ marginTop: "20px", maxWidth: "600px", margin: "auto" }}
      />
      <br />
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        Back to list
      </Link>
    </div>
  );
}

export default ShowDetails;
