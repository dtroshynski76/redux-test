import React from 'react';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import { getJS } from '../../constants/functions';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { setUsername } from '../../redux/actions/userActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import { closeSignInDialog } from '../../redux/actions/dialogActions';

const styles = () => ({
    alert: {
        marginBottom: '5px',
    },
});

const initState = {
    username: '',
    touchedUsernameField: false,
    password: '',
    touchedPasswordField: false,
    showPassword: false,
    invalidCredentials: false,
};

class SignIn extends React.PureComponent {
    static propTypes = {
        /**
         * from redux store; defines whether the dialog is open or not
         */
        isOpen: PropTypes.bool,

        /**
         * redux action
         */
        closeSignInDialog: PropTypes.func.isRequired,

        /**
         * from redux store; array of valid user objects, each with a 'username' and 'password' field
         */
        validUsers: PropTypes.array.isRequired,

        /**
         * redux action; sets the currently logged in users' username
         */
        setUsername: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = initState;
    }

    handleCancel = () => {
        const { closeSignInDialog } = this.props;

        this.setState(initState);
        closeSignInDialog();
    };

    handleSignIn = () => {
        const { username, password } = this.state;
        const { validUsers, setUsername } = this.props;

        const hashedPassword = CryptoJS.SHA256(password).toString(
            CryptoJS.enc.Hex
        );

        const isValidCredentials = validUsers.find(
            (user) =>
                user.username === username && user.password === hashedPassword
        );

        if (isValidCredentials) {
            console.log(
                `signed in with username '${username}' and password '${password}'`
            );
            setUsername(username);
            this.handleCancel();
        } else {
            console.log('invalid username or password');
            this.setState({
                invalidCredentials: true,
            });
        }
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    render() {
        const { classes, isOpen } = this.props;
        const {
            username,
            password,
            showPassword,
            touchedUsernameField,
            touchedPasswordField,
            invalidCredentials,
        } = this.state;

        const usernameValid = username.length > 0;
        const passwordValid = password.length >= 8;

        return (
            <Dialog open={isOpen} onClose={this.handleCancel}>
                <DialogTitle>Sign In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your username and password.
                    </DialogContentText>
                    {invalidCredentials && (
                        <Alert
                            severity="error"
                            variant="outlined"
                            className={classes.alert}
                        >
                            Invalid username or password
                        </Alert>
                    )}
                    <TextField
                        value={username}
                        onChange={(e) =>
                            this.setState({
                                username: e.target.value,
                                touchedUsernameField: true,
                                invalidCredentials: false,
                            })
                        }
                        autoFocus
                        margin="dense"
                        id="username"
                        label="User Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        error={touchedUsernameField && !usernameValid}
                        helperText={
                            !usernameValid ? 'Must enter a username' : ''
                        }
                    />
                    <TextField
                        value={password}
                        onChange={(e) =>
                            this.setState({
                                password: e.target.value,
                                touchedPasswordField: true,
                                invalidCredentials: false,
                            })
                        }
                        margin="dense"
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        error={touchedPasswordField && !passwordValid}
                        helperText={
                            !passwordValid
                                ? 'Password must be at least 8 characters'
                                : ''
                        }
                    />
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showPassword}
                                    onChange={this.handleClickShowPassword}
                                    name="showPassword"
                                />
                            }
                            label="Show Password?"
                        />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleSignIn}
                        color="primary"
                        variant="contained"
                        disabled={!(usernameValid && passwordValid)}
                    >
                        Sign In
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: getJS(false, state, 'dialogs.signIn.isOpen'),
        validUsers: getJS([], state, 'userInfo.validUsers'),
    };
};

const mapDispatchToProps = (dispatch) => ({
    closeSignInDialog: () => dispatch(closeSignInDialog()),
    setUsername: (username) => dispatch(setUsername(username)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignIn));
