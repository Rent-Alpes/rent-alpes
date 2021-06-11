const CardImage = (props) => {
  return (
    <img
      src={props.image}
      alt={props.image}
      className="w-full object-cover object-center rounded-lg shadow-md"
    />
  );
};

export default CardImage;
