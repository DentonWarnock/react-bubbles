import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [loading, setLoading] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    setLoading(true);
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        console.log("BubblePage.js, GET res: ", res);
        setColorList(res.data);
        console.log("colorList", colorList);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) {
    return <div>Colors Loading...</div>;
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
