'use strict';

//DOM Manipulation
window.addEventListener("load", function(){
	var nodes = document.querySelectorAll("#mainNav a");
	for(var i=0; i<nodes.length; i++){
		nodes[i].addEventListener("click", function(){
			document.querySelector(".portrait").setAttribute("src", this.getAttribute("data-img-src-ref"));
		});
	}
});

//React Injection
// Imports
const {Component, createElement} = React;

class ProjectSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [1],
    };
  }

  render() {
    if(!this.state.projects.length) {
      return 'Loading...';
    }

    return createElement(
      'section',
      {id: 'projects'},
      'Section loaded.'
    );
  }
}

const projectSectionContainer = document.querySelector('#js-container-projects');
ReactDOM.render(createElement(ProjectSection), projectSectionContainer);