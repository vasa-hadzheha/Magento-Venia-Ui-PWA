import React, { useCallback, useContext } from 'react';
import './style.css'
import DarkModeToggle from "react-dark-mode-toggle";
import { DarkThemeContext } from "./DarkThemeContext";

import { useIntl } from 'react-intl';
import { array, func, shape, string } from 'prop-types';

import { useToasts } from '@magento/peregrine';
import useDelayedTransition from '@magento/peregrine/lib/hooks/useDelayedTransition';
import { useApp } from '@magento/peregrine/lib/talons/App/useApp';

import globalCSS from '../../index.css';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
// import Main from '../Main';
// import Mask from '../Mask';
// import Navigation from '../Navigation';
// import Routes from '../Routes';
// import ToastContainer from '../ToastContainer';
// import Icon from '../Icon';

// - import { HeadProvider, Title } from '../Head';
import { HeadProvider, Title } from '@magento/venia-ui/lib/components/Head';
import Main from '../Main/index';
import Mask from '@magento/venia-ui/lib/components/Mask';
// import MiniCart from '@magento/venia-ui/lib/components/MiniCart';
import Navigation from '@magento/venia-ui/lib/components/Navigation';
import Routes from '@magento/venia-ui/lib/components/Routes';
import ToastContainer from '@magento/venia-ui/lib/components/ToastContainer';
import Icon from '@magento/venia-ui/lib/components/Icon';



import {
    AlertCircle as AlertCircleIcon,
    CloudOff as CloudOffIcon,
    Wifi as WifiIcon
} from 'react-feather';

const OnlineIcon = <Icon src={WifiIcon} attrs={{ width: 18 }} />;
const OfflineIcon = <Icon src={CloudOffIcon} attrs={{ width: 18 }} />;
const ErrorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

const App = props => {
    const { markErrorHandled, renderError, unhandledErrors } = props;
    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();
    useDelayedTransition();

    const ERROR_MESSAGE = formatMessage({
        id: 'app.errorUnexpected',
        defaultMessage: 'Sorry! An unexpected error occurred.'
    });

    const handleIsOffline = useCallback(() => {
        addToast({
            type: 'error',
            icon: OfflineIcon,
            message: formatMessage({
                id: 'app.errorOffline',
                defaultMessage:
                    'You are offline. Some features may be unavailable.'
            }),
            timeout: 3000
        });
    }, [addToast, formatMessage]);

    const handleIsOnline = useCallback(() => {
        addToast({
            type: 'info',
            icon: OnlineIcon,
            message: formatMessage({
                id: 'app.infoOnline',
                defaultMessage: 'You are online.'
            }),
            timeout: 3000
        });
    }, [addToast, formatMessage]);

    const handleError = useCallback(
        (error, id, loc, handleDismissError) => {
            const errorToastProps = {
                icon: ErrorIcon,
                message: `${ERROR_MESSAGE}\nDebug: ${id} ${loc}`,
                onDismiss: remove => {
                    handleDismissError();
                    remove();
                },
                timeout: 15000,
                type: 'error'
            };

            addToast(errorToastProps);
        },
        [ERROR_MESSAGE, addToast]
    );

    const talonProps = useApp({
        handleError,
        handleIsOffline,
        handleIsOnline,
        markErrorHandled,
        renderError,
        unhandledErrors
    });

    const { hasOverlay, handleCloseDrawer } = talonProps;
    const { turnOn, setTurnOn, mainColor } = useContext(DarkThemeContext);

    if (renderError) {
        return (
            <HeadProvider>
                <StoreTitle />
                <Main isMasked={true} />
                <Mask isActive={true} />
                <ToastContainer />
            </HeadProvider>
        );
    }
    
    return (
        <div
            className="App"
            style={{
                backgroundColor: mainColor.bg,
                //color: mainColor.txt,
                height: "100vh"
            }}
        >
            <DarkModeToggle onChange={setTurnOn} checked={turnOn} size={80} />
            <div style={{ color: mainColor.txt }}>
                <HeadProvider>
                    <h1>Vasyl</h1>
                    <h2>Start editing to see some magic happen!</h2>
                    <StoreTitle />
                    <Main isMasked={hasOverlay}>
                        <Routes />
                    </Main>
                    <Mask
                        isActive={hasOverlay}
                        dismiss={handleCloseDrawer}
                        data-cy="App-Mask-button"
                        />
                    <Navigation />
                    <ToastContainer />
                </HeadProvider>
            </div>
        </div>
    );
};

App.propTypes = {
    markErrorHandled: func.isRequired,
    renderError: shape({
        stack: string
    }),
    unhandledErrors: array
};

App.globalCSS = globalCSS;

export default App;
