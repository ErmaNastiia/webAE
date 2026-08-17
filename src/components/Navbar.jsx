import "./Navbar.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#hero" className="navbar__brand">
        Anastasia<span>.</span>Ermakova
      </a>
      <ul className="navbar__links">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
