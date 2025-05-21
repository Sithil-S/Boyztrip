import React, { useEffect } from 'react';
import './Home.css'; 
import Header from '../components/Header/Header';
import Hero from '../HomeContent/Hero/Hero';
import Section1 from '../HomeContent/Section1/Section1';
import Section2 from '../HomeContent/Section2/Section2';  
import Section3 from '../HomeContent/Section3/Section3';
import Section4 from '../HomeContent/Section4/Section4';
import Section5 from '../HomeContent/Section5/ZoomParallax';
import Section6 from '../HomeContent/Section6/Section6';
import Section8 from '../HomeContent/Section8/Section8';
import HorizontalScrollCarousel from '../HomeContent/Section7/HorizontalScrolling';
import Section9 from '../HomeContent/Section9/Section9';
import Footer from '../components/Footer/Footer';



const Home = () => {


  return (
    <div  >
      <Header />
      <Hero/>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <HorizontalScrollCarousel />
      <Section8 />
      <Section9 />
      <Footer />
    </div>
  );
};

export default Home;
