/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import useHasRolesOrPermissions from './has-roles-or-permissions/useHasRolesOrPermissions';
import useAkoraState from './akora-state/useAkoraState';
import useQueryParameter from './query-param/useQueryParam';
import useBrowserStorage from './browser-storage/useBrowserStorage';

export default (React, AkoraContext) => ({
  useHasRolesOrPermissions: useHasRolesOrPermissions(React, AkoraContext),
  useAkoraState: useAkoraState(React, AkoraContext),
  useQueryParameter: useQueryParameter(React, AkoraContext),
  useBrowserStorage: useBrowserStorage(React, AkoraContext)
});
