import React, {lazy, Suspense} from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header.component';

import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';

import {checkUserSession} from './redux/user/user.action';
import Footer from './components/footer/footer.component';

import {GlobalStyle} from './global.styles';

import Spinner from './components/spinner/spinner.component';
import ErrorComponent from './components/error/error.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInUp = lazy(() => import('./pages/sign-in-up/sign-in-up'));
const CheckOutPage = lazy(() => import('./pages/checkout/checkout.component.jsx'));


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
            <ErrorComponent>
              <Suspense fallback={<Spinner />}>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={ShopPage} />
                <Route exact path='/checkout' component={CheckOutPage} />
                <Route exact 
                      path='/signin' 
                      render={() => 
                        this.props.currentUser ? (<Redirect to='/' />): (<SignInUp/>) }/>
              </Suspense>
            </ErrorComponent>
          </Switch>
          <Footer />
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
