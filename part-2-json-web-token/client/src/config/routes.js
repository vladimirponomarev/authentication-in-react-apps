import Base from '../components/Base.jsx';
import Home from '../components/Home.jsx';
import Dashboard from '../components/Dashboard.jsx';
import LoginForm from '../components/LoginForm.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import Auth from '../modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Dashboard);
        } else {
          callback(null, Home);
        }
      }
    },

    {
      path: '/login',
      component: LoginForm
    },

    {
      path: '/signup',
      component: SignUpForm
    },

    {
      path: '/logout',
      onEnter: (nextState, replaceState) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replaceState(null, '/');
      }
    }

  ]
};

export default routes;
