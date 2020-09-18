import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import WP_API from '../data/Api';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {},
            lang: ''
        };
        this.getMenu();
    }

    getMenu() {
        const locale = this.props.locale;
        let requestLocale = '';
        if(typeof locale !== 'undefined' && locale != '' && locale != null) {
            this.setState({
                lang: locale
            });
            requestLocale = `&locale=${locale}`
        }

        const api = new WP_API();
        api.url = env.SITE_URL +'/wp-json/dx/';
        api.get('menu?slug=main'+requestLocale, null, true, true).then(result => {
            if(result && result != '') { 
                this.setState({
                    menu: result
                });
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.locale !== prevProps.locale) {
            this.getMenu();  
        }
    }

    render() {
        if(this.state.menu) {
            let menuItems = [];

            if(this.state.menu.length !== 0 && this.state.menu.constructor === Array != 0) {
                menuItems = this.state.menu.map((item, key) => {
                    // let item = this.state.menu[key];
                    let pathname = item.url.replace(env.SITE_URL, '');
                    let subItems = [];
                    let hasChildren = '';
                    
                    if(item.object == 'post' && this.state.lang == '') {
                        pathname = `/novosti${pathname}`;
                    }
                    
                    if(item.children.constructor === Array != 0 && item.children.length !== 0) {
                        hasChildren = 'has-children';

                        subItems = (
                            <ul className="submenu" key={ key + 'sub' } >
                            { item.children.map((itemSub, subI) => {
                                // let itemSub = item.children[i];
                                let pathnameSub = itemSub.url.replace(env.SITE_URL, '');
                                let subSubItems = [];

                                if(itemSub.children.constructor === Array != 0 && itemSub.children.length !== 0) {
                                    subSubItems = (
                                        <ul className="submenu" key={ key + 'subsub' } >
                                        { itemSub.children.map((itemSubSub, subSubI) => {
                                            // let itemSubSub = itemSub.children[keySubSub];
                                            let pathnameSubSub = itemSubSub.url.replace(env.SITE_URL, '');
            
                                            return (
                                                <li className="menu-item sub-item" key={subSubI}>
                                                    <NavLink to={{ pathname: pathnameSubSub, state: { } }}  className="px-6 py-3">{itemSubSub.title}</NavLink>
                                                </li>
                                            )
                                        }) }
                                        </ul>
                                    );
                                } 
            
                                return (
                                    <li className="menu-item sub-item" key={subI}>
                                        <NavLink to={{ pathname: pathnameSub, state: { } }}  className="px-6 py-3">{itemSub.title}  { React.isValidElement(subSubItems) && 
                                            <i className="fas fa-caret-right ml-2"></i>
                                        }</NavLink>
                                        { React.isValidElement(subSubItems) &&
                                            subSubItems
                                        }
                                    </li>
                                )
                            }) }
                            </ul>
                        );
                    } 

                    return (
                        <li className={"menu-item inline-block "+ hasChildren} key={key}>
                            <NavLink exact to={{ pathname: pathname, state: { } }}  className="px-8 py-4 block" activeClassName="current-menu-item">
                                {item.title} 
                                { React.isValidElement(subItems) && 
                                    <i className="fas fa-caret-down ml-2"></i>
                                }
                            </NavLink>
                            { React.isValidElement(subItems) &&
                                subItems
                            }
                        </li>
                    );
                
                });
            }

            return(
                <nav className={"main md:mt-4 md:-mx-8 font-semibold uppercase hidden md:block md:w-9/12 "}>
                    <ul className="main" key="mainUl">
                        { menuItems }
                    </ul>         
                </nav>
            );
        } else {
            return <div />;
        }
    }
}

export default Nav;