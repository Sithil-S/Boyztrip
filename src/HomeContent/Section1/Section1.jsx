import OpacityReveal from "./OpacityReveal";
import "./Section1.css";

const Section1 = () => {

  return (
    <div className="section1-container">
      <div className="section1-text">
        <OpacityReveal paragraph={
          <>
Planning a trip with your friends? We make it effortless! With BoyzTrip, you can organize, save, and travel stress-free. Our platform helps you create a group savings plan where everyone contributes regularly, ensuring that no one gets left behind when it’s time to go.          </>
        } />
      </div>
      <div className="section1-button-container">
        <button
          className="section1-button"
        >
          Plan Your Epic Getaway
        </button>
      </div>

    </div>
  );
};

export default Section1;
