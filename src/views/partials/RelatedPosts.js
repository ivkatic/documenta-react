import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import WP_API from '../../data/Api';
import ArticleSmall from './ArticleSmall';

class RelatedPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 2,
            posts: {}
        };
    }

    componentDidMount() {
        this.getRelated();
    }

    getRelated() {
        const api = new WP_API();
        let cat = typeof this.props.cats !== "undefined" && this.props.cats.length > 0 ? this.props.cats[0].slug : '';
        api.get('posts?per_page='+this.state.per_page+'&post__not_in='+this.props.postId+'&category='+cat, null, true ).then(result => {
            if(result && result != '') { 
                this.setState({
                    posts: result
                });
            }
        });
    }


    render() {
        return (
            <div className="related-posts border-t border-primary mt-8">
                <h4 className="text-primary mt-4 mb-12 font-semibold">Povezani članci</h4>
                <div className="md:flex">
                { this.state.posts.length > 0 &&
                    this.state.posts.map((item, i) => {
                        return <div className="md:w-1/2 px-8" key={i} ><ArticleSmall item={item} /></div>
                    })
                }      
                </div>
            </div>
        )
    }
}

export default RelatedPosts;