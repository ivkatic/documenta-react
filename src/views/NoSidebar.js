import React, {Component} from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import Breadcrumbs from './partials/Breadcrumbs';
import PostDate from './partials/PostDate';
import RelatedPosts from './partials/RelatedPosts';
import MagnificPopup from '../helpers/MagnificPopup';
import WPCF7 from '../helpers/WPCF7';
import PageHeader from './partials/PageHeader';

class NoSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
        this.createMarkup = this.createMarkup.bind();
    }

    componentDidMount() {
        MagnificPopup.code();
        WPCF7.code();
    }

    createMarkup(html) {
        return {__html: html};
    }

    render() {
        return (
            <main id="content" className="container mx-auto mt-12 mb-24">
                <div className="md:flex">
                    <div className="w-full">
                        <PageHeader {...this.props} />
                        { this.props.thumb != '' && <div className="mb-6"><img src={this.props.thumb} /></div> }
                        <div 
                            dangerouslySetInnerHTML = {this.createMarkup(
                                this.props.content
                            )}
                        />
                        {/* this.props.type === 'post' && <RelatedPosts postId={ this.props.postId } cats={ this.props.cats } /> */}              
                    </div>
                </div>
            </main>
        );
    }
}

export default NoSidebar;