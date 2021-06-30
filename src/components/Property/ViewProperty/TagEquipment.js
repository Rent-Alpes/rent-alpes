import { BiPlay } from "react-icons/bi";

const Tag = ({ equipment }) => {
  return (
    <div
      key={equipment}
      className="flex gold-b-color px-2 py-1 text-white items-center font-bold rounded mr-2 text-6 text-xs"
    >
      <BiPlay />
      <p>{equipment}</p>
    </div>
  );
};

export default Tag;
