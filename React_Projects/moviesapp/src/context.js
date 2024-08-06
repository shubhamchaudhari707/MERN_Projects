import { createContext, useContext, useEffect, useState } from "react";

export const API_URL = "https://omdbapi.com/?apikey=727bbdc1";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({show:"false", msg:""});
  const [query, setQuery] = useState("titanic");

  const getMovies = async (url) => {
    setLoading(true)
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setLoading(false);
        setMovie(data.Search);
        setIsError({
            show:false,
            msg:""
        })
      } else {
        setIsError({
            show:true,
            msg:data.Error
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 500);

    return () => clearTimeout(timerOut);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, movie, isError, query, setQuery, setIsError, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
