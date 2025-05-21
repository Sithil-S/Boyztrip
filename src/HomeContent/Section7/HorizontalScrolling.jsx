import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { useRef } from "react";
import TextStagger from '../../components/animations/TextStagger/TextStagger';
import section7img1 from '../../assets/section7/section7img5.jpg';
import section7img2 from '../../assets/section7/section7img2.jpg';
import section7img3 from '../../assets/section7/section7img4.jpg';
import section7img4 from '../../assets/section7/section7img3.jpg';
import "./HorizontalScrolling.css";




const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-86%"]);


  return (
    <section ref={targetRef} className="horizontal-scroll-carousel">
      <div className="carousel-container">
        <motion.div style={{ x }} className="carousel-content">
          <div className="carousel-text-container">
            <div className="subtitle">ADVENTURE AWAITS</div>
            <h2>YOUR PARADISE<br />AWAITS</h2>
            <div className="scroll-indicator-container">
              <div className="scroll-text">Scroll to explore our unforgettable boys' trip destinations</div>
              <div className="scroll-icon"></div>
            </div>
          </div>
          <div className="carousel-card-container">
            {cards.map((card) => {
              const imageRef = useRef(null);
              const isInView = useInView(imageRef, { amount: 0.6 });
              
              return (
                <div key={card.id} className="card">
                  <div className="card-image-container" ref={imageRef}>
                    <motion.img 
                      className="card-image"
                      src={card.url}
                      alt={card.title}
                      style={{
                        opacity: isInView ? 1 : 0.5,
                        transition: "opacity 0.5s ease-in-out"
                      }}
                    />
                  </div>
                  <div className="card-text-container">
                    <TextStagger 
                      caption={card.caption}
                      heading={card.title}
                      text={card.desc}
                    />
                    <button className="carousel-card-button">EXPLORE NOW</button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;

const cards = [
  {
    url: section7img1,
    caption: "Adventure Awaits",
    title: "Epic Road Trips",
    desc: "Hit the open road with your best buds and explore new destinations. From scenic routes to hidden gems, our road trips are designed for adventure and camaraderie.",
    id: 1,
  },
  {
    url: section7img2,
    caption: "Thrill Seekers",
    title: "Extreme Sports",
    desc: "Get your adrenaline pumping with our extreme sports packages. Whether it's skydiving, bungee jumping, or white-water rafting, we've got the ultimate thrill-seeking experiences.",
    id: 2,
  },
  {
    url: section7img3,
    caption: "Relax and Unwind",
    title: "Beach Getaways",
    desc: "Soak up the sun and relax on pristine beaches. Our beach getaways offer the perfect blend of relaxation and fun, with activities like surfing, snorkeling, and beach volleyball.",
    id: 3,
  },
  {
    url: section7img4,
    caption: "Nightlife",
    title: "City Escapes",
    desc: "Experience the vibrant nightlife and cultural attractions of the world's most exciting cities. From rooftop bars to live music venues, our city escapes are perfect for a boys' night out.",
    id: 4,
  },
];