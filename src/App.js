import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
// import Clarifai from 'clarifai'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkform';
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';


// const app = new Clarifai.App({
//   apiKey: "0571041f47ba42ac9cc8b5e6283d9a46"
// });


const particleOptions = {
  particles: {
    number: { value: 90, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#ffbb0" },
      polygon: { nb_sides: 6 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 300,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  }

}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state= initialState;
  }

  
  loadeUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
   .then(response => response.json())
    // app.models
    // .predict(
    //   Clarifai.FACE_DETECT_MODEL,
    //   this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

 onRouteChange = (route) => {
   if(route === 'signout'){
     this.setState(initialState)
   }else if (route === 'home'){
     this.setState({isSignedIn: true})
   }
   this.setState({route: route})
 }
  render(){
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className= 'particles'
                params={particleOptions}  
                />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}
      />     
      { route === 'home' 
          ?
          <div>
            <Logo/>
            <Rank
            name={this.state.user.name}
            entries={this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>
         :(
           route === 'signin'
           ? <SignIn loadeUser={this.loadeUser} onRouteChange={this.onRouteChange}/>
           : <Register loadeUser={this.loadeUser} onRouteChange={this.onRouteChange}/>
         )
      
      
         
     }
      </div>
    );
  }
}

export default App;
                                              