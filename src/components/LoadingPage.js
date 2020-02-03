import React from 'react';

const LoadingPage = () => (
    <div id="loader">
        <svg x="0px" y="0px" viewBox="0 0 79 81" enableBackground="new 0 0 79 81" className="loader__image">
            <defs>
                <linearGradient id="linear-gradient" x1="-30%" y1="0" x2="130%" y2="0" >
                    <stop offset="0" stopColor="#B2A388">
                        <animate attributeName="offset" values="0;1" dur="1s" repeatCount="indefinite"  /> 
                    </stop>
                    <stop offset="0.5" stopColor="#1D1D1B">
                        <animate attributeName="offset" values="0;1" dur="1s" repeatCount="indefinite"  /> 
                    </stop>
                </linearGradient>
            </defs>
            <path fillRule="evenodd" clipRule="evenodd" d="M25.267,20.823V59.89h9.642c15.383,0,17.632-12.462,17.632-19.984
                c0-5.052-1.565-19.083-19.419-19.083H25.267z M0.567,59.916V0.284h40.524c26.719,0,36.144,19.756,36.144,39.962
                c0,24.587-13.021,40.184-40.976,40.184H20.997V59.916H0.567z" fill="url(#linear-gradient)" />
        </svg>
    </div>
);

export default LoadingPage;
