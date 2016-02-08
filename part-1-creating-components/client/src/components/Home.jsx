import React from 'react';
import {Card, CardTitle} from 'material-ui';
import {Link} from 'react-router';


class Home extends React.Component {

  /**
   * Render the component.
   */
  render() {
    return (
      <Card className="container">
        <CardTitle title="React Application" subtitle="This is the home page." />

        <nav>
          <Link to={'/login'}>Log in</Link>
          <Link to={'/signup'}>Sign up</Link>
        </nav>
      </Card>
    );
  }

}

export default Home;
