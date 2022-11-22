import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState({});
  const [imgLoaded, setImgLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));
  }, []);

  return (
    <li className="pokemon-item">
      <div
        className="pokemon-card"
        onClick={() => navigate(`/pokedex/${pokemon.id}`)}
      >
        <h3>{pokemon.name}</h3>
        {!imgLoaded && <div>Image loading...</div>}
        <img
          src={pokemon.sprites?.other.dream_world.front_default}
          style={{ display: imgLoaded ? "inline-block" : "none" }}
          alt=""
          onLoad={() => setImgLoaded(true)}
        />
        <span>
          <b>Types: </b>
          {pokemon.types?.[0]?.type.name} {pokemon.types?.[1]?.type.name}
        </span>{" "}
        <br />
        <span>
          <b>HP: </b>
          {pokemon.stats?.[0].base_stat}
        </span>
        <br />
        <span>
          <b>Attack: </b>
          {pokemon.stats?.[1].base_stat}
        </span>
        <br />
        <span>
          <b>Defense: </b>
          {pokemon.stats?.[2].base_stat}
        </span>
        <br />
        <span>
          <b>Speed: </b>
          {pokemon.stats?.[5].base_stat}
        </span>
      </div>
    </li>
  );
};

export default PokemonCard;
