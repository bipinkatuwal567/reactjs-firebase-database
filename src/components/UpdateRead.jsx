import { get, getDatabase, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../firebase-config";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const UpdateRead = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    handleClick();
  }, [dataList]) 

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

  const handleDelete = async (id) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "/nature/fruits/" + id);
    const isDeleted = remove(dbRef);

    if(isDeleted){
      alert("Item deleted")
    }else{
      alert("Couldn't delete item")
    }
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Update Data</h2>
        <button onClick={handleClick}>Show data</button>
        <ul>
          {dataList.length !== 0
            ? dataList.map((data) => {
                return (
                  <div className="update-list" key={data.fruitId}>
                    <li>
                      {data.fruitId} : {data.fruitName} : {data.fruitDefinition}
                    </li>
                    <button onClick={() => navigate(`/update/${data.fruitId}`)}>Update</button>
                    <button onClick={() => handleDelete(data.fruitId)}>Delete</button>
                  </div>
                );
              })
            : null}
        </ul>
      </div>
    </>
  );
};

export default UpdateRead;
