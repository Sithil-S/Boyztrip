import React from 'react';
import ParallaxImage from '../../components/animations/ParallaxImage/ParallaxImage';
import TextStagger from '../../components/animations/TextStagger/TextStagger';
import section4pot from '../../assets/section4/section4pot.jpg';
import './section4.css';

const Section4 = () => {
  const text = "BoyzTrip is designed to make group travel easier than ever! Create a travel savings group, invite your friends, and contribute a small daily amount. When your savings goal is reached, you'll have a secure fund ready for the trip. Whether it's a road trip, beach vacation, or international adventure, we help you make it happen—stress-free!";

  return (
    <section className='section4-container'>      <div className='section4-intro'>
        <TextStagger 
          caption="How It Works"
          heading="Adventure Redefined" 
          text={text} 
        />
        <button className="section4-button">GET STARTED</button>
      </div>
      <div className='section4-potrait'>
        <div className='section4-potrait-container'>
          <div className='img-container'>
            <ParallaxImage src={section4pot} alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;