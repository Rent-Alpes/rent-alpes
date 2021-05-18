import { BiCalendar } from "react-icons/bi";

const CardPriceButton = (props) => {
  return (
    <button className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center">
      <BiCalendar className="mr-2" />
      {props.price}€<span className="ml-1 text-sm"> /nuit</span>
    </button>
  );
};

export default CardPriceButton;
