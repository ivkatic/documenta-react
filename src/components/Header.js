import React from 'react';
import Nav from './Nav';
import { useHistory, withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            formActive: false,
            mobileMenuActive: false,
            mobileMenuClass: '',
            activeLang: localStorage.getItem('documenta_locale')
        }        
        
        this.timer = 0;
    }

    onFieldChange = (event) => {
        // for a regular input field, read field name and value from the event
        this.setState({searchString: event.target.value});     
        if(this.timer) {
            clearTimeout(this.timer);
        }
        
        this.timer = setTimeout(() => {
            this.props.handleChange(this.state.searchString);
            this.props.history.push('/');
        }, 1000);

    }

    openSearch = (e) => {
        this.setState(state => ({
            formActive: !state.formActive 
        }));
    }

    mobileTrigger = (e) => {
        this.setState(state => ({
            mobileMenuActive: !state.mobileMenuActive,
            mobileMenuClass: !state.mobileMenuActive == true ? 'mobile-active' : ''
        }));

        if(!this.state.mobileMenuActive == true) {
            document.documentElement.classList.add('mobile-active');
        } else {
            document.documentElement.classList.remove('mobile-active');
        }
    }

    languageSwitched = (e, lng, link) => {
        e.preventDefault();
        this.setState({
            activeLang: lng
        });
        localStorage.setItem('documenta_locale', lng);
        this.props.history.push(link);
    }

    render() {
        let uri = this.props.location.pathname.replace('/en/', '/');
        let uriEn = this.props.location.pathname.replace('/en/', '/');

        uriEn = uriEn.replace('novosti', 'news');
        uriEn = uriEn.replace('kategorija', 'category');

        uri = uri.replace('news', 'novosti');
        uri = uri.replace('category', 'kategorija');
        
        return (
            <header className={"container mx-auto flex md:block " + this.state.mobileMenuClass }>
                <div className="logo py-8 pr-8 md:p-8 w-8/12 md:w-full md:px-0 md:py-12">
                    <Link to={"/"+ (this.state.activeLang != null && this.state.activeLang != '' ? this.state.activeLang +'/' : '') }><img src={env.ASSETS_URL+"/images/Documenta-logo-15.svg"} height="100px" width="auto" /></Link>
                </div>
                <div className="md:flex w-4/12 md:w-full">
                    <Nav locale={this.state.activeLang} />
                    <div className="md:w-3/12 pt-4 md:pt-6 md:ml-16 text-right">
                        <div id="language-switcher" className="text-sm md:text-base block md:inline-block md:px-4 mb-2 md:mb-0">
                            <Link to={uri} onClick={(e) => this.languageSwitched(e, '', uri)} className="inline-block px-2">HR</Link>
                            |
                            <Link to={"/en"+uriEn} onClick={(e) => this.languageSwitched(e, 'en', "/en"+uriEn)} className="inline-block px-2">EN</Link>
                        </div>
                        <div id="search-form" className="inline-block mr-2 md:mr-0">
                            <input type="text" ref={this.searchFormRef} placeholder="Pretražite..." name="search" onChange={this.onFieldChange} onBlur={() => this.setState({formActive: false})} className={ this.state.formActive === true && "active" } />
                            <div className="img-wr" onClick={ this.openSearch } >
                                <img src={env.ASSETS_URL+"/images/search-icon.svg"} className="block" />
                            </div>
                        </div>
                        <div onClick={ this.mobileTrigger } id="trigger-mobile" className={'inline-block md:hidden px-2 ' + this.state.mobileMenuClass } >
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
}

export default withRouter(Header);