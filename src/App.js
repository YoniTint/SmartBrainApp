import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.component';
import Logo from './components/Logo/Logo.component';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.component';
import Rank from './components/Rank/Rank.component';
import './App.css';


const particlesOptions = {
  particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 1000
        }
      }
    }
};

class App extends React.Component {    
    render() {
        return (
          <div className="App">
            <Particles 
              className='particles'
              params={particlesOptions}
            />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm />
            {/*
            <FaceRecognition />
            */}
          </div>
        );
    }
}

export default App;
