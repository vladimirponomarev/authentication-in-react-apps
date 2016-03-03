import React from 'react';
import {Link} from 'react-router';
import {Card, CardTitle, CardText, RaisedButton, TextField} from 'material-ui';
import Auth from '../modules/Auth';


class LoginForm extends React.Component {

  /**
   * Class constructor.
   */
  constructor() {
    super();

    let successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errorMessage: '',
      successMessage: successMessage,
      errors: {}
    };
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submit event
    event.preventDefault();

    let self = this;
    let history = this.props.history;

    // create a string for an HTTP body message
    let user = 'email=' + encodeURIComponent(this.refs.email.getValue())
             + '&password=' + encodeURIComponent(this.refs.password.getValue());


    // create an AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.onload = function() {
      let state = {};

      if (this.status == 200) {
        // success

        state.errorMessage = '';
        state.errors = {};

        // change the component state
        self.setState(state);

        // save the token
        Auth.authenticateUser(this.response.token);

        // change the current URL to /
        history.replaceState(null, '/');
      } else {
        // failure

        state.errorMessage = this.response.message;
        state.errors = this.response.errors ? this.response.errors : {};

        // change the component state
        self.setState(state);

      }
    };
    xhr.send(user);
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <Card className="container">
        <form action="/" onSubmit={this.processForm.bind(this)}>
          <h2 className="card-heading">Login</h2>

          {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
          {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}

          <div className="field-line">
            <TextField ref="email" floatingLabelText="Email" errorText={this.state.errors.email} />
          </div>

          <div className="field-line">
            <TextField ref="password" floatingLabelText="Password" type="password" errorText={this.state.errors.password} />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Log in" primary={true} />
          </div>

          <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link></CardText>
        </form>
      </Card>
    );
  }

}

export default LoginForm;
