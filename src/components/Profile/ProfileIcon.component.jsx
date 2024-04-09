import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import profilePicture from './avatar.png';

const ProfileIcon = ({ direction, onRouteChange, toggleModal, ...args }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="pa4 tc">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={dropdownOpen}>
                        <img
                            src={profilePicture}
                            className="br-100 ba h3 w3 dib"
                            alt="avatar"
                        />
                </DropdownToggle>
                <DropdownMenu
                    className="b--transparent shadow-5"
                    style={{ marginTop: "20px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                    {...args}
                >
                    <DropdownItem onClick={toggleModal}>View Profile</DropdownItem>
                    <DropdownItem
                        onClick={() => {
                            window.sessionStorage.removeItem('token');
                            onRouteChange('signout');
                        }}
                    >Sign Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default ProfileIcon;