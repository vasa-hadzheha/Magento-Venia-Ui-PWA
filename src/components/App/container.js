import React from 'react';
import { useErrorContext } from '@magento/peregrine/lib/context/unhandledErrors';

import { useErrorBoundary } from '@magento/venia-ui/lib/components/App/useErrorBoundary'

import App from './app';
// import { useErrorBoundary } from './useErrorBoundary';
import { DartThemeProvider } from './DarkThemeContext';

const AppContainer = () => {
    const ErrorBoundary = useErrorBoundary(App);
    const [unhandledErrors, errorApi] = useErrorContext();

    return <DartThemeProvider><ErrorBoundary unhandledErrors={unhandledErrors} {...errorApi} /></DartThemeProvider>;
};

export default AppContainer;
