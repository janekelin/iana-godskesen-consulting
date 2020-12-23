import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import css from './page.module.css';

const Page = ({ children }) => {
  return (
    <>
      <Header />
      <main className={css.page}>{children}</main>
      <Footer />
    </>
  );
};

export default Page;
