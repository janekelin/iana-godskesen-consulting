//DOM Manipulation
document.addEventListener("DOMContentLoaded", function() {
  if (window.innerWidth > 768) {
    updatePortrait();
  }
});

function updatePortrait() {
  const header = document.getElementById("js-header");
  const portrait = document.getElementById("js-portrait");

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
  const PLACEHOLDER = "No projects are chosen. Click on tags above to choose some projects.";
  const PROJECTS = " projects with the following tag: ";
  const HIDE = `Hide ${PROJECTS}`;
  const SHOW = `Show ${PROJECTS}`;
  

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
      title: "Sparinspiration",
      url: "https://sparinspiration.godskesen.consulting",
      imageUrl: "build/images/screenshot2.png",
      imageAlt: "Screenshot of sparinspiration.godskesen.consulting",
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
        showClear: true, //flag for "Clear All"-button
        showChoose: false, //flag for "Choose All"-button
        firstClick: true, //all tags are shown from the beggining, so on first click non-chosen tags should become passive
      };

      this.state = this.defaultState;
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
      e.preventDefault();
      
      if(hasClass(e.target, 'clear')){
        this.setState({activeTags: new Set(), showClear: false, showChoose: true});
        return;
      }

      if(hasClass(e.target, 'choose')){
        this.setState(this.defaultState);
        return;
      }

      const clickedTag = e.target.lastChild.nodeValue; //every tag consists of a sr-only span and a text node   
      const { activeTags, firstClick } = this.state;

      const updatedTags = firstClick ? new Set([clickedTag]) : toggleValueInSet(activeTags, clickedTag);
      const updatedShowChoose = this.defaultState.activeTags.size !== updatedTags.size;
      const updatedShowClear = updatedTags.size > 0;
      this.setState({activeTags: updatedTags, firstClick: false, showClear: updatedShowClear, showChoose: updatedShowChoose});
    }


    render(){
      const {projects} = this.props;

      const projectsList = projects.filter(project => project.tags.some(tag => this.state.activeTags.has(tag))).map(project => (
        <ProjectCard key={project.id} value={project} />
      ));
       
      const tagList = projects.flatMap(project => project.tags); //only unique tags
  
      return (
        <section id="projects" className="container--flex container--flex--vertical">
          <h2 className="section__title">My projects and collaborations</h2>
          <TagList allTags={tagList} activeTags={this.state.activeTags} handleClick={this.handleClick} showClear={this.state.showClear} showChoose={this.state.showChoose} />
          {projectsList.length ? projectsList : PLACEHOLDER}
        </section>
      );
    }
    
  }

  function ProjectCard(props) {
    const project = props.value;

    return (
      <a href={project.url} target="_blank" className="card container--flex container--relative content--centered" style={{"backgroundImage": `url(${project.imageUrl})`}} >
        <h3 className="project__title">{project.title}</h3>
        <p className="project__description">{project.description ? project.description : ""}</p>
        <div className="deco"></div>
      </a>
    );
  }

  function TagList(props) {
    const { activeTags, allTags, handleClick } = props; 
    const uniqueTags = Array.from(new Set(allTags));
    const tags = uniqueTags.map(tag => (
      <li key={createKey(tag)}> 
        <button className={activeTags.has(tag) ? "active" : "passive"} onClick={handleClick}>
          {activeTags.has(tag) ? createSRonlyText(HIDE) : createSRonlyText(SHOW)}
          {tag}
        </button>
      </li>
    ));

    return (
      <div className="container--relative container--tags">
        <ul className="container--flex content--wrapped tags">{tags}</ul>
        <button className="btn--control clear" onClick={handleClick} hidden={!props.showClear}>Clear all {createSRonlyText("tags")}</button>
        <button className="btn--control choose" onClick={handleClick} hidden={!props.showChoose}>Choose all {createSRonlyText("tags")}</button>
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

  function createSRonlyText(str){
    return (<span className="sr-only">{str}</span>);
  }

  function hasClass(element, className){
    const classArray = Array.from(element.classList);
    return classArray.includes(className);
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
