import React from 'react';
import {Link} from 'react-router';
import {Card, CardTitle, CardText, RaisedButton, TextField} from 'material-ui';


class LoginForm extends React.Component {

  /**
   * Class constructor.
   */
  constructor() {
    super();

    // set the initial component state
    this.state = {
      errorMessage: '',
      errors: {}
    };
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    let self = this;

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

        console.log("The form is valid");
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

          <CardTitle title="Login with Email" />

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

          <CardText>Don't have an account? <Link to={`/signup`}>Create one</Link></CardText>
        </form>
      </Card>
    );
  }

}

export default LoginForm;
