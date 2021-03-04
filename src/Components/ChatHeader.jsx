import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title} = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

ChatHeader.propTypes = {
  title: PropTypes.string,
};