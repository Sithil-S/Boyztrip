import React from 'react';

export default function Footer() {
  return (
    <div 
      className='relative h-[800px]' 
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className='fixed bottom-0 h-[800px] w-full'>
        <div className='bg-[#ffffff] py-8 px-12 h-full w-full flex flex-col justify-between'>
          {/* Section1 */}
          <div>
            <div className='flex shrink-0 gap-20'>
              <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>About</h3>
                <p>Home</p>
                <p>Projects</p>
                <p>Our Mission</p>
                <p>Contact Us</p>
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>Education</h3>
                <p>News</p>
                <p>Learn</p>
                <p>Certification</p>
                <p>Publications</p>
              </div>
            </div>
          </div>
          {/* Section2 */}
          <div className='flex justify-between items-end'>
            <h1 className='text-[14vw] leading-[0.8] mt-10'>Sticky Footer</h1>
            <p>©copyright</p>
          </div>
        </div>
      </div>
    </div>
  );
}
