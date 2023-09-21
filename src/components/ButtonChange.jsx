import '../assets/css/ButtonChange.css';
import React, { useState } from 'react';

 
function ButtonToggle() {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
        setIsClicked(!isClicked);
      };
    
      const buttonClassName = `colored-button ${isClicked ? 'clicked' : ''}`;
  
    return (
        <button className={buttonClassName} onClick={handleClick}>
        {isClicked ? 'Clicked!' : 'Click Me'}
      </button>
    );
  }




export default ButtonToggle;
 