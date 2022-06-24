import React, { Fragment } from 'react';
// import { Facebook, Instagram, Twitter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

// import Logo from '../Logo';
// import Newsletter from '../Newsletter';
// import { useStyle } from '../../classify';
import { useStyle } from '@magento/venia-ui/lib/classify';
// import defaultClasses from './footer.module.css';
// import { DEFAULT_LINKS, LOREM_IPSUM } from './sampleData';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "@magento/venia-ui/lib/components/Footer/footer.module.css"
import { DEFAULT_LINKS, LOREM_IPSUM } from "@magento/venia-ui/lib/components/Footer/sampleData";
// import GET_STORE_CONFIG_DATA from '@magento/venia-ui/lib/queries/getStoreConfigData.graphql';

const Footer = props => {
    const { links } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;

    const linkGroups = Array.from(links, ([groupKey, linkProps]) => {
        const linkElements = Array.from(linkProps, ([text, pathInfo]) => {
            let path = pathInfo;
            let Component = Fragment;
            if (pathInfo && typeof pathInfo === 'object') {
                path = pathInfo.path;
                Component = pathInfo.Component;
            }

            const itemKey = `text: ${text} path:${path}`;
            const child = path ? (
                <Link data-cy="Footer-link" className={classes.link} to={path}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </Link>
            ) : (
                <span data-cy="Footer-label" className={classes.label}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </span>
            );

            return (
                <Component key={itemKey}>
                    <li className={classes.linkItem}>{child}</li>
                </Component>
            );
        });

        return (
            <ul key={groupKey} className={classes.linkGroup}>
                {linkElements}
            </ul>
        );
    });

    return (
        <footer className={classes.root}>
      <div className={classes.links}>
+       <div className={classes.link}>
+         <Link to="/foo">
+           <span className={classes.label}>Foo Demo Page</span>
+         </Link>
+       </div>
        {linkGroups}
      </div>
      <div className={classes.callout}/>
        </footer>
    );
};

export default Footer;

Footer.defaultProps = {
    links: DEFAULT_LINKS
};

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
