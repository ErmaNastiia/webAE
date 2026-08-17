import { FiArrowUpRight } from "react-icons/fi";
import "./Projects.scss";
import project1 from "../assets/purpur.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";

const projects = [
  {
    img: project1,
    title: "Purpur Care",
    description:
      "React app for managing cats and plants routine. With authentication and authorization. Cross-platform working. With nottification and recurent tasks.",
    tags: ["React", "Node.js"],
    link: "https://purrcare.netlify.app/",
    github: "https://github.com/ErmaNastiia/anfisa-thecat",
  },
  {
    img: project2,
    title: "CrafryStock",
    description:
      "React application for managing stock of threads and beads. With authentication and authorization. Cross-platform working. With storage and database.",
    tags: ["React", "React Router", "Firebase"],
    link: "https://threadsbeads.netlify.app/",
    github: "https://github.com/ErmaNastiia/CraftyStock",
  },
  {
    img: project3,
    title: "GreenInside",
    description:
      "Busnies website for interior plants. With bot for Telegram, which helps you book a consultation with a specialist. built with JavaScript anf grammY.js.",
    tags: ["JavaScript", "Git", "grammY"],
    link: "https://green-inside.ru/",
    github: "https://github.com/ErmaNastiia/greenpage",
  },
];

function BrowserPreview({ img }) {
  return (
    <div className="project-row__preview">
      <div className="project-row__browser-bar">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="project-row__browser-body">
        {img && <img src={img} alt="" className="project-row__browser-view" />}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects">
      <div className="section-label">// Selected Work</div>
      <h2>My projects</h2>

      <div className="projects">
        {projects.map((project, i) => (
          <div
            className={`project-row ${i % 2 === 1 ? "project-row--reverse" : ""}`}
            key={project.title}
          >
            <BrowserPreview img={project.img} />

            <div className="project-row__text">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-row__tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Live App <FiArrowUpRight />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Learn more <FiArrowUpRight />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
