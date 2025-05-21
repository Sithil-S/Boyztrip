import React from 'react';
import ParallaxImage from '../../components/animations/ParallaxImage/ParallaxImage';
import TextStagger from '../../components/animations/TextStagger/TextStagger';
import section6pot from '../../assets/section6/section6pot.jpg';
import './Section6.css';

const Section6 = () => {
  const text = "We take care of every detail so you don't have to. Whether it's an action-packed escape or a laid-back retreat, BoyzTrip delivers seamless planning and unforgettable memories tailored just for you.";

  return (
    <section className='section6-container'>      <div className='section6-intro'>
        <TextStagger 
          caption="Why Choose Us"
          heading="Your Journey, Simplified" 
          text={text} 
        />
        <button className="section6-button">GET STARTED</button>
      </div>
      <div className='section6-potrait'>
        <div className='section6-potrait-container'>
          <div className='img-container'>
            <ParallaxImage src={section6pot} alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6;