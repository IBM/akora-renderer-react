/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import useAkoraState from '../akora-state/useAkoraState';
import {getUserRoles, getUserPermissions} from '../../../util/getUserRolesAndPermissions';

export default (React, AkoraContext) => function useHasRolesOrPermissions({roles, permissions}) {
  const akora = useAkoraState(React, AkoraContext)();

  const userRoles = getUserRoles(akora.state.user);
  const userPermissions = getUserPermissions(akora.state.user);

  return React.useMemo(
    () => {
      if (permissions && userPermissions) {
        return permissions.some(
          perm => userPermissions.includes(perm)
        );
      }
      if (roles && userRoles) {
        return roles.some(
          role => userRoles.includes(role)
        );
      }

      return false;
    },
    [roles, permissions, userRoles, userPermissions]
  );
};
