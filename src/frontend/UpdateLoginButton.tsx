import { useState } from 'react';
import '../style/User.css'
import {UserProps} from "../backend/Props.ts";

function UpdateLoginButton({ userIcon, userName }: UserProps): JSX.Element {
    const [isClicked, setIsClicked] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.location.href = import.meta.env.VITE_PRODUCTION;
    };

    const handleMouseClick = () => {
        if(isClicked) setIsClicked(false)
        else setIsClicked(true);
    };

    return (
        <div
            id="user"
            className="user"
            style={{
                width: '200px',
                gap: '1em',
                padding: '5px 5px',
                display: 'flex',
                alignItems: 'center',
                transition: 'none'
            }}
        >
            <img src={userIcon}
                 alt="user-icon"
                 id="user-icon"
            />
            <h3 className="user-name"
                id="user-name"
            >
                {userName}
            </h3>
            <i className={isClicked ? "fa fa-caret-up" : "fa fa-caret-down"}
               aria-hidden="true"
               onClick={handleMouseClick}
            >
            </i>
            {isClicked &&
                <button
                    type="button"
                    onClick={handleLogout}
                    id="logout"
                    className="logout"
                    style={{
                        position: 'absolute',
                        bottom: '-50px',
                        backgroundColor: 'grey'
                    }}
                >
                    Logout
                </button>
            }
        </div>
    );
}

export default UpdateLoginButton;
