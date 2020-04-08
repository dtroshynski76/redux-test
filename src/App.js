import React from 'react';
import Header from './header/header';
import { connect } from 'react-redux';
import SignIn from './Dialogs/sign-in/SignIn';
import SignUp from './Dialogs/sign-up/SignUp';
import {
    openSignInDialog,
    openSignUpDialog,
} from './redux/actions/dialogActions';

class App extends React.PureComponent {
    handleLogin = () => {
        const { openSignInDialog } = this.props;

        openSignInDialog();
    };

    handleSignUp = () => {
        const { openSignUpDialog } = this.props;

        openSignUpDialog();
    };

    // TODO: add footer
    render() {
        return (
            <React.Fragment>
                <SignIn />
                <SignUp />
                <Header
                    onLogin={this.handleLogin}
                    onSignUp={this.handleSignUp}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    openSignInDialog: () => dispatch(openSignInDialog()),
    openSignUpDialog: () => dispatch(openSignUpDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
