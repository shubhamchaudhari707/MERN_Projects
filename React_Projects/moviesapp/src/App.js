import React from "react";
import Home from "./Home";
import {Routes, Route} from "react-router-dom"
import SingleMovie from "./SingleMovie";
import PageNotFound from "./PageNotFound";
import './App.css'

const App = () => {
  return <>

  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/movie/:id" element={<SingleMovie/>} />
    <Route path="*" element={<PageNotFound/>} />
  </Routes>

 
  </>;
};

export default App;
