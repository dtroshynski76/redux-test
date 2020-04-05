import React from 'react';
import Header from './header/header';
import { connect } from 'react-redux';
import SignIn from './Dialogs/sign-in/SignIn';
import { openSignInDialog } from './redux/actions/dialogActions';

class App extends React.PureComponent {
    handleLogin = () => {
        const { openSignInDialog } = this.props;

        openSignInDialog(true);
    };

    // TODO: add footer
    render() {
        const { signInDialogOpen } = this.props;

        return (
            <React.Fragment>
                <SignIn isOpen={signInDialogOpen} />
                <Header onLogin={this.handleLogin} displayName={'Donovan'} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signInDialogOpen: state.dialogs.signIn.isOpen,
    };
};

const mapDispatchToProps = (dispatch) => ({
    openSignInDialog: () => dispatch(openSignInDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
