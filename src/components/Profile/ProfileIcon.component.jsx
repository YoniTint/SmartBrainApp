import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import profilePicture from './Profile_Final.png';

const ProfileIcon = ({ direction, ...args }) => {
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
                    style={{ marginTop: "20px", backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                    {...args}
                >
                    <DropdownItem>View Profile</DropdownItem>
                    <DropdownItem>Signout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default ProfileIcon;