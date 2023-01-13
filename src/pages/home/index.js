import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css"

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/analytics");
    };

    return (
        <div className="home-container">
            <button className="home-button" onClick={handleButtonClick}>Go to Analytics</button>
        </div>
    );
}

export default Home;
