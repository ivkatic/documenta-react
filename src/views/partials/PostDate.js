import React from 'react';
import Moment from 'react-moment';

const PostDate = (props) => {
    if(props.date) {
        return (
            <Moment locale="hr" format="DD. MMMM YYYY HH:mm">{ props.date }</Moment>
        );
    } else {
        return <div />;
    }
}

export default PostDate;