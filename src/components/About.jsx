import {
  SiJavascript,
  SiSass,
  SiCss,
  SiHtml5,
  SiReact,
  SiGit,
  SiNodedotjs,
  SiTelegram,
  SiFirebase,
  SiMongodb,
  SiNetlify,
  SiGoogle,
  SiGooglecloud,
} from "react-icons/si";
import "./About.scss";
import portrait from "../assets/photo_2026.jpg";

const skills = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "Sass", icon: SiSass },
  { name: "CSS", icon: SiCss },
  { name: "HTML", icon: SiHtml5 },
  { name: "React", icon: SiReact },
  { name: "Git", icon: SiGit },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "grammY", icon: SiTelegram },
  { name: "Firebase", icon: SiFirebase },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Netlify", icon: SiNetlify },
  { name: "Google Cloud", icon: SiGooglecloud },
];

function About() {
  return (
    <section id="about">
      <div className="section-label">// About</div>
      <h2>Who I Am</h2>

      <div className="about">
        <div className="about__card">
          <img
            src={portrait}
            alt="Anastasia Ermakova"
            className="about__image"
          />
        </div>

        <div className="about__text">
          <p>
            I'm a passionate web developer with a focus on clean interfaces and
            reliable code with a huge passion for JavaScript, React, and
            everything related to web development. I believe that continuous
            learning is the key to success.
          </p>
          <p>
            Delivery-focused professional with, requirement-heavy workflows in
            fast-paced media and technology environments, and hands-on
            experience translating regulatory and editorial standards into clear
            operational processes.
          </p>
        </div>
      </div>

      <div className="skills">
        {skills.map(({ name, icon: Icon }) => (
          <div className="skills__item" key={name}>
            <Icon className="skills__icon" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
