import { BiCheckShield } from "react-icons/bi";

const Footer = () => (
  <div className="footer flex justify-center items-center">
    <div className="ml-32 flex-grow">
      <p>
        <strong>Rent'Alpes © All rights reserved 2021</strong>
      </p>
    </div>
    <div
      className="mr-5 items-center  flex justify-center "
      style={{ backgroundColor: "#ff9f00", width: "6em", height: "3.8em" }}
    >
      <div>
        <a href="/privacy">
          <div className="flex items-center">
            <BiCheckShield />
            <strong className="ml-1">Privacy</strong>
          </div>
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
