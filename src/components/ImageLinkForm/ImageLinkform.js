import React from 'react';
import './ImageForm.css'



const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return (
      <div>
          <p className='f3'>
               {'This Smart Bee wil give what you want. Type a wish'}
         </p>
          <div className='center'>
            <div className= 'form center pa4 br3 shadow-5'>
            <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}></input>
              <button className='w-30 grow f4 link ph3 dib white bg-yellow' onClick={onButtonSubmit}>Search</button>
            </div>
          </div>
      </div>
    
    );
}

export default ImageLinkForm;