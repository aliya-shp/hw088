import React, {Component} from 'react';
import {Container} from "reactstrap";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {logoutUser} from "./store/actions/usersActions";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import Posts from "./containers/Posts/Posts";
import NewPost from "./containers/NewPost/NewPost";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import PostPage from "./containers/PostPage/PostPage";

class App extends Component {
  render() {
    return (
        <>
          <header>
            <Toolbar
                user={this.props.user}
                logout={this.props.logoutUser}
            />
          </header>
          <Container style={{marginTop: '20px'}}>
            <Switch>
              <Route path="/" exact component={Posts}/>
              <Route path="/posts/new" exact component={NewPost}/>
              <Route path="/post/:id" exact component={PostPage}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/login" exact component={Login}/>
            </Switch>
          </Container>
        </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));