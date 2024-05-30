import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useHistory, withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

const Header = (props) => {
    const [searchString, setSearchString] = useState('');
    const [formActive, setFormActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileMenuClass, setMobileMenuClass] = useState('');
    const [activeLang, setActiveLang] = useState(localStorage.getItem('documenta_locale'));
    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchString) {
                props.handleChange(searchString);
                history.push('/');
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchString, history, props]);

    const onFieldChange = (event) => {
        setSearchString(event.target.value);
    };

    const openSearch = () => {
        setFormActive(!formActive);
    };

    const mobileTrigger = () => {
        const isActive = !mobileMenuActive;
        setMobileMenuActive(isActive);
        setMobileMenuClass(isActive ? 'mobile-active' : '');

        if (isActive) {
            document.documentElement.classList.add('mobile-active');
        } else {
            document.documentElement.classList.remove('mobile-active');
        }
    };

    const languageSwitched = (e, lng, link) => {
        e.preventDefault();
        setActiveLang(lng);
        localStorage.setItem('documenta_locale', lng);
        history.push(link);
    };

    let uri = props.location.pathname.replace('/en/', '/');
    let uriEn = props.location.pathname.replace('/en/', '/');

    uriEn = uriEn.replace('novosti', 'news');
    uriEn = uriEn.replace('kategorija', 'category');

    uri = uri.replace('news', 'novosti');
    uri = uri.replace('category', 'kategorija');

    return (
        <header className={"container mx-auto flex md:block " + mobileMenuClass}>
            <div className="logo py-8 pr-8 md:p-8 w-8/12 md:w-full md:px-0 md:py-12">
                <Link to={"/"+ (activeLang != null && activeLang != '' ? activeLang +'/' : '') }><img src={env.ASSETS_URL+"/images/Documenta-logo-15.svg"} height="100px" width="auto" /></Link>
            </div>
            <div className="md:flex w-4/12 md:w-full">
                <Nav locale={activeLang} />
                <div className="md:w-3/12 pt-4 md:pt-6 md:ml-16 text-right">
                    <div id="language-switcher" className="text-sm md:text-base block md:inline-block md:px-4 mb-2 md:mb-0">
                        <Link to={uri} onClick={(e) => languageSwitched(e, '', uri)} className="inline-block px-2">HR</Link>
                        |
                        <Link to={"/en"+uriEn} onClick={(e) => languageSwitched(e, 'en', "/en"+uriEn)} className="inline-block px-2">EN</Link>
                    </div>
                    <div id="search-form" className="inline-block mr-2 md:mr-0">
                        <input type="text" placeholder="Pretražite..." name="search" onChange={onFieldChange} onBlur={() => setFormActive(false)} className={formActive === true && "active"} />
                        <div className="img-wr" onClick={openSearch}>
                            <img src={env.ASSETS_URL+"/images/search-icon.svg"} className="block" />
                        </div>
                    </div>
                    <div onClick={mobileTrigger} id="trigger-mobile" className={'inline-block md:hidden px-2 ' + mobileMenuClass}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="border-b-2 border-black"> </div>
        </header>
    );
}

export default withRouter(Header);