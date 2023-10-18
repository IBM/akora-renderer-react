/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

export const getUserRoles = function(user) {
  return user.user && user.user.roles ? user.user.roles : user.roles;
};

export const getUserPermissions = function(user) {
  if (user.user && user.user.zen && user.user.zen.permissions) {
    return user.user.zen.permissions;
  }
  return user.zen && user.zen.permissions;
};
