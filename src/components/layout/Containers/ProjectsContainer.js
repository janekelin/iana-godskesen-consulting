import React from 'react';
import css from './container.module.css';

const ProjectsContainer = ({ children }) => {
  return (
    <section className={`${css.section} ${css.projects}`}>
      <h2 className={css.title}>My projects and collaborations</h2>
      {children}
    </section>
  );
};

export default ProjectsContainer;
