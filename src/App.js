import { useEffect, useState } from "react";

const initail = [
  {
    id: 1,
    name: "Harry Potter",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 2,
    name: "Harry Potter",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 3,
    name: "Harry Potter",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 4,
    name: "Harry Potter",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 5,
    name: "Harry Potter",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 6,
    name: "Harry Potter",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 7,
    name: "Harry Potter",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 8,
    name: "Harry Potter",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_.jpg",
  },
];
const KEY = "afaf4c73";

function App() {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("harry potter");
  const [movie_title, setmovie_title] = useState(query);
  const [selectedmovie, setSelectedmovie] = useState();
  const [likedmovie, setLikedmovie] = useState([]);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${movie_title}`
          );

          if (!res.ok) throw new Error("Something Went Wrong");
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          // console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
    },
    [movie_title]
  );

  function handleOpenBox() {
    setOpen((state) => !state);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setmovie_title(query);
  }

  function movieSelection(id) {
    setSelectedmovie(movies.find((movie) => movie.imdbID === id));
    console.log(selectedmovie);
  }
  return (
    <div className="App">
      <Navbar handleSubmit={handleSubmit} query={query} setQuery={setQuery} />
      <Main>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <>
            <Box
              movies={movies}
              open={open}
              handleOpenBox={handleOpenBox}
              movieSelection={movieSelection}
              likedmovie={likedmovie}
              setLikedmovie={setLikedmovie}
            />
            <View selectedmovie={selectedmovie} />
          </>
        )}
        {error && <ErrorMessage message={error} />}
      </Main>
    </div>
  );
}

export default App;

function Navbar({ handleSubmit, query, setQuery }) {
  return (
    <nav>
      <ul>
        <li style={{ flexGrow: "8.5" }}>
          Movie Mood <span className="emoji">📽️</span>
        </li>
        <li style={{ flexGrow: "0.5" }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for movie"
              value={query || ""}
              onChange={(e) => setQuery(e.target.value)}
            />
            <input type="submit" />
          </form>
        </li>
        <li style={{ flexGrow: "0.5" }}>
          Watch List<span className="emoji">🕶️</span>
        </li>
      </ul>
    </nav>
  );
}

function Main({ children }) {
  return (
    <>
      <div className="Main">{children}</div>
    </>
  );
}

function Box({
  movies,
  open,
  handleOpenBox,
  movieSelection,
  likedmovie,
  setLikedmovie,
}) {
  return (
    <>
      <div className="Box">
        <span className="close" onClick={handleOpenBox}>
          {open ? "-" : "+"}
        </span>

        {open && (
          <div>
            {movies.map((movie) => {
              return (
                <div
                  className="movie"
                  key={movie.imdbID}
                  onClick={() => movieSelection(`${movie.imdbID}`)}
                >
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title} poster`}
                    className="Movie"
                  />
                  <span>{movie.Title}</span>
                  <Like
                    like={likedmovie.includes(movie.imdbID)}
                    setLikedmovie={setLikedmovie}
                    id={movie.imdbID}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function View({ selectedmovie }) {
  return (
    <>
      <div className="View">
        {selectedmovie ? (
          <div>
            <h2>{selectedmovie.Title}</h2>
            <div className="details">
              <img
                src={selectedmovie.Poster}
                alt={`${selectedmovie.Title} poster`}
                style={{ height: "400px", width: "250px" }}
              />
              <div className="info">
                <p>
                  {" "}
                  <span>
                    🍿 {selectedmovie.Type} : {selectedmovie.Title}
                  </span>
                </p>
                <p>
                  <span>📆</span> Released : {selectedmovie.Year}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>Select a Movie</div>
        )}
      </div>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading ... </p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

function Like({ like, setLikedmovie, id }) {
  return (
    <span onClick={() => setLikedmovie((list) => [...list, id])}>
      {" "}
      {like ? (
        <svg
          viewBox="0 0 24 24"
          width="25"
          height="25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
           2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
           C13.09 3.81 14.76 3 16.5 3
           19.58 3 22 5.42 22 8.5
           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="red"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="25"
          height="25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
           2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
           C13.09 3.81 14.76 3 16.5 3
           19.58 3 22 5.42 22 8.5
           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="white"
          />
        </svg>
      )}
    </span>
  );
}
