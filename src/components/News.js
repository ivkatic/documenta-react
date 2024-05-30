import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import WP_API from '../data/Api';
import Sidebar from '../views/partials/Sidebar';
import Article from '../components/Article';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 10,
            posts: {}
        };
        this.getArticles = this.getArticles.bind(this);
        this.loadMore = this.loadMore.bind(this);
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
        const api = new WP_API();
        api.get('posts?per_page='+this.state.per_page, null, true ).then(result => {
            if(result && result != '') { 
                this.setState({
                    posts: result
                });
            }
        });
    }

    loadMore() {
        this.setState(state => ({
            per_page: state.per_page+10
        }));
    }

    render() {
        return (
            <main id="content" className="container mx-auto mt-12 mb-24">
                <div className="mb-12 w-full text-3xl"><h4>Novosti</h4></div>
                <div className="md:flex fp-news">
                    <div className="md:w-9/12 md:pr-6">
                        { this.state.posts.length > 0 &&
                            this.state.posts.map((item, i) => {
                                return <Article item={item} key={i} />
                            })
                        }      
                        <button href="#" onClick={this.loadMore} className="btn" >Učitaj više</button>
                    </div>
                    <div className="md:w-3/12 md:pl-6">
                        <Sidebar postId="" type="archive_posts" />
                    </div>
                </div>
            </main>
        )
    }
}

export default News;