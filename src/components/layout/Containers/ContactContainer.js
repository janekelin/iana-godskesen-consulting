import React from 'react';
import css from './container.module.css';

const ContactContainer = ({ children }) => {
  return (
    <section className={`${css.section} ${css.contact}`}>
      <h2 className={`sr-only ${css.title}`}>My contact details</h2>
      {children}
    </section>
  );
};

export default ContactContainer;
