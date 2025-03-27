/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOMClient from 'react-dom/client';
import '@testing-library/jest-dom';
import {render, renderHook, screen} from '@testing-library/react';
import getReactRenderer from '../../ReactRenderer';

const ReactRenderer = getReactRenderer(React, ReactDOMClient);
const {HasOneOfRolesOrPermissions, useAkoraState} = ReactRenderer.components;

describe('HasOneOfRolesOrPermissions', () => {
  it('Should return child component when role exist', () => {
    const {result} = renderHook(() => useAkoraState());
    result.current.state = {user: {roles: ['noi_lead']}};
    const testMessage = 'showing children';

    render(
      <HasOneOfRolesOrPermissions
        roles={['noi_lead']}
        permissions={['can_do_something']}
      >
        <span>
          {testMessage}
        </span>
      </HasOneOfRolesOrPermissions>
    );
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('Should return child component when role exists in nested user structure', () => {
    const {result} = renderHook(() => useAkoraState());
    result.current.state = {user: {user: {roles: ['noi_lead']}}};
    const testMessage = 'showing children';

    render(
      <HasOneOfRolesOrPermissions
        roles={['noi_lead']}
        permissions={['can_do_something']}
      >
        <span>
          {testMessage}
        </span>
      </HasOneOfRolesOrPermissions>
    );
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('Should return child component when permission exist', () => {
    const {result} = renderHook(() => useAkoraState());
    result.current.state = {user: {zen: {permissions: ['can_view_policies', 'can_view_runbooks']}}};
    const testMessage = 'showing children';

    render(
      <HasOneOfRolesOrPermissions
        permissions={['can_view_runbooks']}
      >
        <span>
          {testMessage}
        </span>
      </HasOneOfRolesOrPermissions>
    );
    expect(screen.queryByText(testMessage)).toBeInTheDocument();
  });

  it('Should return child component when permission exist in nested user structure', () => {
    const {result} = renderHook(() => useAkoraState());
    result.current.state = {user: {user: {zen: {permissions: ['can_view_policies', 'can_view_runbooks']}}}};
    const testMessage = 'showing children';

    render(
      <HasOneOfRolesOrPermissions
        permissions={['can_view_runbooks']}
      >
        <span>
          {testMessage}
        </span>
      </HasOneOfRolesOrPermissions>
    );
    expect(screen.queryByText(testMessage)).toBeInTheDocument();
  });

  it('Should return noRoleComponent when role does not exist', () => {
    const {result} = renderHook(() => useAkoraState());
    result.current.state = {user: {roles: ['noi_lead']}};
    const testMessage = 'showing children';

    render(
      <HasOneOfRolesOrPermissions
        roles={['noi_engineer']}
        noRoleComponent={<div>noRoleComponent</div>}
      >
        <span>
          {testMessage}
        </span>
      </HasOneOfRolesOrPermissions>
    );
    expect(screen.queryByText('noRoleComponent')).toBeInTheDocument();
    expect(screen.queryByText(testMessage)).toBeNull();
  });

  it('Should return noRoleComponent when permission does not exist', () => {
    const {result} = renderHook(() => useAkoraState());
    result.current.state = {user: {permissions: ['can_view_policies', 'can_view_runbooks']}};
    const testMessage = 'showing children';

    render(
      <HasOneOfRolesOrPermissions
        permissions={['can_view_stories']}
        noRoleComponent={<div>noRoleComponent</div>}
      >
        <span>
          {testMessage}
        </span>
      </HasOneOfRolesOrPermissions>
    );
    expect(screen.queryByText('noRoleComponent')).toBeInTheDocument();
    expect(screen.queryByText(testMessage)).toBeNull();
  });
});
