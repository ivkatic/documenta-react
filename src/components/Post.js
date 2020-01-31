import React, {Component} from 'react';
import WP_API from '../data/Api';
import Standard from '../views/Standard';
import NotFoundPage from './NotFoundPage';
// import LoadingBar from 'react-top-loading-bar';
import LoadingPage from './LoadingPage';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {},
            sidebar: '',
            breadcrumbs: '',
            loadingBarProgress: 0
        };
        this.createMarkup = this.createMarkup.bind();
    }

    componentWillMount() {     
        // this.LoadingBar.continuousStart();
        const api = new WP_API();
        
        let pathname = this.props.location.pathname.split('/');
        const slug = pathname.pop() || pathname.pop();

        const locale = this.props.match.params.locale;
        let requestLocale = '';
        if(typeof locale !== 'undefined' && locale != '' && locale != null) {
            requestLocale = `&locale=${locale}`
        }

        api.get('post?slug='+ slug +requestLocale, null, true ).then(result => {
            // console.log(result);
            if(result && result != '') { 
                this.setState({
                    postData: result.post,
                    sidebar: result.sidebar,
                    breadcrumbs: result.breadcrumbs
                });
                localStorage.setItem('previousData', JSON.stringify({
                    postData: result.post,
                    sidebar: result.sidebar,
                    breadcrumbs: result.breadcrumbs
                }));
            }
        });
        // this.LoadingBar.complete();
    }

    createMarkup(html) {
        return {__html: html};
    }

    render() {
        if(this.state.postData.title) {
            return (
                <Standard {...this.state.postData} sidebar={this.state.sidebar} breadcrumbs={this.state.breadcrumbs}  />
            );
        } else {
            return (
                <LoadingPage/>
            );
        }
    }
}

export default Post;