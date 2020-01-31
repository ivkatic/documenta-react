import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import PostDate from './PostDate';

const PageHeader = (props) => {
    return (
        <header className="page-header bg-primary p-6 pt-2 pb-10">
            {props.breadcrumbs != '' && <Breadcrumbs { ...props } />}
            <h1 className="text-gray-900 md:pl-12 mt-8 mb-2">{ props.title }</h1>
            { props.type === 'post' &&
                <div className="md:pl-12 text-gray-300">
                    <PostDate date={props.date} />
                </div>
            }
        </header>
    );
}

export default PageHeader;