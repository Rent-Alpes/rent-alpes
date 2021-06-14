import { BiCalendar } from "react-icons/bi";

const CardPriceButton = (props) => {
  return (
    <button className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center">
      {props.days !== undefined ? (
        <div className="flex items-center">
          <BiCalendar className="mr-2" />
          {props.price * props.days}
          <span className="ml-1 text-sm"> €</span>
        </div>
      ) : (
        <span className="ml-1 text-sm">Select your dates</span>
      )}
    </button>
  );
};

export default CardPriceButton;
