import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import WP_API from '../data/Api';
import Standard from '../views/Standard';
import NoSidebar from '../views/NoSidebar';
import LoadingPage from './LoadingPage';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {},
            sidebar: '',
            breadcrumbs: '',
        };
    }

    componentWillMount() {
        const api = new WP_API();

        let pathname = this.props.location.pathname.split('/');
        const slug = pathname.pop() || pathname.pop();

        const locale = this.props.match.params.locale;
        let requestLocale = '';
        if(typeof locale !== 'undefined' && locale != '' && locale != null) {
            requestLocale = `&locale=${locale}`
        }

        api.get('post?type=page&slug='+ slug + requestLocale, null, true ).then(result => {
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
    }

    createMarkup = (html) => {
        return {__html: html};
    }

    render() {
        if(this.state.postData.title) {
            const templ = this.state.postData.template;
            let Template = Standard;

            if(typeof templ !== "undefined" && templ == 'template-no-sidebar.php') {
                Template = NoSidebar;
            }

            return (
                <Template {...this.state} />
            );
        } else {
            const previousData = JSON.parse(localStorage.getItem('previousData'));
            return (
                <div>
                    <LoadingPage />
                    {previousData && <Standard {...previousData} /> }
                </div>
            );
        }
    }
}

export default withRouter(Page);