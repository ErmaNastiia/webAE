import { FiMail } from "react-icons/fi";
import "./Footer.scss";

function Footer() {
  return (
    <>
      <section id="contact">
        <div className="contact">
          <h2>Let's Work Together</h2>
          <p>Open to full-time, contract, and freelance opportunities.</p>
          <a
            href="mailto:anastasiiaermakova91@gmail.com"
            className="btn btn-primary"
          >
            anastasiiaermakova91@gmail.com <FiMail />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        © 2026 Anastasia Ermakova — Built with React
      </footer>
    </>
  );
}

export default Footer;
