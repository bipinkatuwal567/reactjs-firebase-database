import { get, getDatabase, ref, set } from "firebase/database";
import React, { useState, useEffect } from "react";
import app from "../firebase-config";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

const UpdateWrite = () => {
    const navigate = useNavigate();
  const { firebaseId } = useParams();

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "nature/fruits/" + firebaseId);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const targetObject = snapshot.val();
        setInputValue1(targetObject.fruitName);
        setInputValue2(targetObject.fruitDefinition);
      } else {
        console.log("Something went wrong");
      }
    };
    fetchData();
  }, [firebaseId]);

  const handleSubmit = async () => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "nature/fruits/" + firebaseId);
    set(newDocRef, {
      fruitName: inputValue1,
      fruitDefinition: inputValue2,
    })
      .then(() => {
        navigate("/update")
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
        <h2>Update Data</h2>
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

        <button onClick={() => handleSubmit()}>Update Data</button>
      </div>
    </>
  );
};

export default UpdateWrite;
