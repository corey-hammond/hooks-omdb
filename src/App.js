import React, { useReducer, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: res.Search
        })
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(res => res.json())
      .then(res => {
        if (res.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: res.Search
          })
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: res.Error
          })
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="OMDB Search App" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, idx) => <Movie key={idx} movie={movie} />)
        )}
      </div>
    </div>
  );
}

export default App;
