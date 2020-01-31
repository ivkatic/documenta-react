import React, {Component} from 'react';
import NotFoundPage from '../components/NotFoundPage';
import Page from '../components/Page';
import Post from '../components/Post';
import Category from '../components/Category';
import WP_API from '../data/Api';

class IdentifyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: '',
            component: 'notFound'
        };
    }

    components = {
        post: Post,
        page: Page,
        category: Category,
        notFound: NotFoundPage
    };

    componentDidMount() {
        const api = new WP_API();

        let pathname = this.props.pathname.split('/');
        const slug = pathname.pop() || pathname.pop();

        this.setState({
            slug: slug
        });

        api.get('identify?slug='+ slug, null, true ).then(result => {
            console.log(result);
            if(result && result != '') { 
                this.setState({
                    component: result[0]
                });
            }
        });
    }

    render() {
        if(this.state.component) {
            const Component = this.components[this.state.component] || this.components['notFound'];
            return (
                <Component
                    pathname={this.props.location.pathname}
                />
            );    
        } else {
            return (
                <NotFoundPage />
            )
        }
    }

}

export default IdentifyComponent;