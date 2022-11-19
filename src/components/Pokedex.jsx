import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";

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

  const [page, setPage] = useState(1);
  const pokemonPage = 5;
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

  const [isSearchForType, setIsSearchForType] = useState(false);
  const toggleSearch = () => {
    if (isSearchForType) {
      setIsSearchForType(false);
    } else {
      setIsSearchForType(true);
    }
  };

  return (
    <>
      <h1>Pokedex</h1>
      <p>Welcome {name}, here you can find your favorite pokemon</p>

      {/* SEARCH */}
      <div className="container-search">
        <input
          className={isSearchForType ? "search-nam toggle" : "search-name"}
          type="text"
          placeholder="buscar por nombre"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={searchName}>Search</button>

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
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev page
      </button>

      {pagesNumbers.map((number) => (
        <button onClick={() => setPage(number)}>{number}</button>
      ))}

      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Next page
      </button>
    </>
  );
};

export default Pokedex;
