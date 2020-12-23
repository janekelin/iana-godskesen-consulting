import React from 'react';
import css from './footer.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope);

const Footer = () => {
  return (
    <footer className={css.footer}>
      <p>
        &copy;2018-2020 - &nbsp;
        <a href="mailto:elise.godskesen@outlook.com">
          <FontAwesomeIcon icon={faEnvelope} /> Elise Godskesen
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
