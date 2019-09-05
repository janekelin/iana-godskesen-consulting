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
    const {projects} = props;

    const projectsList = projects.map(project => (
      <ProjectCard key={project.id} value={project} />
    ));
    const uniqueTags = new Set(projects.flatMap(project => project.tags)); 
    const tagList = Array.from(uniqueTags); //type conversion before passing to the component

    return (
      <section id="projects">
        <h2>My projects and collaborations</h2>
        <TagList value={tagList} />
        {projectsList.length ? projectsList : PLACEHOLDER}
      </section>
    );
  }

  function ProjectCard(props) {
    const project = props.value;

    return (
      <a className="card" style={{"background": `url(${project.imageUrl})`}} >
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description ? project.description : PLACEHOLDER}</p>
      </a>
    );
  }

  function TagList(props) {
    const tags = props.value.map(tag => <li key={createKey(tag)}>{tag}</li>);

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
  function createKey(seed){
    const key = seed && removeWhitespace(seed).toLowerCase();
    return key || Date.now().toString();
  }

  function removeWhitespace(str){
    const result = str && str.toString() //typechecking
                          .split(' ') //'word1 word2' => ["word1", "word2"]
                          .join('') //["word1", "word2"] => 'word1word2'
    return result;
  }
}
