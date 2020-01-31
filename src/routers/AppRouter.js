import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Frontpage from '../components/Frontpage';
import Programs from '../components/Programs';
import NotFoundPage from '../components/NotFoundPage';
import IdentifyComponent from '../helpers/IdentifyComponent';
import PublicRoute from './PublicRoute';
import Page from '../components/Page';
import Post from '../components/Post';
import News from '../components/News';
import Program from '../components/Program';
import Category from '../components/Category';
import ScrollToTop from './ScrollToTop';

export const history = createHistory();

const getLanguage = () => {
    return '';
}

const AppRouter = () => {

    return (
        <Router history={history} >
            <ScrollToTop>
                <Switch>
                    <PublicRoute path="/:locale(hr|en)?/" component={Frontpage} exact={true} />
                    <PublicRoute path="/:locale(hr|en)?/programi/:slug" component={Program} exact={true} />
                    <PublicRoute path="/:locale(hr|en)?/novosti/" component={News} exact={true} />
                    <PublicRoute path="/:locale(hr|en)?/(novosti|news)/:slug" component={Post} exact={true} />
                    <PublicRoute path="/:locale(hr|en)?/(kategorija|category)/:slug" component={Category} exact={true} />
                    <PublicRoute path="/:locale(hr|en)?/:slug" component={Page} />
                    <PublicRoute component={NotFoundPage} />
                </Switch>
            </ScrollToTop>
        </Router>
    );
};

export default AppRouter;
