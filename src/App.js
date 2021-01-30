import React, { PureComponent } from 'react';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/pages/ToDo';
import SingleTask from './components/pages/SingleTask';
import NotFound from './components/pages/NotFound/NotFound';
import Spinner from './components/Spinner/Spinner';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import About from './components/pages/About';
import Contact from './components/pages/Contact/Contact';
import Profile from './components/pages/Profile/Profile';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import CustomRoute from './components/CustomRoute';

class App extends PureComponent {

  componentDidUpdate() {
    const { taskErrorMessage, taskSuccessMessage, authErrorMessage, authSuccessMessage } = this.props;
    if (taskErrorMessage) {
      toast.error(taskErrorMessage);
    }
    if (taskSuccessMessage) {
      toast.success(taskSuccessMessage);
    }

    if (authErrorMessage) {
      toast.error(authErrorMessage);
    }
    if (authSuccessMessage) {
      toast.success(authSuccessMessage);
    }
  }

  render() {
    const { showTaskSpinner, showAuthSpinner } = this.props;

    return (
      <>
        <div className='app'>
          <NavMenu />
          <div className="content py-3 p-sm-4">

            <Switch>
              <CustomRoute type='private' path='/' exact component={ToDo} />
              <CustomRoute type='private' path='/task/:id' exact component={SingleTask} />
              <Route path='/not-found' exact component={NotFound} />
              <CustomRoute path='/register' exact component={Register} />
              <CustomRoute path='/login' exact component={Login} />
              <Route path='/about' exact component={About} />
              <Route path='/contact' exact component={Contact} />
              <CustomRoute type='private' path='/profile' exact component={Profile} />
              <Redirect to='/not-found' />
            </Switch>
          </div>

          <Footer />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
        { (showTaskSpinner || showAuthSpinner) && <Spinner />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    taskErrorMessage: state.taskReducer.error,
    taskSuccessMessage: state.taskReducer.successMessage,
    showTaskSpinner: state.taskReducer.loading,
    authErrorMessage: state.authReducer.error,
    authSuccessMessage: state.authReducer.successMessage,
    showAuthSpinner: state.authReducer.loading
  }
};

export default connect(mapStateToProps)(App);
