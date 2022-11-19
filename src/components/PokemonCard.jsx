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
        {!imgLoaded && <div>Image loading</div>}
        <img
          src={pokemon.sprites?.other.dream_world.front_default}
          style={{ display: imgLoaded ? "inline-block" : "none" }}
          alt=""
          onLoad={() => setImgLoaded(true)}
        />
      </div>
    </li>
  );
};

export default PokemonCard;
