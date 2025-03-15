import React, { ReactNode } from 'react';
import bg from '../../../assets/footer-bg.jpg';

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <div
      className="relative text-center mb-8 pt-[8rem] pb-[2rem] bg-top bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2 className="relative z-[99]">{children}</h2>
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
    </div>
  );
};

export default PageHeader;
