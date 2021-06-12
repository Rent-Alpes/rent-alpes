import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  // takes in images as props
  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0

  const slideRight = () => {
    setIndex((index + 1) % images.length); // increases index by 1
    console.log(index);
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
      console.log(index);
    } else {
      setIndex(nextIndex);
      console.log(index);
    }
  };

  return (
    images.length > 0 && (
      <div className="w-8/12 h-4/5 rounded inline-block">
        <button onClick={slideLeft}>{"<"}</button>
        <img className="rounded-lg" src={images[index].url} alt={index} />
        <button onClick={slideRight}>{">"}</button>
      </div>
    )
  );
};

export default ImageSlider;
