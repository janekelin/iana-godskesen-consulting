import React from 'react';
import NavigationMenu from '../NavigationMenu';
import css from './header.module.css';
import portrait from '../../../images/b_image0.png';
import { useStaticQuery, Link, graphql } from 'gatsby';

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <header className={css.header}>
      <Link to="/">
        <h1 className={css.heading} data-img="0">
          {data.site.siteMetadata.title}
        </h1>
      </Link>
      <NavigationMenu />
      <img
        className={css.portrait}
        src={portrait}
        alt="Portrait of Elise Godskesen"
      />
    </header>
  );
};

export default Header;
