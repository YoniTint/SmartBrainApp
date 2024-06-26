import React, { useState } from 'react';
import profilePicture from "./batman.png";
import './Profile.styles.css';
const Profile = ({ isProfileOpen, toggleModal, loadUser, user }) => {
    const [name, setName] = useState(user.name);

    const onFormChange = (event) => {
        const { value } = event.target;
        switch(event.target.name) {
            case 'user-name':
                setName(value);
                break;
            default:
                return;
        }
    }

    const onProfileUpdate = (data) => {
        fetch(`https://smart-brain-app-x73814-1b05e9cdf5f3.herokuapp.com/profile/${user.id}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({ formInput: data }) })
            .then(resp => {
                if (resp.status === 200 || resp.status === 304) {
                    toggleModal();
                    loadUser({ ...user, ...data });
                }
            })
            .catch(console.log)
    }

    return (
      <div
          className="profile-modal">
          <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
              <main className="pa4 black-80 w-80">
                  <img
                      src={profilePicture}
                      className="h3 w3 dib"
                      alt="avatar"
                  />
                  <h1>{name}</h1>
                  <h4>{`Image Submitted: ${user.entries}`}</h4>
                  <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                  <hr />
                  <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                  <input
                      onChange={onFormChange}
                      className="pa2 ba w-100"
                      placeholder={name}
                      type="text"
                      name="user-name"
                      id="name"
                  />
                  <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <button
                          onClick={() => onProfileUpdate({ name })}
                          className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                      >
                          Save
                      </button>
                      <button
                          className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                          onClick={toggleModal}
                      >
                          Cancel
                      </button>
                  </div>
              </main>
              <div className="modal-close" onClick={toggleModal}>&times;</div>
          </article>
      </div>
    );
}

export default Profile;