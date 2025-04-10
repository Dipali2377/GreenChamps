import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const quotes = [
  "“The Earth is what we all have in common.” – Wendell Berry",
  "“We won’t have a society if we destroy the environment.” – Margaret Mead",
  "“Small acts, when multiplied by millions, can transform the world.” – Howard Zinn",
  "“Be the change you wish to see in the world.” – Mahatma Gandhi",
];

const Home = () => {
  let navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function handleGetStarted() {
    navigate("/register");
  }
  return (
    <>
      <div className="home-container">
        <div className="overlay">
          <div className="home-content">
            <h1 className="home-heading">
              Welcome to <span className="green-heading">GreenChamps</span> 🌍
            </h1>
            <p className="quote fade-in">{quotes[quoteIndex]}</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
