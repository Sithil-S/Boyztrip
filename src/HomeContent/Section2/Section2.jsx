import React from 'react';
import ParallaxImage from '../../components/animations/ParallaxImage/ParallaxImage';
import TextStagger from '../../components/animations/TextStagger/TextStagger';
import section2pot from '../../assets/section2/section2pot.jpg';
import './Section2.css';

const Section2 = () => {
  
  const text = "Traveling with friends should be fun, not stressful. BoyzTrip helps you and your crew save money daily towards your dream getaway. No more last-minute budgeting issues – simply create a group, set a savings goal, and watch your piggy bank grow. Once you're ready, withdraw and book your trip with ease. Let's make unforgettable memories together!";

  return (
    <section className='section2-container'>      
      <div className='section2-intro'>
        <TextStagger 
          caption="Our Story"
          heading="Creating Moments That Matter" 
          text={text} 
        />
        <button className="section2-button">GET STARTED</button>
      </div>
      <div className='section2-potrait'>
        <div className='section2-potrait-container'>
          <div className='img-container'>
            <ParallaxImage src={section2pot} alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;