import React from 'react';
import { Link } from 'react-router-dom';
import Standard from '../views/Standard';

const NotFoundPage = () => (
    <Standard {...{
        title: '404',
        content: 'Ooops Not Found',
    }} />
);

export default NotFoundPage;
