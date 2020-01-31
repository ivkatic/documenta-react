import React, {Component} from 'react';
import WP_API from '../../data/Api';

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbs: ''
        };
        this.createMarkup = this.createMarkup.bind();
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
                // console.log(result);
                if(result && result != '') { 
                    this.setState({
                        breadcrumbs: result
                    });
                }
            });    
        }
    }

    createMarkup(html) {
        return {__html: html};
    }

    render() {
        if(this.state.breadcrumbs) {
            return (
                <div id="breadcrumbs" className="font-semibold uppercase text-sm" style={{ color: '#d6cdbd' }} >
                    <div 
                        dangerouslySetInnerHTML = {this.createMarkup(
                            this.state.breadcrumbs
                        )}
                    />     
                </div>
            );
        } else {
            return <div />;
        }
    }
}

export default Breadcrumbs;