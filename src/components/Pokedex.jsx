import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import ReactPaginate from "react-paginate";

const Pokedex = () => {
  const name = useSelector((state) => state.userName);
  const [pokemonList, setPokemonList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`)
      .then((res) => setPokemonList(res.data.results));

    axios
      .get(`https://pokeapi.co/api/v2/type/?offset=0&limit=1154`)
      .then((res) => setTypeList(res.data.results));
  }, []);

  const searchName = () => {
    navigate(`/pokedex/${inputValue}`);
  };

  const searchType = (typeUrl) => {
    axios
      .get(typeUrl)
      .then((res) =>
        setPokemonList(res.data.pokemon.map((pokemon) => pokemon.pokemon))
      );
  };
  const [isSearchForType, setIsSearchForType] = useState(false);
  const toggleSearch = () => {
    if (isSearchForType) {
      setIsSearchForType(false);
    } else {
      setIsSearchForType(true);
    }
  };

  /*--------------PAGINACION-------------------*/

  const [page, setPage] = useState(1);
  const pokemonPage = 9;
  const lastPokemonIndex = page * pokemonPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPage;
  const pokemonPaginated = pokemonList.slice(
    firstPokemonIndex,
    lastPokemonIndex
  );

  const totalPages = Math.ceil(pokemonList.length / pokemonPage);
  const pagesNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesNumbers.push(i);
  }

  const handlePageClick = (data) => {
    console.log(data.selected + 1);
    const currentPage = data.selected + 1;
    setPage(currentPage);
  };
  const leave = () => {
    navigate("/");
    dispatch(setUserName(""));
  };
  return (
    <div>
      <div className="arroww">
        <i
          onClick={leave}
          className="arrow fa-solid fa-arrow-right-from-bracket fa-2x"
        ></i>
      </div>

      <div className="title">
        <h1 className="title-poke">Pokedex</h1>
        <p>Welcome {name}, here you can find your favorite pokemon!</p>
      </div>

      {/*-------------- SEARCH --------------*/}

      <div className="container-search">
        <input
          className={isSearchForType ? "search-nam toggle" : "search-name"}
          type="text"
          placeholder="   Insert name pokemon"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={isSearchForType ? "search-nam toggle" : "search-name"}
          onClick={searchName}
        >
          <i className="fa-solid fa-magnifying-glass fa-2x"></i>
        </button>

        <select
          onChange={(e) => searchType(e.target.value)}
          className={isSearchForType ? "search-type" : "search-type toggle"}
        >
          <option value="">Selecciona una opcion</option>

          {typeList.map((type) => (
            <option value={type.url} key={type.url}>
              {type.name}
            </option>
          ))}
        </select>

        <div onClick={toggleSearch} className="searchFor">
          {isSearchForType ? "Search for name" : "Search for type"}
        </div>
      </div>

      <div className="pokemon-container">
        {pokemonPaginated.map((pokemon) => (
          <PokemonCard url={pokemon.url} key={pokemon.url} />
        ))}
      </div>

      <ReactPaginate
        className="ReactPaginate"
        pageCount={totalPages}
        marginPagesDisplayed={5}
        previousLabel={
          <button
            className="btn-page"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <i className="fa-solid fa-circle-chevron-left fa-3x"></i>
          </button>
        }
        nextLabel={
          <button
            className="btn-page"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <i className="fa-solid fa-circle-chevron-right fa-3x"></i>
          </button>
        }
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default Pokedex;
