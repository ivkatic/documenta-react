import React from 'react';

const PostDocsLinks = (props) => {
    if(typeof props.docs === 'undefined') {
        return null;
    }
    return (
        <div>
        { Object.keys(props.docs).length !== 0 && props.docs.constructor === Object != 0 > 0 && 
            Object.keys(props.docs).map((key, i) => {
                let item = props.docs[key];
                let icon = 'DOC';
                if(item.url.indexOf('.pdf') != -1) {
                    icon = 'PDF';
                } else if(item.url.indexOf('.doc')) {
                    icon = 'DOC';
                }
                return (
                    <div key={i} className="doc-link mt-4">
                        <a href={item.url} target="_blank">
                            <span><i className="fa fa-file-pdf-o"></i> { icon }</span>
                            <span>{ item.name }</span>
                        </a>
                    </div>
                )
            })
        }
        </div>
    )
}

export default PostDocsLinks;