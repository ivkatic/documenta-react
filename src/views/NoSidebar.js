import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import MagnificPopup from '../helpers/MagnificPopup';
import WPCF7 from '../helpers/WPCF7';
import PageHeader from './partials/PageHeader';
import PostDocsLinks from './partials/PostDocsLinks';

class NoSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    componentDidMount() {
        MagnificPopup.code();
        WPCF7.code();
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
        return (
            <main id="content" className="container mx-auto mt-12 mb-24">
                <div className="md:flex">
                    <div className="w-full">
                        <PageHeader {...this.props} />
                        { this.props.postData && this.props.postData.thumb != '' && <div className="mb-6"><img src={this.props.postData.thumb} /></div> }
                        { this.props.postData && <div 
                            dangerouslySetInnerHTML = {this.createMarkup(
                                this.props.postData.content
                            )}
                            onClick={(e) => this.handleNavigate(e)}
                        />}
                        { this.props.postData && this.props.postData.docs != '' && <PostDocsLinks docs={this.props.postData.docs} /> }
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(NoSidebar);