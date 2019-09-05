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
  class ProjectSection extends React.Component {
    constructor(props){
      super(props);
      this.defaultState = {
        activeTags: new Set(props.projects.flatMap(project => project.tags)),
        firstClick: true,
      };

      this.state = this.defaultState;

      
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
      if(e.target.className === "clear"){
        e.preventDefault();
        this.setState({activeTags: new Set()});
        return;
      }

      if(e.target.className === "choose"){
        e.preventDefault();
        this.setState(this.defaultState);
        return;
      }

      const clickedTag = e.target.innerText;
      
      const { activeTags } = this.state;
      const updatedTags = this.state.firstClick ? new Set([clickedTag]) : toggleValueInSet(activeTags, clickedTag);
      this.setState({activeTags: updatedTags, firstClick: false});
    }


    render(){
      const {projects} = this.props;

      const projectsList = projects.filter(project => project.tags.some(el => this.state.activeTags.has(el))).map(project => (
        <ProjectCard key={project.id} value={project} />
      ));
       
      const tagList = projects.flatMap(project => project.tags); 
  
      return (
        <section id="projects">
          <h2>My projects and collaborations</h2>
          <TagList allTags={tagList} activeTags={this.state.activeTags} handleClick={this.handleClick}/>
          {projectsList.length ? projectsList : PLACEHOLDER}
        </section>
      );
    }
    
  }

  function ProjectCard(props) {
    const project = props.value;

    return (
      <a href={project.url} target="_blank" className="card" style={{"background": `url(${project.imageUrl})`}} >
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description ? project.description : PLACEHOLDER}</p>
      </a>
    );
  }

  function TagList(props) {
    const { activeTags, allTags, handleClick } = props;
    const uniqueTags = Array.from(new Set(allTags));
    const tags = uniqueTags.map(tag => <li key={createKey(tag)} onClick={handleClick} className={activeTags.has(tag) ? "active" : "passive"} >{tag}</li>);

    return (
      <div className="container">
        <ul className="tags">{tags}</ul>
        <button className="clear" onClick={handleClick}>Clear all</button>
        <button className="choose" onClick={handleClick}>Choose all</button>
      </div>
    ) ;
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

  function toggleValueInSet(aSet, aValue){
    const copySet = new Set(aSet);
    copySet.has(aValue) ? copySet.delete(aValue) : copySet.add(aValue);
    return copySet;
  }
}
