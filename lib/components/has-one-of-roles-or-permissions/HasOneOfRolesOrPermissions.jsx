/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
/* eslint-disable react/prop-types */
import useAkoraState from '../hooks/akora-state/useAkoraState';
import {getUserRoles, getUserPermissions} from '../../util/getUserRolesAndPermissions';

export default (React, AkoraContext) => function HasOneOfRolesOrPermissions({
  roles,
  permissions,
  noRoleComponent,
  children
}) {
  const akora = useAkoraState(React, AkoraContext)();
  if (akora && akora.state && akora.state.user) {
    if (permissions) {
      const userPermissions = getUserPermissions(akora.state.user);
      const userHasPermissions = permissions.some(
        perm => userPermissions && userPermissions.includes(perm)
      );
      if (userHasPermissions) {
        return children;
      }
    }

    if (roles) {
      const userRoles = getUserRoles(akora.state.user);
      const userHasRoles = roles.some(
        role => userRoles && userRoles.includes(role)
      );
      if (userHasRoles) {
        return children;
      }
    }
  }
  return noRoleComponent || null;
};
