import React, { useState, useEffect, useCallback, useContext } from "react";
import { SessionContext } from "../../store/SessionStore";
import MoviesList from "./MoviesList";
import AddMovie from "./AddMovie";
import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    session: { idToken },
  } = useContext(SessionContext);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://restapi-51ed5-default-rtdb.firebaseio.com/movies.json?auth=${idToken}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      console.log("response fetch", response);

      const transformedMovies = (() => {
        const movies = [];
        for (let [key, value] of Object.entries(data)) {
          movies.push({ ...value, id: key });
        }
        return movies;
      })();

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    console.log(movie);
    try {
      const res = await fetch(
        `https://restapi-51ed5-default-rtdb.firebaseio.com/movies.json?auth=${idToken}`,
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log("response", data);
    } catch (e) {
      console.log(e);
    }
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section className={classes.starting}>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
};

export default StartingPageContent;
