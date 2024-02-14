import React from 'react';
import {Link} from 'react-router-dom';

const ArticleSmall = (props) => {
    let url = props.item.url.replace(env.SITE_URL, '');
    return (
        <article className="mb-16" key={props.item.id}>
            { props.item.thumb != '' && <div className="mb-8"><Link to={{ pathname: url }}><img className="m-auto" src={props.item.thumb} /></Link></div> }
            <h4><Link to={{ pathname: url }} className="text-gray-800 font-bold">{props.item.title}</Link></h4>
            <Link to={{ pathname: url }} className="read-more-btn">Read more</Link>
        </article>
    )
}

import React from 'react';
import {Link} from 'react-router-dom';

const ArticleSmall = (props) => {
    let url = props.item.url.replace(env.SITE_URL, '');
    return (
        <article className="mb-16" key={props.item.id}>
            { props.item.thumb != '' && <div className="mb-8"><Link to={{ pathname: url }}><img className="m-auto" src={props.item.thumb} /></Link></div> }
            <h4><Link to={{ pathname: url }} className="text-gray-800 font-bold">{props.item.title}</Link></h4>
            <Link to={{ pathname: url }} className="read-more-btn">Read more</Link>
        </article>
    )
}

export default ArticleSmall;