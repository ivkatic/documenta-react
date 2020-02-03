import React from 'react';
import { Route, Redirect, withRouter, browserHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class PublicRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            locale: ''
        };
        // this.handleNavigate = this.handleNavigate.bind(this);
    }

    render() {
        const savedLocale = localStorage.getItem('documenta_locale');
        let pathname = this.props.location.pathname;
        if(savedLocale && savedLocale == 'en' && !pathname.includes('/en/')) {
            return <Redirect to={'/en'+pathname} />
        }
        
        let Component = this.props.component;
        return (
            <div>
                <div id="bg-overlay"><img src={env.ASSETS_URL+"/images/BG.svg"} /></div>
                <Header handleChange={this.handleChange.bind(this)} />
                <Route {...this.props} component={this.props = (props) => {
                    return (<Component {...props} searchString={this.state.searchString} />);
                } } />
                <Footer />
            </div>
        );
    }
   
    handleChange(value) {
        this.setState({
            searchString: value,
        });
    }
}


export default withRouter(PublicRoute);