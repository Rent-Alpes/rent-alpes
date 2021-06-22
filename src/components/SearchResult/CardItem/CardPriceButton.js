import { useHistory } from "react-router-dom";

const CardPriceButton = (props) => {
  const history = useHistory();
  const handleClick = () => history.push("/view-property/" + props.idproperty);
  return (
    <button
      onClick={handleClick}
      className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
      <span className="ml-1 text-sm">Select your dates</span>
    </button>
  );
};

export default CardPriceButton;
