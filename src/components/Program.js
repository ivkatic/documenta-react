import React, {Component} from 'react';
import WP_API from '../data/Api';
import Standard from '../views/Standard';
import NotFoundPage from './NotFoundPage';
import LoadingBar from 'react-top-loading-bar';

class Program extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {}
        };
        this.createMarkup = this.createMarkup.bind();
    }

    componentDidMount() {
        this.LoadingBar.continuousStart();
        const api = new WP_API();
        
        let pathname = this.props.location.pathname.split('/');
        const slug = pathname.pop() || pathname.pop();

        api.get('post?type=program&slug='+ slug, null, true ).then(result => {
            if(result && result != '') { 
                this.setState({
                    postData: result
                });
            }
        });
        this.LoadingBar.complete();
    }

    createMarkup(html) {
        return {__html: html};
    }

    render() {
        if(this.state.postData.title) {
            return (
                <Standard {...{
                    postId: this.state.postData.id,
                    type: this.state.postData.type,
                    content: this.state.postData.content,
                    title: this.state.postData.title,
                    date: this.state.postData.date
                }} />
            );
        } else {
            return (
                <LoadingBar
                    height={3}
                    color='#B2A388'
                    onRef={ref => (this.LoadingBar = ref)}
                />
            );
        }
    }
}

export default Program;