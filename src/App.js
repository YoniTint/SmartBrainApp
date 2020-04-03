import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.component';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.component';
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

const app = new Clarifai.App({
  apiKey: '13690c6feeb948a9b08b895ae3438c26'
});

class App extends React.Component {   

    constructor() {
      super();
      this.state = {
        input: '',
        imageUrl: ''
      }
    }

    onInputChange = (event) => {
     this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models.predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
        .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          // there was an error
        }
      );
    }

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
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition imageUrl={this.state.imageUrl}/>
          </div>
        );
    }
}

export default App;
