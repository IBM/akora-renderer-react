/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import useHasRolesOrPermissions from './useHasRolesOrPermissions';
import testHook from '../../../../test/helpers/testHook';
import useAkoraState from '../akora-state/useAkoraState';

jest.mock('../akora-state/useAkoraState', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('useHasRolesOrPermissions', () => {
  const slightlyMockedUseHasRolesOrPermissions = useHasRolesOrPermissions(React, null);
  it('returns true when user has particular permission', () => {
    useAkoraState.mockImplementation(() => () => ({
      state: {
        user: {
          roles: ['role1'],
          zen: {
            permissions: ['zenperm1', 'zenperm2']
          }
        }
      }
    }));
    let hasPermissions;

    testHook(() => {
      hasPermissions = slightlyMockedUseHasRolesOrPermissions({roles: [], permissions: ['zenperm1']});
    });

    expect(hasPermissions).toBe(true);
  });

  it('returns false when user does not have particular permission', () => {
    useAkoraState.mockImplementation(() => () => ({
      state: {
        user: {
          roles: ['role1'],
          zen: {
            permissions: ['zenperm1', 'zenperm2']
          }
        }
      }
    }));
    let hasPermissions;

    testHook(() => {
      hasPermissions = slightlyMockedUseHasRolesOrPermissions({roles: [], permissions: ['zenperm29']});
    });

    expect(hasPermissions).toBe(false);
  });

  it('returns true when user has particular role', () => {
    useAkoraState.mockImplementation(() => () => ({
      state: {
        user: {
          roles: ['role1']
        }
      }
    }));
    let hasRoles;

    testHook(() => {
      hasRoles = slightlyMockedUseHasRolesOrPermissions({roles: ['role1']});
    });

    expect(hasRoles).toBe(true);
  });

  it('returns false when user has no roles or permissions', () => {
    useAkoraState.mockImplementation(() => () => ({
      state: {
        user: {}
      }
    }));
    let hasRoles;

    testHook(() => {
      hasRoles = slightlyMockedUseHasRolesOrPermissions({roles: ['role1']});
    });

    expect(hasRoles).toBe(false);
  });
});
