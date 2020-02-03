import React, {Component} from 'react';
import WP_API from '../../data/Api';
import { useHistory, withRouter } from "react-router-dom";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: ''
        };
    }

    componentWillMount() {
        if(this.props.content != '') {
            this.setState({
                sidebar: this.props.content
            });
        } else {
            const api = new WP_API();
            api.get(`sidebar?type=${this.props.type}&id=${this.props.postId}` ).then(result => {
                if(result && result != '') { 
                    this.setState({
                        sidebar: result
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
        if(this.state.sidebar) {
            return (
                <aside id="sidebar" className="text-center md:text-left">
                    <div 
                        dangerouslySetInnerHTML = {this.createMarkup(
                            this.state.sidebar
                        )}
                        onClick={(e) => this.handleNavigate(e)}
                    />                     
                </aside>
            );
        } else {
            return <div />;
        }
    }
}

export default withRouter(Sidebar);