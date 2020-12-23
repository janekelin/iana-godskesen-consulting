import React from 'react';
import Page from '../components/layout/Page';
import ContactContainer from '../components/layout/Containers/ContactContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from '../styles/typography.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);
const COLOR_ICONS = '#e96547';
const STYLE_ICONS = {
  color: COLOR_ICONS,
  '@media print': {
    display: 'none',
  },
};

export default () => (
  <Page>
    <ContactContainer>
      <div id="linkedin">
        <a
          href="https://www.linkedin.com/in/elisegodskesen/"
          className={css.contact}
        >
          <span className="sr-only">My LinkedIn</span>
          <FontAwesomeIcon
            icon={['fab', 'linkedin']}
            size="10x"
            style={STYLE_ICONS}
          />
        </a>
      </div>
      <div id="github">
        <a href="https://github.com/janekelin" className={css.contact}>
          <span className="sr-only">My GitHub</span>
          <FontAwesomeIcon
            icon={['fab', 'github-square']}
            size="10x"
            style={STYLE_ICONS}
          />
        </a>
      </div>
      <div id="twitter">
        <a href="https://twitter.com/_janekelin" className={css.contact}>
          <span className="sr-only">My Twitter</span>
          <FontAwesomeIcon
            icon={['fab', 'twitter-square']}
            size="10x"
            style={STYLE_ICONS}
          />
        </a>
      </div>
      <div id="codepen">
        <a href="https://codepen.io/janekelin" className={css.contact}>
          <span className="sr-only">My CodePen</span>
          <FontAwesomeIcon
            icon={['fab', 'codepen']}
            size="10x"
            style={STYLE_ICONS}
          />
        </a>
      </div>
    </ContactContainer>
  </Page>
);
