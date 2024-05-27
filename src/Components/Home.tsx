import { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../css/index.css";
import "../css/App.css";
import logo from "../image/logo.png";
import Random from "./Random";
import SearchReceipes from "./SearchReceipes";

function Home() {
  const [input, setInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleInputChange = (e: any): void => {
    setInput(e.target.value);
    setIsSearch(false);
  };
  console.log(input);

  const handleSearch = () => {
    setIsSearch(true);  
  };

  return (
    <>
      {/* Navbar component */}
      <nav className="navbar navbar-expand-lg p-1 navbar-dark bg-success">
        <div className="container-fluid">
          <img src={logo} width="90" height="80" alt="logo not found" />
          <h1 className="navbar-brand fs-3 ms-3">FINDFORYUMMY</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-right"
            id="navbarScroll"
          >
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Service
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search input and input button */}
      <div className="d-flex flex-lg-row justify-content-center align-items-center flex-column p-5 gap">
        <input
          type="search"
          placeholder="Search the recipe"
          className="search-bar w-75 p-2 border border-black border-1 rounded"
          value={input}
          onChange={handleInputChange}
        />
        <button className="btn btn-success fs-5" onClick={handleSearch}>
          Search
        </button>
      </div>

      {!isSearch ? <Random /> : <SearchReceipes input={input} />}
    </>
  );
}

export default Home;
