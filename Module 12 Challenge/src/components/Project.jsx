function Project({ title, liveLink, githubLink }) {
    return (
      <div className="project">
        {/* Logo de GitHub en lugar de imagen */}
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
               alt="GitHub Logo" 
               className="github-logo" />
        </a>
  
        <h3>{title}</h3>
        
        <a href={liveLink} target="_blank" rel="noopener noreferrer">Ver Proyecto</a>
        <a href={githubLink} target="_blank" rel="noopener noreferrer">Ver Código</a>
      </div>
    );
  }
  
  export default Project;
    