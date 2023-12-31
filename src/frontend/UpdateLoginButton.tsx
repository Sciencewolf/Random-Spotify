import { useState } from 'react';
import '../style/User.css'
import {UserProps} from "../backend/Props.ts";

function UpdateLoginButton({ userIcon, userName }: UserProps): JSX.Element {
    const [isHovered, setIsHovered] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.location.href = import.meta.env.VITE_PRODUCTION;
    };

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
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
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {isHovered ? (
                <button type="button"
                        onClick={handleLogout}
                        id="logout"
                        className="logout"
                >
                    Logout
                </button>
            ) : (
                <>
                    <img src={userIcon}
                         alt="user-icon"
                         id="user-icon"
                    />
                    <h3 className="user-name"
                        id="user-name"
                    >
                        {userName}
                    </h3>
                </>
            )}
        </div>
    );
}

export default UpdateLoginButton;
