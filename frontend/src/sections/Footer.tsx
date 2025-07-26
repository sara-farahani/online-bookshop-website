import { Link } from "react-router-dom";
import { socialIcons } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <Link to="/" className="logo">
            کتابینو
          </Link>
        </div>
        <div className="socials">
          {socialIcons.map((icon, index) => (
            <div key={index} className="icon">
              <a
                key={index}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <img src={icon.imgPath} alt={icon.name || "social icon"} />
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p>درباره ما</p>
          <p>تماس با ما</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
