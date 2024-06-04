import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import app from "../firebase-config";
import Navbar from "./Navbar";

const Write = () => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleSubmit = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "nature/fruits"));
    set(newDocRef, {
      fruitName: inputValue1,
      fruitDefinition: inputValue2,
    })
      .then(() => {
        console.log("Data saved successfully");
      })
      .catch(() => {
        console.log("Unable to save data to db");
      });
  };

  return (
    <>
      <Navbar />
      <div className="write container">
        <input
          type="text"
          value={inputValue1}
          onChange={(e) => {
            setInputValue1(e.target.value);
          }}
        />
        <input
          type="text"
          value={inputValue2}
          onChange={(e) => {
            setInputValue2(e.target.value);
          }}
        />

        <button onClick={() => handleSubmit()}>Save Data</button>
      </div>
    </>
  );
};

export default Write;
