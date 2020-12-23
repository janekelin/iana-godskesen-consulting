import React, { Component } from 'react';
import ProjectsContainer from '../../layout/Containers/ProjectsContainer';
import TaglistContainer from '../../layout/Containers/TaglistContainer';
import css from './projects.module.css';

// Script-wide constants
const PLACEHOLDER =
  'No projects are chosen. Click on tags above to choose some projects.';
const PROJECTS = ' projects with the following tag: ';
const HIDE = `Hide ${PROJECTS}`;
const SHOW = `Show ${PROJECTS}`;

const projects = [
  {
    id: '100',
    title: "Kurt Cobain's Tribute Page",
    url: 'https://codepen.io/collection/XPjeBj/',
    imageUrl: 'build/images/screenshot.png',
    imageAlt:
      'Screenshot of my freeCodeCamp project focused on Responsive Web Design',
    tags: ['RWD', 'Variable Fonts', 'CSS Grid'],
    description:
      'A pure CSS experiment on CSS Grid and variable fonts. Submitted for freeCodeCamp certifications with focus on Responsive Web Design.',
  },
  {
    id: '101',
    title: 'Sparinspiration',
    url: 'https://sparinspiration.godskesen.consulting',
    imageUrl: 'build/images/screenshot2.png',
    imageAlt: 'Screenshot of sparinspiration.godskesen.consulting',
    tags: ['Bootstrap 4', 'Flexbox', 'CSS Grid'],
    description: 'A Swedish website with 5 daily money-saving tips.',
  },
];

// Components
class ProjectSection extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      activeTags: new Set(projects.flatMap((project) => project.tags)),
      showClear: true, //flag for "Clear All"-button
      showChoose: false, //flag for "Choose All"-button
      firstClick: true, //all tags are shown from the beggining, so on first click non-chosen tags should become passive
    };

    this.state = this.defaultState;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    if (hasClass(e.target, 'clear')) {
      this.setState({
        activeTags: new Set(),
        showClear: false,
        showChoose: true,
      });
      return;
    }

    if (hasClass(e.target, 'choose')) {
      this.setState(this.defaultState);
      return;
    }

    const clickedTag = e.target.lastChild.nodeValue; //every tag consists of a sr-only span and a text node
    const { activeTags, firstClick } = this.state;

    const updatedTags = firstClick
      ? new Set([clickedTag])
      : toggleValueInSet(activeTags, clickedTag);
    const updatedShowChoose =
      this.defaultState.activeTags.size !== updatedTags.size;
    const updatedShowClear = updatedTags.size > 0;
    this.setState({
      activeTags: updatedTags,
      firstClick: false,
      showClear: updatedShowClear,
      showChoose: updatedShowChoose,
    });
  }

  render() {
    const projectsList = projects
      .filter((project) =>
        project.tags.some((tag) => this.state.activeTags.has(tag))
      )
      .map((project) => <ProjectCard key={project.id} value={project} />);

    const tagList = projects.flatMap((project) => project.tags); //only unique tags

    return (
      <ProjectsContainer>
        <TagList
          allTags={tagList}
          activeTags={this.state.activeTags}
          handleClick={this.handleClick}
          showClear={this.state.showClear}
          showChoose={this.state.showChoose}
        />
        {projectsList.length ? projectsList : PLACEHOLDER}
      </ProjectsContainer>
    );
  }
}

function ProjectCard(props) {
  const project = props.value;

  return (
    <a
      href={project.url}
      target="_blank"
      className={css.card}
      style={{ backgroundImage: `url(${project.imageUrl})` }}
    >
      <h3 className={css.title}>{project.title}</h3>
      <p className={css.description}>
        {project.description ? project.description : ''}
      </p>
      <div className={css.deco}></div>
    </a>
  );
}

function TagList(props) {
  const { activeTags, allTags, handleClick } = props;
  const uniqueTags = Array.from(new Set(allTags));
  const tags = uniqueTags.map((tag) => (
    <li key={createKey(tag)} className={css.tag}>
      <button
        className={
          activeTags.has(tag)
            ? `${css.button} ${css.active}`
            : `${css.button} ${css.passive}`
        }
        onClick={handleClick}
      >
        {activeTags.has(tag) ? createSRonlyText(HIDE) : createSRonlyText(SHOW)}
        {tag}
      </button>
    </li>
  ));

  return (
    <TaglistContainer>
      <ul className={css.taglist}>{tags}</ul>
      <button
        className={`${css.control} ${css.clear}`}
        onClick={handleClick}
        hidden={!props.showClear}
      >
        Clear all {createSRonlyText(' ')}
      </button>
      <button
        className={`${css.control} ${css.choose}`}
        onClick={handleClick}
        hidden={!props.showChoose}
      >
        Choose all {createSRonlyText('tags')}
      </button>
    </TaglistContainer>
  );
}

// Helper functions
function createKey(seed) {
  const key = seed && removeWhitespace(seed).toLowerCase();
  return key || Date.now().toString();
}

function createSRonlyText(str) {
  return <span className="sr-only">{str}</span>;
}

function hasClass(element, className) {
  const classArray = Array.from(element.classList);
  return classArray.includes(className);
}

function removeWhitespace(str) {
  const result =
    str &&
    str
      .toString() //typechecking
      .split(' ') //'word1 word2' => ["word1", "word2"]
      .join(''); //["word1", "word2"] => 'word1word2'
  return result;
}

function toggleValueInSet(aSet, aValue) {
  const copySet = new Set(aSet);
  copySet.has(aValue) ? copySet.delete(aValue) : copySet.add(aValue);
  return copySet;
}

export default ProjectSection;
