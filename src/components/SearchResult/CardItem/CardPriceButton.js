import { BiCalendar } from "react-icons/bi";

const CardPriceButton = ({ days, price }) => {
  return (
    <button className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center">
      {days !== undefined ? (
        <div className="flex items-center">
          <BiCalendar className="mr-2" />
          {price * days}
          <span className="ml-1 text-sm"> €</span>
        </div>
      ) : (
        <span className="ml-1 text-sm">Select your dates</span>
      )}
    </button>
  );
};

export default CardPriceButton;
