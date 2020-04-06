import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: '5px',
    },
    title: {
        flexGrow: 1,
    },
    signUpButton: {
        marginRight: '5px',
    },
};

class Header extends React.PureComponent {
    handleLogin = () => {
        const { onLogin } = this.props;
        onLogin();
    };

    handleSignUp = () => {
        const { onSignUp } = this.props;
        onSignUp();
    };

    render() {
        const { classes, displayName } = this.props;

        const greetingName = displayName ? displayName : 'visitor';

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {`Welcome, ${greetingName}!`}
                        </Typography>
                        <Button
                            className={classes.signUpButton}
                            color="inherit"
                            variant="text"
                            onClick={this.handleSignUp}
                        >
                            Sign Up
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={this.handleLogin}
                        >
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    /**
     * withStyles classes object
     */
    classes: PropTypes.object.isRequired,

    /**
     * Name to display on the header bar
     */
    displayName: PropTypes.string,

    /**
     * Callback function that fires when the user clicks the "Login" button
     */
    onLogin: PropTypes.func.isRequired,

    /**
     * Callback function that fires when the user clicks the "Sign Up" button
     */
    onSignUp: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
