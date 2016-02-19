import React from 'react';
import {Link, IndexLink} from 'react-router';


class Base extends React.Component {

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <IndexLink to="/">React App</IndexLink>
          </div>

          <div className="top-bar-right">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>

        </div>

        { /* child component will be rendered here */ }
        {this.props.children}

      </div>
    );
  }

}

export default Base;
