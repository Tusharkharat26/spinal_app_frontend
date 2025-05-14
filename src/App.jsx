import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Papers from "./components/Papers";
import Contact from "./components/Contact";
//import 'dwv/dist/dwv.css';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Papers />
      <Contact />
    </div>
  );
}

export default App;
