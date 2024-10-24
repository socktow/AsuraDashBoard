import React from 'react'

const MainLayout = () => {
    return (
      <>
        <Navbar />
          <Outlet />
        <Footer />
      </>
    );
  };
  
  export default MainLayout;
