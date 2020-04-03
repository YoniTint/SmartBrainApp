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
        imageUrl: '',
        box: {},
      }
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

    displayFaceBox = box => {
      this.setState({box: box});
    }

    onInputChange = (event) => {
     this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models.predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err))
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
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        );
    }
}

export default App;
