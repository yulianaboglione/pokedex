import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/userName.slice";

const UserInput = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const dispatchUserName = () => {
    dispatch(changeName(inputValue));
    navigate("/pokedex");
  };

  return (
    <div className="initio">
      <h2 className="title-initio">Hello trainer!</h2>{" "}
      <img
        className="img-1"
        src="https://images.wikidexcdn.net/mwuploads/wikidex/7/72/latest/20091129174930/Rojo_RFVH_%28Ilustraci%C3%B3n%29.png"
        alt=""
      />
      <p>Give me your name to start</p>
      <input
        className="input-user"
        type="text"
        value={inputValue}
        placeholder="   Insert name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn-initial" onClick={dispatchUserName}>
        <i className="fa-solid fa-paper-plane fa-2x"></i>
      </button>
    </div>
  );
};

export default UserInput;
