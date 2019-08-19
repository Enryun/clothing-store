import React from 'react';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInUp from './pages/sign-in-up/sign-in-up';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import CheckOutPage from './pages/checkout/checkout.component.jsx';
import {checkUserSession} from './redux/user/user.action';

import {GlobalStyle} from './global.styles';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <GlobalStyle/>
          <Header/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckOutPage} />
            <Route exact 
                  path='/signin' 
                  render={() => 
                    this.props.currentUser ? (<Redirect to='/' />): (<SignInUp/>) }/>
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
