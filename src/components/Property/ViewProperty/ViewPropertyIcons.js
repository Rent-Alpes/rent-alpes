import { BiBath, BiBed, BiUser } from "react-icons/bi";

const ViewPropertyIcons = (props) => {
  return (
    <div className="flex pb-2 justify-around pt-2">
      <div className="flex items-center pr-2">
        <span className="text-gray-600 text-2xl uppercase font-semibold tracking-wider">
          <BiBath />
        </span>
        <span className="text-white font-bold text-2xl pl-1">
          {props.bathroom}
        </span>
      </div>
      <div className="flex items-center text-2xl pr-2">
        <span className="text-gray-600 uppercase font-semibold tracking-wider">
          <BiBed />
        </span>
        <span className="text-white font-bold text-2xl pl-1">{props.room}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 text-2xl uppercase font-semibold tracking-wider">
          <BiUser />
        </span>
        <span className="text-white font-bold text-2xl pl-1">
          {props.traveler}
        </span>
      </div>
    </div>
  );
};

export default ViewPropertyIcons;
