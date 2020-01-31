import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class PublicRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            locale: ''
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        let Component = this.props.component;
        let content = (<div>
            <div id="bg-overlay"><img src={env.ASSETS_URL+"/images/BG.svg"} /></div>
                <Header handleChange={this.handleChange.bind(this)} />
                <Route {...this.props} component={this.props = (props) => {
                    return (<Component {...props} searchString={this.state.searchString} />);
                } } />
                <Footer />
            </div>
        );

        return content;
    }
   
    handleChange(value) {
        this.setState({
            searchString: value,
        });
    }
}


export default PublicRoute;