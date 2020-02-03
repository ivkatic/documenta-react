import React from 'react';
import {Link} from 'react-router-dom';

const ArticleSmall = (props) => {
    let url = this.props.item.url.replace(env.SITE_URL, '');
    return (
        <article className="mb-16" key={this.props.item.id}>
            { this.props.item.thumb != '' && <div className="mb-8"><Link to={{ pathname: url }}><img className="m-auto" src={this.props.item.thumb} /></Link></div> }
            <h4><Link to={{ pathname: url }} className="text-gray-800 font-bold">{this.props.item.title}</Link></h4>
        </article>
    )
}

export default ArticleSmall;