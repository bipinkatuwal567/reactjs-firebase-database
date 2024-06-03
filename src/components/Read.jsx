import React, { useState } from "react";
import app from "../firebase-config";
import { get, getDatabase, ref } from "firebase/database";

const Read = () => {
  let [dataList, setDataList] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "nature/fruits");
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      setDataList(Object.values(snapshot.val()));
    } else {
      console.log("Something went wrong");
    }
  };
  console.log("data: ", dataList);
  return (
    <div>
      <button onClick={fetchData}>Show data</button>
      <ul>
        {dataList.map((data, index) => {
          return (
            <li key={index}>
              {data.fruitName} : {data.fruitDefinition}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Read;
