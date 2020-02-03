import React, {Component} from 'react';
import WP_API from '../../data/Api';
import {withRouter} from 'react-router-dom';

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbs: ''
        };
    }

    componentDidMount() {
        if(this.props.breadcrumbs != '') {
            this.setState({
                breadcrumbs: this.props.breadcrumbs
            });
        } else {
            const api = new WP_API();
            api.url = env.SITE_URL +'/wp-json/dx/';
            api.get('breadcrumbs?id='+this.props.postId, null, true ).then(result => {
                if(result && result != '') { 
                    this.setState({
                        breadcrumbs: result
                    });
                }
            });    
        }
    }

    createMarkup = (html) => {
        return {__html: html};
    }

    handleNavigate = (e) => {
        if (e.target.tagName === 'A') {
            const url = e.target.getAttribute('href');

            if(url && url != '') {
                if(url.includes(env.SITE_URL)) {
                    e.preventDefault();
                    let link = url.replace(env.SITE_URL, '');
                    this.props.history.push(link);
                }
            }
        }
    }

    render() {
        if(this.state.breadcrumbs) {
            return (
                <div id="breadcrumbs" className="font-semibold uppercase text-sm" style={{ color: '#d6cdbd' }} >
                    <div 
                        dangerouslySetInnerHTML = {this.createMarkup(
                            this.state.breadcrumbs
                        )}
                        onClick={(e) => this.handleNavigate(e)}
                    />     
                </div>
            );
        } else {
            return <div />;
        }
    }
}

export default withRouter(Breadcrumbs);