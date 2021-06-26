import { BiCheckShield } from "react-icons/bi";

const Footer = () => (
  <div className="footer flex justify-end">
    <div className="mr-10">
      <p>
        <strong>Rent'Alpes © All rights reserved 2021</strong>
      </p>
    </div>
    <div className="mr-5">
      <p>
        <a href="/privacy">
          <div className="flex items-center">
            <BiCheckShield />
            <strong className="ml-1">Privacy</strong>
          </div>
        </a>
      </p>
    </div>
  </div>
);

export default Footer;
