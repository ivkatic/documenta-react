import React, {Component} from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import Breadcrumbs from './partials/Breadcrumbs';
import PostDate from './partials/PostDate';
import RelatedPosts from './partials/RelatedPosts';
import MagnificPopup from '../helpers/MagnificPopup';
import WPCF7 from '../helpers/WPCF7';
import PageHeader from './partials/PageHeader';
import PostDocsLinks from './partials/PostDocsLinks';

class Standard extends Component {
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
        const renderWPCF7 = () => {
            // return WPCF7.code();
            jQuery( 'div.wpcf7 > form' ).each( function() {
                var $form = jQuery( this );
                wpcf7.initForm( $form );
    
                if ( wpcf7.cached ) {
                    wpcf7.refill( $form );
                }
            } );

        }

        return (
            <main id="content" className="container mx-auto mt-12 mb-24">
                <div className="md:flex">
                    <div className="md:w-9/12 md:pr-6">
                        <PageHeader {...this.props} />
                        { this.props.thumb != '' && <div className="mb-6"><img src={this.props.thumb} /></div> }
                        <div 
                            dangerouslySetInnerHTML = {this.createMarkup(
                                this.props.content
                            )}
                        />
                        { this.props.docs != '' && <PostDocsLinks docs={this.props.docs} /> }
                        {/* this.props.type === 'post' && <RelatedPosts postId={ this.props.postId } cats={ this.props.cats } /> */}             
                    </div>
                    <div className="md:w-3/12 md:pl-6">
                        <Sidebar content={ this.props.sidebar } postId={ this.props.postId } type={ this.props.type } />
                    </div>
                </div>
                { renderWPCF7() }
            </main>
        );
    }
}

export default Standard;