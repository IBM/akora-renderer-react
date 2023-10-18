/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable react/prop-types */
export default (React, AkoraContext) => function Link({
  href,
  replaceRoute,
  linkTag,
  children,
  ...rest
}) {
  const LinkTag = linkTag || 'a';

  return (
    <AkoraContext.Consumer>
      {({app}) => {
        const onLinkClick = evt => {
          evt.preventDefault();

          if (replaceRoute) {
            app.replaceRoute(href);
          } else {
            app.setRoute(href);
          }
        };

        return (
          <LinkTag href={href} onClick={onLinkClick} {...rest}>{children}</LinkTag>
        );
      }}
    </AkoraContext.Consumer>
  );
};
