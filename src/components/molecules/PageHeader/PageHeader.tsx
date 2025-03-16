import React, { ReactNode } from 'react';
import bg from '../../../assets/footer-bg.jpg';

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <div
      className="relative text-center mb-8 pt-[var(--header-height)] pb-8 bg-top bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2 className="relative z-10 text-white text-4xl font-bold">{children}</h2>
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[var(--body-bg)] to-transparent"></div>
    </div>
  );
};

export default PageHeader;
