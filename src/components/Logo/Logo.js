import React from 'react';
import Tilt from 'react-parallax-tilt'
import Img from './img/logo.PNG';
import './Logo.css'

const Logo = () =>{
 return(
     <div>
         <Tilt className="Tilt br2 shadow-2" options={{ max : 25}} style={{ height: 100, width: 100, 'borderRadius':'50px' }} >
 <div className="Tilt-inner"> <img src={Img} alt='logo' style={{height:100, width:100, 'borderRadius':' 50px'}}></img > </div>
</Tilt>
     </div>
 );
}

export default Logo;