//DOM Manipulation
document.addEventListener("DOMContentLoaded", function() {
  if (window.innerWidth > 768) {
    updatePortrait();
  }
});

function updatePortrait() {
  const header = document.getElementById("header");
  const portrait = document.getElementById("portrait");

  header.addEventListener("click", function(event) {
    const NEW_SRC_ATTRIBUTE = "data-img";

    const dataImgAttr = [...event.target.attributes].find(
      attribute => attribute.name === NEW_SRC_ATTRIBUTE
    ); //undefined if no data-img attribute present
    const imgNumber = dataImgAttr && dataImgAttr.value || '';
    
    if (imgNumber) {
      const newSrc = `build/images/b_image${imgNumber}.png`;
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
      id: "100",
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
      id: "101",
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
    const projectsList = props.projects.map(project => (
      <ProjectCard key={project.id} value={project} />
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
      url: project.url,
    };
    const projectImage = {
      imageAlt: project.imageAlt,
      imageUrl: project.imageUrl,
      projectUrl: project.url,
      tags: project.tags,
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
      <h3>
        <a href={project.url}>{project.title}</a>
      </h3>
    );
  }

  function ProjectImage(props) {
    const {tags: projectTags, ...projectImage} = props.value;

    return (
      <figure className="screenshot">
        <ImageClickable value={projectImage} />
        <Caption tags={projectTags} />
      </figure>
    );
  }

  function ImageClickable(props) {
    const image = props.value;

    return (
      <a href={image.projectUrl}>
        <img src={image.imageUrl} alt={image.imageAlt} />
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
    const tags = props.value.map(tag => <li key={createKeyFromString(tag)}>{tag}</li>);

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

  // Helper functions
  function createKeyFromString(key){
    const result = key && removeWhitespace(key).toLowerCase();
    return result ? result : Date.now().toString();
  }

  function removeWhitespace(phrase){
    const result = phrase && phrase.toString() //typechecking
                          .split(' ') //'word1 word2' => ["word1", "word2"]
                          .join('') //["word1", "word2"] => 'word1word2'
    return result;
  }
}
