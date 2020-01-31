import React from 'react';

const Footer = () => (
    <footer id="main" className="border-t-2 border-secondary py-12 text-center md:text-left">
        <div className="container mx-auto">
            <div className="md:flex">
                <div className="md:w-1/4 pr-8 sm:w-full">
                    <img src={env.ASSETS_URL+"/images/Documenta-logo.svg"} height="100px" width="auto" />
                </div>
                <div className="md:w-1/4 px-8 sm:w-full">
                    <p className="mb-1">Selska cesta 112c, HR-10000 Zagreb</p>
                    <p className="mb-1"><span className="text-primary font-semibold">TEL</span> +385 1 457 2398</p>
                    <p className="mb-1"><span className="text-primary font-semibold">FAX</span> +385 1 457 2399</p>
                    <p><span className="text-primary font-semibold">e-mail:</span> kontakt@documenta.hr</p>
                </div>
                <div className="md:w-1/4 px-8 sm:w-full">
                    <p>Copyright © 2019. DOCUMENTA.<br/>
                    Sva prava pridržana.</p>
                </div>
                <div className="md:w-1/4 pl-8 sm:w-full text-center">
                    <a href="#" className="social-icon"><img src={env.ASSETS_URL+"/images/icon_FB.svg"} /></a>
                    <a href="#" className="social-icon"><img src={env.ASSETS_URL+"/images/icon_Twitter.svg"} /></a>
                    <a href="#" className="social-icon"><img src={env.ASSETS_URL+"/images/icon_YT.svg"} /></a>
                    <a href="#" className="social-icon bg-primary"><i className="fa fa-instagram align-middle"></i></a>
                </div>
            </div>
        </div>
    </footer>    
);

export default Footer;