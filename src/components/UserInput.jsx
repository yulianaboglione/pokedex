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
        src="https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png"
        alt=""
      />
      <p className="p-initio">Give me your name to start</p>
      <input
        className="input-user"
        type="text"
        value={inputValue}
        placeholder="   Insert name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn-initial" onClick={dispatchUserName}>
        <i className="fa-solid fa-paper-plane fa-3x"></i>
      </button>
    </div>
  );
};

export default UserInput;
