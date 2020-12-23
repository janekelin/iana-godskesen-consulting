import React from 'react';
import css from './container.module.css';

const TaglistContainer = ({ children }) => {
  return <div className={css.taglist}>{children}</div>;
};

export default TaglistContainer;
