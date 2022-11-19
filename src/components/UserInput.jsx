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
    <div>
      <h1>User Input</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={dispatchUserName}>Send</button>
    </div>
  );
};

export default UserInput;
