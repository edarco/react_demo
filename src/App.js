import React, { PureComponent } from 'react';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/pages/ToDo';
import SingleTask from './components/pages/SingleTask';
import NotFound from './components/pages/NotFound';
import Spinner from './components/Spinner/Spinner';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

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
          <Switch>
            <Route path='/' exact component={ToDo} />
            <Route path='/task/:id' exact component={SingleTask} />
            <Route path='/not-found' exact component={NotFound} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Redirect to='/not-found' />
          </Switch>
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

}

export default connect(mapStateToProps, null)(App);
