import React, {Component} from 'react';
import Moment from 'react-moment';

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }


    render() {
        if(this.props.date) {
            return (
                <Moment locale="hr" format="DD. MMMM YYYY HH:mm">{ this.props.date }</Moment>
            );
        } else {
            return <div />;
        }
    }
}

export default Breadcrumbs;