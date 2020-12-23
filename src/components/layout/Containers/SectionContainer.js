import React from 'react';
import css from './container.module.css';

const SectionContainer = ({ children, title, titleSrOnly = false }) => {
  let headingClass = titleSrOnly ? `sr-only ${css.title}` : css.title;
  return (
    <section className={css.section}>
      <h2 className={headingClass}>{title}</h2>
      {children}
    </section>
  );
};

export default SectionContainer;
