/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import HasOneOfRolesOrPermissions from './has-one-of-roles-or-permissions/HasOneOfRolesOrPermissions';
import Link from './Link';
import Region from './Region';
import WithAkoraState from './WithAkoraState';
import AkoraStateProvider from './AkoraStateProvider';
import getHooks from './hooks';
import setQueryParameter from '../util/setQueryParameter';
import setUrlParameters from '../util/setUrlParameters';

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
    setQueryParameter,
    setUrlParameters,
    ...getHooks(React, AkoraContext)
  };
};
