import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.component';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.component';
import Logo from './components/Logo/Logo.component';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.component';
import Rank from './components/Rank/Rank.component';
import SignIn from './components/SignIn/SignIn.component';
import Register from './components/Register/Register.component';
import Modal from './components/Modal/Modal.component';
import Profile from './components/Profile/Profile.component';
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

const initialState = {
        input: '',
        imageUrl: '',
        boxes: [],
        route: 'signin',
        isSignedIn: false,
        isProfileOpen: false,
        user: {
          id: '',
          name: '', 
          email: '',
          entries: 0,
          joined: '',
            age: '',
            pet: ''
        }
}        

class App extends React.Component {   

    constructor() {
      super();
      this.state = initialState;
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (token) {
            fetch('https://smart-brain-app-x73814-1b05e9cdf5f3.herokuapp.com/signin', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data && data.id) {
                        fetch(`https://smart-brain-app-x73814-1b05e9cdf5f3.herokuapp.com/profile/${data.id}`,
                            {
                                method: 'get',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                }
                            })
                            .then(resp => resp.json())
                            .then(user => {
                                if (user && user.email) {
                                    this.loadUser(user);
                                    this.onRouteChange('home');
                                }
                            })
                    }
                })
                .catch(console.log)
        }
    }

    loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }});
    }

    calculateFaceLocation = (data) => {
        if (data && data.outputs) {
            const image = document.getElementById('inputimage');
            const width = Number(image.width);
            const height = Number(image.height);

            return data.outputs[0].data.regions.map(face => {
                const clarifaiFace = face.region_info.bounding_box;
                return {
                    leftCol: clarifaiFace.left_col * width,
                    topRow: clarifaiFace.top_row * height,
                    rightCol: width - (clarifaiFace.right_col * width),
                    bottomRow: height - (clarifaiFace.bottom_row * height)
                }
            });
        }
    }

    displayFaceBoxes = boxes => {
      if (boxes) {
        this.setState({boxes: boxes});
      }
    }

    onInputChange = (event) => {
     this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
        fetch(`https://smart-brain-app-x73814-1b05e9cdf5f3.herokuapp.com/imageurl`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              input: this.state.input
            }) 
        })
        .then(response => response.json())
        .then(response => {
          if (response && response !== 'unable to work with API') {
            fetch(`https://smart-brain-app-x73814-1b05e9cdf5f3.herokuapp.com/image`, {
              method: 'put',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': window.sessionStorage.getItem('token')
              },
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
          this.displayFaceBoxes(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err))
    }

    onRouteChange = (route) => {
      if(route === 'signout') {
        return this.setState(initialState)
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({ route: route });
    }

    toggleModal = () => {
        this.setState(prevState => ({
            ...prevState,
            isProfileOpen: !prevState.isProfileOpen
        }))
    }

    render() {
        const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user } = this.state;
        return (
          <div className="App">
            <Particles 
              className='particles'
              params={particlesOptions}
            />
            <Navigation
                isSignedIn={isSignedIn}
                onRouteChange={this.onRouteChange}
                toggleModal={this.toggleModal}
            />
              { isProfileOpen &&
                  <Modal>
                      <Profile
                          isProfileOpen={isProfileOpen}
                          toggleModal={this.toggleModal}
                          loadUser={this.loadUser}
                          user={user}
                      />
                  </Modal>}
            { route === 'home' 
              ? <div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries} />
                    <ImageLinkForm 
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit} 
                    />
                    <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
                </div>
              : (
                  route === 'signin'
                   ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                   : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                ) 
            }
          </div>  
        );
    }
}

export default App;
