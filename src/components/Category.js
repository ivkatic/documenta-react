import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import WP_API from '../data/Api';
import Sidebar from '../views/partials/Sidebar';
import Article from '../components/Article';
import PageHeader from '../views/partials/PageHeader';
import LoadingBar from 'react-top-loading-bar';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 10,
            btn_class: 'fa fa-plus-circle',
            posts: null,
            sidebar: '',
            breadcrumbs: '',
            loadingBarProgress: 0
        };
        this.getArticles = this.getArticles.bind(this);
        this.loadMore = this.loadMore.bind(this);

        const pathname = this.props.location.pathname.split('/');
        this.slug = pathname.pop() || pathname.pop(); 
    }

    componentDidMount() {
        this.getArticles();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.per_page !== prevState.per_page) {
            this.getArticles();
        }
    }

    getArticles() {
        this.LoadingBar.continuousStart();

        const locale = this.props.match.params.locale;
        let requestLocale = '';
        if(typeof locale !== 'undefined' && locale != '' && locale != null) {
            requestLocale = `&locale=${locale}`
        }

        const api = new WP_API();
        api.get(`posts?per_page=${this.state.per_page}&category=${this.slug}${requestLocale}`, null, true ).then(result => {
            if(result && result != '') { 
                this.setState(state => ({
                    btn_class: 'fa fa-plus-circle',
                    posts: result.posts,
                    sidebar: result.sidebar,
                    breadcrumbs: result.breadcrumbs
                }));
            }
        });
        this.LoadingBar.complete();
    }

    loadMore() {
        this.setState(state => ({
            btn_class: 'fa fa-spinner fa-pulse',
            per_page: state.per_page+10
        }));
    }

    render() {
        if(this.state.posts != null) {
            return (
                <main id="content" className="category-list container mx-auto mt-12 mb-24">
                    <div className="md:flex fp-news">
                        <div className="md:w-9/12 md:pr-6">
                            <PageHeader title={this.state.posts.length > 0 ? this.state.posts[0].cats[0].name : this.slug} breadcrumbs={this.state.breadcrumbs} />
                            { this.state.posts.length > 0 &&
                                this.state.posts.map((item, i) => {
                                    return <Article item={item} key={i} />
                                })
                            }      
                            { this.state.posts.length > 0 &&
                                <button href="#" onClick={this.loadMore} className="btn btn-arrow mb-8" >
                                    <i className={this.state.btn_class}></i> Učitaj više
                                </button>
                            }
                        </div>
                        <div className="md:w-3/12 md:pl-6">
                            <Sidebar postId="" type="novosti" content={this.state.sidebar} />
                        </div>
                    </div>
                </main>
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

export default Category;