import React from 'react';
import css from './container.module.css';

const NavigationContainer = ({ children }) => {
  return (
    <nav className={css.navigation}>
      <h2 className={`sr-only ${css.title}`}>Navigation</h2>
      {children}
    </nav>
  );
};

export default NavigationContainer;
