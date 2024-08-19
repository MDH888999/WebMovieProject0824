import { useEffect, useState } from "react";
import Banner from "./components/Banner"
import Header from "./components/Header"
import MovieList from "./components/MovieList"
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieProvider";


function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (searchVal) => {
    setMovieSearch([])
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();
      setMovieSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fechMovie = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1';
      const [resp1, resp2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ])
      const data1 = await resp1.json();
      const data2 = await resp2.json();

      setMovie(data1.results);
      setMovieRate(data2.results);
    };
    fechMovie();
  }, [])
  return (
    <>
      <MovieProvider>
        <div className="bg-black pb-10">
          <Header onSearch={handleSearch} />
          <Banner />
          {
            movieSearch.length > 0 ? <MovieSearch title={"Kết quả tìm kiếm"} data={movieSearch} /> : (
              <>
                <MovieList title={"Phim hot"} data={movie} />
                <MovieList title={"Phim đề cử"} data={movieRate} />
              </>
            )
          }
        </div>
      </MovieProvider>
    </>

  )
}

export default App
