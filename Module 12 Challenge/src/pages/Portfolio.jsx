import Project from "../components/Project";

function Portfolio() {
  const projects = [
    {
      title: "Proyecto 1",
      liveLink: "https://proyecto1.com",
      githubLink: "https://github.com/usuario/proyecto1",
    },
    {
      title: "Proyecto 2",
      liveLink: "https://proyecto2.com",
      githubLink: "https://github.com/usuario/proyecto2",
    },
  ];

  return (
    <section>
      <h2>Mi Portafolio</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
