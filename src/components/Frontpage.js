import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import WP_API from '../data/Api';
import Sidebar from '../views/partials/Sidebar';
import Article from './Article';
import LoadingPage from './LoadingPage';
import Standard from '../views/Standard';

class Frontpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 10,
            btn_class: 'fa fa-plus-circle',
            sidebar: '',
            searchString: '',
            posts: null,
        };

    }

    componentWillMount() {        
        if(this.props.searchString == '' ) {
            this.getArticles();
        } else if(this.props.searchString != '' && this.props.searchString !== this.state.searchString) {
            this.getArticles();
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.state.per_page !== prevState.per_page ) {
            this.getArticles();
        }
    }

    getArticles() {
        const locale = this.props.match.params.locale;
        let requestLocale = '';
        if(typeof locale !== 'undefined' && locale != '' && locale != null) {
            requestLocale = `&locale=${locale}`
        }

        const api = new WP_API();
        api.get('posts?per_page='+this.state.per_page+'&s='+this.props.searchString + requestLocale, null, true ).then(result => {
            if(result && result != '') { 
                this.setState(state => ({
                    btn_class: 'fa fa-plus-circle',
                    posts: result.posts,
                    sidebar: result.sidebar,
                    searchString: this.props.searchString
                }));
                localStorage.setItem('previousData', JSON.stringify({
                    posts: result.posts,
                    sidebar: result.sidebar,
                    breadcrumbs: result.breadcrumbs,
                }));
            }
        });
    }

    loadMore = () => {
        this.setState(state => ({
            btn_class: 'fa fa-spinner fa-pulse',
            per_page: state.per_page+10
        }));
    }

    render() {
        if(this.state.posts != null) {
            return (
                <main id="content" className="container mx-auto mt-12 mb-24">
                    <div className="md:flex fp-news">
                        <div className="md:w-9/12 md:pr-6">
                            { this.state.posts.length > 0 &&
                                this.state.posts.map((item, i) => {
                                    return <Article item={item} key={i} locale={this.props.match.params.locale} />
                                })
                            }      
                            { this.state.posts.length > 0 &&
                                <button href="#" onClick={ this.loadMore } className="btn btn-arrow mb-8" >
                                    <i className={this.state.btn_class}></i> Učitaj više
                                </button>
                            }
                        </div>
                        <div className="md:w-3/12 md:pl-6">
                            <Sidebar content={ this.state.sidebar } type="frontpage" />
                        </div>
                    </div>
                </main>
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

export default Frontpage;