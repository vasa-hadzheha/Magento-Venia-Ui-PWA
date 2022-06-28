import React from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';

import { useStyle } from '../../classify.js';
import Footer from '../Footer/index';
import Header from '../Header/index';
import defaultClasses from '@magento/venia-ui/lib/components/Main/main.module.css';

import { DartThemeProvider } from "./DarkThemeContext"

const Main = props => {
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
                <DartThemeProvider>
        <main className={rootClass}>
                    <Header />
                <div className={pageClass}>{children}</div>
                <Footer />
            </main>
                </DartThemeProvider>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
