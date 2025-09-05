import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import ChatWidget from './ChatWidget'; 
import Footer from './Footer';

// layout
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
      <ChatWidget />
    </div>
  );
}