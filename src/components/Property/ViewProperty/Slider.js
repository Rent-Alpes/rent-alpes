import SimpleImageSlider from "react-simple-image-slider";

const Slider = ({ images }) => {
  return (
    <div className="inline-block">
      <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        useGPURender={true}
        showNavs={true}
        showBullets={true}
        navStyle={1}
        navSize={50}
        navMargin={30}
        duration={0.5}
        bgColor="#000"
      />
    </div>
  );
};

export default Slider;
