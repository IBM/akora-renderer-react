/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import setUrlParameters from '../../../util/setUrlParameters';
import { renderHook } from '@testing-library/react';
import getReactRenderer from '../../../ReactRenderer';
import React from 'react';
import ReactDOM from 'react-dom';

let mockReplaceRoute = jest.fn();
let mockState = {};

jest.mock('../akora-state/useAkoraState', () => ({
  __esModule: true,
  default: () => () => ({
    state: mockState,
    app: {
      replaceRoute: mockReplaceRoute,
      getState: () => mockState
    }
  })
}));

beforeEach(() => {
  const queryParameters = {
    testKey: 'test value'
  };
  mockState = {
    query: queryParameters,
    fullPath: setUrlParameters('testroute.com', queryParameters),
    regionId: null
  };

  mockReplaceRoute = jest.fn((newRoute) => {
    const query = new URLSearchParams(newRoute);
    mockState.query = query;
    mockState.fullPath = newRoute;
  });
});

const ReactRenderer = getReactRenderer(React, ReactDOM);
const {useQueryParameter} = ReactRenderer.components;

describe('useQueryParam', () => {
  it('returns the value of the specified query parameter', () => {
    const { result } = renderHook(() => useQueryParameter('testKey'));
    const [queryParameter] = result.current;
    expect(queryParameter).toBe('test value');
  });

  it('provides a function to set the query parameter using setRoute', () => {
    const { result } = renderHook(() => useQueryParameter('testKey'));
    // eslint-disable-next-line no-unused-vars
    const [queryParameter, setParameter] = result.current;
    setParameter('new value');
    expect(mockReplaceRoute).toHaveBeenCalledWith('testroute.com?testKey=new+value');
  });

  it('Set route should not be called if the new param is already set', () => {
    const { result } = renderHook(() => useQueryParameter('testKey'));
    // eslint-disable-next-line no-unused-vars
    const [queryParameter, setParameter] = result.current;
    setParameter('test value');
    expect(mockReplaceRoute).not.toBeCalled();
  });

  it('Set route should not be called if the new param is falsy string and the current value is not set in url', () => {
    const { result } = renderHook(() => useQueryParameter('otherKey'));
    // eslint-disable-next-line no-unused-vars
    const [queryParameter, setParameter] = result.current;
    setParameter('');
    expect(mockReplaceRoute).not.toBeCalled();
  });

  it('Set route should not be called if the new param is falsy null and the current value is not set in url', () => {
    const { result } = renderHook(() => useQueryParameter('otherKey'));
    // eslint-disable-next-line no-unused-vars
    const [queryParameter, setParameter] = result.current;
    setParameter(null);
    expect(mockReplaceRoute).not.toBeCalled();
  });

  it('returns the value of the specified query parameter when regionId supplied', () => {
    const queryParameters = {
      myRegion_testKey: 'test value'
    };
    mockState.query = queryParameters;
    mockState.fullPath = setUrlParameters('testroute.com', queryParameters);
    const { result } = renderHook(() => useQueryParameter('testKey', 'myRegion'));
    const [queryParameter] = result.current;
    expect(queryParameter).toBe('test value');
  });

  it('provides a function to set the query parameter using setRoute when regionId supplied', () => {
    const { result } = renderHook(() => useQueryParameter('otherKey', 'myRegion'));
    // eslint-disable-next-line no-unused-vars
    const [queryParameter, setParameter] = result.current;
    setParameter('new value');
    expect(mockReplaceRoute).toHaveBeenCalledWith('testroute.com?testKey=test+value&myRegion_otherKey=new+value');
  });

  it('returns the value of the specified query parameter when regionId supplied via state', () => {
    mockState.regionId = 'myRegion';
    const queryParameters = {
      myRegion_testKey: 'test value'
    };
    mockState.query = queryParameters;
    mockState.fullPath = setUrlParameters('testroute.com', queryParameters);
    const { result } = renderHook(() => useQueryParameter('testKey'));
    const [queryParameter] = result.current;
    expect(queryParameter).toBe('test value');
  });

  it('provides a function to set the query parameter using setRoute when regionId supplied via stat', () => {
    mockState.regionId = 'myRegion';
    const { result } = renderHook(() => useQueryParameter('otherKey'));
    // eslint-disable-next-line no-unused-vars
    const [queryParameter, setParameter] = result.current;
    setParameter('new value');
    expect(mockReplaceRoute).toHaveBeenCalledWith('testroute.com?testKey=test+value&myRegion_otherKey=new+value');
  });

  // Updated renderHook no longer catches the error and causes test break
  it.skip('throws error if no key provided', () => {
    const { result } = renderHook(() => useQueryParameter());
    expect(result.error.message).toBe('[useQueryParameter]: No key provided');
  });
});
