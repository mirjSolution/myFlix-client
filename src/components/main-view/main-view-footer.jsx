import React from 'react';

import './main-view.scss';

const MainViewFooter = () => {
  return (
    <section className='main-view-footer'>
      <footer className='fixed-bottom bg-dark text-white text-center'>
        <p className='pt-2'>
          Copyright &#169; 2020 myFlix. All rights reserved
        </p>
      </footer>
    </section>
  );
};

export default MainViewFooter;
