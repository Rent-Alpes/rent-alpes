import { BiBath, BiBed, BiUser } from "react-icons/bi";

const CardPropertyIcons = (props) => {
  return (
    <div className="flex">
      <div className="flex items-center pr-2">
        <span className="text-gray-600 uppercase text-sm font-semibold tracking-wider">
          <BiBath />
        </span>
        <span className="text-gray-400 pl-1 text-sm">{props.bathroom}</span>
      </div>
      <div className="flex items-center pr-2">
        <span className="text-gray-600 uppercase text-sm font-semibold tracking-wider">
          <BiBed />
        </span>
        <span className="text-gray-400 pl-1 text-sm">{props.room}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 uppercase text-sm font-semibold tracking-wider">
          <BiUser />
        </span>
        <span className="text-gray-400 pl-1 text-sm">{props.traveler}</span>
      </div>
    </div>
  );
};

export default CardPropertyIcons;
