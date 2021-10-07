import React from 'react';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom';
import About from '../pages/About';
import PostIdPage from '../pages/PostIdPage';
import Posts from "../pages/Posts";

const AppRouter = () => {
    return (
        <Switch>
            <Route path='/about'>
               <About/>
            </Route>
            <Route exact path='/posts'>
                <Posts/>
            </Route>
            <Route path='/posts/:id'>
                <PostIdPage/>
            </Route>
            <Redirect to='/posts' />
      </Switch>
    );
};

export default AppRouter;