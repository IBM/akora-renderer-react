/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
import useHasRolesOrPermissions from './has-roles-or-permissions/useHasRolesOrPermissions';
import useAkoraState from './akora-state/useAkoraState';
import useQueryParameter from './query-param/useQueryParam';

export default (React, AkoraContext) => ({
  useHasRolesOrPermissions: useHasRolesOrPermissions(React, AkoraContext),
  useAkoraState: useAkoraState(React, AkoraContext),
  useQueryParameter: useQueryParameter(React, AkoraContext)
});
