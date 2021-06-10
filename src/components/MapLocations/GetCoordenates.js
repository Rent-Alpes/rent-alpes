import React, { useState, useEffect } from "react";
import axios from "axios";

export default async function GetCoordinates(props) {
  const result = await axios(
    `https://geocode.search.hereapi.com/v1/geocode?q=${props.address}&apiKey=_GKYLFbxbV0Q2h-O9tbczggMW4vW5J3lwkSwtx5GjqE`
  );
  console.log(result.data.items[0].position.lat);
  return <p>hello</p>;
}
