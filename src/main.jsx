import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BlogsPage from './BlogsPage';
import { LoginPage} from './LoginPage';
import BlogForm from './BlogForm'

export class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={BlogsPage} />
                    <Route exact path='/login' component={LoginPage} />
                    <Route exact path='/blogs' component={BlogsPage} />
                    <Route path='/blogs/new' component={BlogForm} />
                    <Route path='/blog/:_id' component={BlogForm} />
                    <Route path='/blogdelete/:_id' component={BlogsPage} />
                </Switch>
            </main>
        )
    }
}

export default Main