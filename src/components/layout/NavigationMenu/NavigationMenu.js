/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'gatsby';
import css from './navigation.module.css';
import NavigationContainer from '../Containers/NavigationContainer';

const NavigationLink = (props) => (
  <li className={css.link}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const NavigationMenu = () => {
  return (
    <NavigationContainer>
      <ul className={css.navigation}>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/about/">About</NavigationLink>
        <NavigationLink to="/contact/">Contact</NavigationLink>
      </ul>
    </NavigationContainer>
  );
};

export default NavigationMenu;
