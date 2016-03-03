import React from 'react';
import {Link} from 'react-router';
import {Card, CardTitle, CardText, RaisedButton, TextField} from 'material-ui';


class SignUpForm extends React.Component {

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
    let history = this.props.history;

    // create a string for an HTTP body message
    let user = 'name=' + encodeURIComponent(this.refs.name.getValue())
             + '&email=' + encodeURIComponent(this.refs.email.getValue())
             + '&password=' + encodeURIComponent(this.refs.password.getValue());

    // create an AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
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

        // set a message
        localStorage.setItem('successMessage', this.response.message);

        // change the current URL to /
        history.replaceState(null, '/login');
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
          <h2 className="card-heading">Sign Up</h2>

          {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}

          <div className="field-line">
            <TextField ref="name" floatingLabelText="Name" errorText={this.state.errors.name} />
          </div>

          <div className="field-line">
            <TextField ref="email" floatingLabelText="Email" errorText={this.state.errors.email} />
          </div>

          <div className="field-line">
            <TextField ref="password" floatingLabelText="Password" type="password" errorText={this.state.errors.password} />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Create New Account" primary={true} />
          </div>

          <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
        </form>
      </Card>
    );
  }

}

export default SignUpForm;
