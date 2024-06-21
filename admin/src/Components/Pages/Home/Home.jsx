import React from 'react';
import SideNavBar from '../../Containers/SideNavBar/SideNavBar';
import HeaderBar from '../../Containers/Header/Header';
import TopCards from '../../Containers/TopCards/TopCards';

const Home = () => {
  return (
    <div className='flex flex-row overflow-hidden'>
      <SideNavBar />
      <div className="flex flex-col flex-1">
        <HeaderBar />
        <TopCards />
      </div>
    </div>
  );
}

export default Home;
