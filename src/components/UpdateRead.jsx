import { get, getDatabase, ref } from "firebase/database";
import React, { useState } from "react";
import app from "../firebase-config";
import Navbar from "./Navbar";

const UpdateRead = () => {
  const [dataList, setDataList] = useState([]);

  const handleClick = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const myData = snapshot.val();
      const tempArray = Object.keys(myData).map((data) => {
        return {
          ...myData[data],
          fruitId: data,
        };
      });
      setDataList(tempArray);
    } else {
      console.log("Something went wrong");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <button onClick={handleClick}>Show data</button>
        <ul>
          {dataList.length !== 0
            ? dataList.map((data) => {
                return (
                  <li key={data.fruitId}>
                    {data.fruitId} : {data.fruitName} : {data.fruitDefinition}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </>
  );
};

export default UpdateRead;
