import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
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
      <h2 class="text-center p-5">Hello trainer!</h2>
      <img
        src="https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20221113131941/Ash_%28Viajes_Pok%C3%A9mon%29_2.png"
        className="img img-fluid shadow-4"
      />
      <p class="text-center">Give me your name to start</p>
      <div className="container col-7">
        <InputGroup className=" text-center">
          <Form.Control
            className="col-10"
            placeholder="Insert name"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={dispatchUserName}
          >
            <i className="fa-solid fa-paper-plane fa-3x"></i>
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default UserInput;
