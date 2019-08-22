//DOM Manipulation
document.addEventListener("DOMContentLoaded", function() {
  if (window.innerWidth > 768) {
    updatePortrait();
  }
});

function updatePortrait() {
  const navigation = document.getElementById("mainNav");
  const portrait = document.getElementById("portrait");

  navigation.addEventListener("click", function(event) {
    const NEW_SRC_ATTRIBUTE = "data-img";

    const imgNumber = [...event.target.attributes].find(
      attribute => attribute.name === NEW_SRC_ATTRIBUTE
    ).value;
    const newSrc = `build/images/b_image${imgNumber}.png`;

    if (newSrc) {
      portrait.setAttribute("src", newSrc);
    }
  });
}

//React Injection
{
  // Script-wide constants
  const PLACEHOLDER = "Loading...";

  const projects = [
    {
      id: 100,
      title: "Kurt Cobain's Tribute Page",
      url: "https://codepen.io/collection/XPjeBj/",
      imageUrl: "build/images/screenshot.png",
      imageAlt:
        "Screenshot of my freeCodeCamp project focused on Responsive Web Design",
      tags: ["RWD", "Variable Fonts", "CSS Grid"],
      description:
        "A pure CSS experiment on CSS Grid and variable fonts. Submitted for freeCodeCamp certifications with focus on Responsive Web Design."
    },
    {
      id: 101,
      title: "sparinspiration.com",
      url: "http://sparinspiration.com",
      imageUrl: "build/images/screenshot2.png",
      imageAlt: "Screenshot of sparinspiration.com",
      tags: ["Bootstrap 4", "Flexbox", "CSS Grid"],
      description: "A Swedish website with 5 daily money-saving tips."
    }
  ];

  // Components
  function ProjectSection(props) {
    const projectsList = props.projects.map(item => (
      <ProjectCard key={item.id} value={item} />
    ));

    return (
      <section id="projects">
        {projectsList.length ? projectsList : PLACEHOLDER}
      </section>
    );
  }

  function ProjectCard(props) {
    const project = props.value;

    const projectHeader = {
      title: project.title,
      url: project.url
    };
    const projectImage = {
      alt: project.imageAlt,
      imageUrl: project.imageUrl,
      projectUrl: project.url,
      tags: project.tags
    };

    return (
      <div className="card">
        <ProjectHeader value={projectHeader} />
        <ProjectImage value={projectImage} />
        <p>{project.description ? project.description : PLACEHOLDER}</p>
      </div>
    );
  }

  function ProjectHeader(props) {
    const project = props.value;

    return (
      <h2>
        <a href={project.url}>{project.title}</a>
      </h2>
    );
  }

  function ProjectImage(props) {
    const projectImage = props.value;

    return (
      <figure className="screenshot">
        <ImageClickable value={projectImage} />
        <Caption tags={projectImage.tags} />
      </figure>
    );
  }

  function ImageClickable(props) {
    const image = props.value;

    return (
      <a href={image.projectUrl}>
        <img src={image.imageUrl} alt={image.imageALt} />
      </a>
    );
  }

  function Caption(props) {
    return (
      <figcaption>
        <TagList value={props.tags} />
      </figcaption>
    );
  }

  function TagList(props) {
    const tags = props.value.map(tag => <li key={Date.now()}>{tag}</li>);

    return <ul className="tags">{tags}</ul>;
  }

  // Rendering
  const projectSectionContainer = document.querySelector(
    "#js-container-projects"
  );
  ReactDOM.render(
    <ProjectSection projects={projects} />,
    projectSectionContainer
  );
}
