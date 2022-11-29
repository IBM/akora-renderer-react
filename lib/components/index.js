/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
import HasOneOfRolesOrPermissions from './has-one-of-roles-or-permissions/HasOneOfRolesOrPermissions';
import Link from './Link';
import Region from './Region';
import WithAkoraState from './WithAkoraState';
import AkoraStateProvider from './AkoraStateProvider';
import getHooks from './hooks';

export default React => {
  const AkoraContext = React.createContext({
    app: null,
    state: null
  });

  return {
    HasOneOfRolesOrPermissions: HasOneOfRolesOrPermissions(React, AkoraContext),
    Link: Link(React, AkoraContext),
    Region: Region(React, AkoraContext),
    WithAkoraState: WithAkoraState(React, AkoraContext),
    AkoraStateProvider: AkoraStateProvider(React, AkoraContext),
    ...getHooks(React, AkoraContext)
  };
};
