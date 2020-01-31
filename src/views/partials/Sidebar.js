import React, {Component} from 'react';
import WP_API from '../../data/Api';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: ''
        };
        this.createMarkup = this.createMarkup.bind();
    }

    componentDidMount() {
        if(this.props.content != '') {
            this.setState({
                sidebar: this.props.content
            });
        } else {
            const api = new WP_API();
            api.get(`sidebar?type=${this.props.type}&id=${this.props.postId}` ).then(result => {
                // console.log(result);
                if(result && result != '') { 
                    this.setState({
                        sidebar: result
                    });
                }
            });
        }
    }

    createMarkup(html) {
        return {__html: html};
    }

    render() {
        if(this.state.sidebar) {
            return (
                <aside id="sidebar" className="text-center md:text-left">
                    <div 
                        dangerouslySetInnerHTML = {this.createMarkup(
                            this.state.sidebar
                        )}
                    />                     
                </aside>
            );
        } else {
            return <div />;
        }
    }
}

export default Sidebar;