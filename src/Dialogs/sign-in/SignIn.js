import React from 'react';
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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import { closeSignInDialog } from '../../redux/actions/dialogActions';

const styles = {};

const initState = {
    username: '',
    password: '',
    showPassword: false,
};

class SignIn extends React.PureComponent {
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

        console.log(
            `signed in with username '${username}' and password '${password}'`
        );
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    render() {
        const { isOpen } = this.props;
        const { username, password, showPassword } = this.state;

        const usernameValid = username.length > 0;
        const passwordValid = password.length >= 8;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleCancel}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your username and password.
                    </DialogContentText>
                    <TextField
                        value={username}
                        onChange={(e) =>
                            this.setState({ username: e.target.value })
                        }
                        autoFocus
                        margin="dense"
                        id="username"
                        label="User Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        error={!usernameValid}
                        helperText={
                            !usernameValid ? 'Must enter a username' : ''
                        }
                    />
                    <TextField
                        value={password}
                        onChange={(e) =>
                            this.setState({ password: e.target.value })
                        }
                        margin="dense"
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        error={!passwordValid}
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

SignIn.propTypes = {
    /**
     * from redux store; defines whether the dialog is open or not
     */
    isOpen: PropTypes.bool,

    /**
     * redux action
     */
    closeSignInDialog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isOpen: getJS(state, 'dialogs.signIn.isOpen', false),
    };
};

const mapDispatchToProps = (dispatch) => ({
    closeSignInDialog: () => dispatch(closeSignInDialog()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignIn));
