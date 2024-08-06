import React from "react";
import { useGlobalContext } from "./context";

const Search = () => {
  const { query, setQuery, isError } = useGlobalContext();
  // console.log(isError)
  return (
    <>
      <section className="search-section">
          <h2>Search Your Favoutite Movie</h2>

          <form onSubmit={(e)=>e.preventDefault()}>
            <div>
              <input type="text" placeholder='search here' value={query} onChange={(e)=>setQuery(e.target.value)} />
            </div>
          </form>

          <div className='card-error'>
            <p>{isError.msg}</p>
          </div>
          
      </section>
    </>
  );
};

export default Search;
