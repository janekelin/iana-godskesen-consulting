import React from 'react';
import Page from '../components/layout/Page';
import SectionContainer from '../components/layout/Containers/SectionContainer';
import css from '../styles/typography.module.css';

export default () => (
  <Page>
    <SectionContainer title="Webdev scout">
      <p>
        After 13 years in media, marketing, and academic advising, I decided to
        shift from <i className={css.subtle}>not a real science</i> social
        sciences to IT sector. Before I realized how much I love CSS, JS &amp;
        co I studied&nbsp;
        <strong className={css.accent}>
          project management, software development, and electronic services
        </strong>
        . Combined with my soft skills, these studies equipped me with a broad
        expertise in technologies that can make the Web a better place.
      </p>
      <p>
        Check out my <i className="fab fa-linkedin"></i>
        <a
          href="https://www.linkedin.com/in/elisegodskesen/"
          className={css.link}
        >
          LinkedIn profile&nbsp;
        </a>
        to find out what I have achieved and which competences I have acquired.
      </p>
    </SectionContainer>
  </Page>
);
