import React from 'react';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import { getJS } from '../../constants/functions';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addUser } from '../../redux/actions/userActions';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import { closeSignUpDialog } from '../../redux/actions/dialogActions';

const styles = {};

const initState = {
    username: '',
    touchedUsernameField: false,
    password: '',
    touchedPasswordField: false,
    confirmPassword: '',
    touchedConfirmPasswordField: false,
    showPassword: false,
};

class SignUp extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = initState;
    }

    handleCancel = () => {
        const { closeSignUpDialog } = this.props;

        this.setState(initState);
        closeSignUpDialog();
    };

    handleSignUp = () => {
        const { username, password } = this.state;
        const { addUser } = this.props;

        const passwordHash = CryptoJS.SHA256(password);

        addUser({
            username,
            password: passwordHash.toString(CryptoJS.enc.Hex),
        });
        this.handleCancel();
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    render() {
        const { isOpen } = this.props;
        const {
            username,
            password,
            confirmPassword,
            showPassword,
            touchedUsernameField,
            touchedPasswordField,
            touchedConfirmPasswordField,
        } = this.state;

        const usernameValid = username.length > 0;
        const passwordValid = password.length >= 8;
        const confirmPasswordValid = password === confirmPassword;

        return (
            <Dialog open={isOpen} onClose={this.handleCancel}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a username and password.
                    </DialogContentText>
                    <TextField
                        value={username}
                        onChange={(e) =>
                            this.setState({
                                username: e.target.value,
                                touchedUsernameField: true,
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
                    <TextField
                        value={confirmPassword}
                        onChange={(e) =>
                            this.setState({
                                confirmPassword: e.target.value,
                                touchedConfirmPasswordField: true,
                            })
                        }
                        margin="dense"
                        id="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        error={
                            touchedConfirmPasswordField && !confirmPasswordValid
                        }
                        helperText={
                            !confirmPasswordValid
                                ? 'Passwords do not match'
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
                        onClick={this.handleSignUp}
                        color="primary"
                        variant="contained"
                        disabled={
                            !(
                                usernameValid &&
                                passwordValid &&
                                confirmPasswordValid
                            )
                        }
                    >
                        Sign Up
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SignUp.propTypes = {
    /**
     * from redux store; defines whether the dialog is open or not
     */
    isOpen: PropTypes.bool,

    /**
     * redux action
     */
    closeSignUpDialog: PropTypes.func.isRequired,

    /**
     * redux action to add a new user
     * takes a single object with 'username' and 'password' properties
     */
    addUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isOpen: getJS(false, state, 'dialogs.signUp.isOpen'),
    };
};

const mapDispatchToProps = (dispatch) => ({
    closeSignUpDialog: () => dispatch(closeSignUpDialog()),
    addUser: (userObject) => dispatch(addUser(userObject)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignUp));
