import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { closeSignInDialog } from '../../redux/actions/dialogActions';

const styles = {};

class SignIn extends React.PureComponent {
    handleClose = () => {
        const { closeSignInDialog } = this.props;
        closeSignInDialog();
    };

    render() {
        const { isOpen } = this.props;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SignIn.propTypes = {
    /**
     * defines whether the dialog is open or not
     */
    isOpen: PropTypes.bool,

    /**
     * redux action
     */
    closeSignInDialog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    closeSignInDialog: () => dispatch(closeSignInDialog()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignIn));
