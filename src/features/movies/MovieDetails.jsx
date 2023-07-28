import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const { movieId } = useParams();
  return (
    <div>
      MovieDetails{movieId}
      <Link to={"/"}>Go home</Link>
    </div>
  );
}

export default MovieDetails;
