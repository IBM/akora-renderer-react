/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
import testHook from '../../../../test/helpers/testHook';
import useQueryParameter from './useQueryParam';
import setUrlParameters from '../../../util/setUrlParameters';
import { useCallback } from 'react';

const mockQueryParams = {
  testKey: 'test value'
};
const mockReplaceRoute = jest.fn();

const mockPath = setUrlParameters('testroute.com', mockQueryParams);

jest.mock('../akora-state/useAkoraState', () => ({
  __esModule: true,
  default: () => () => ({
    state: {
      query: mockQueryParams,
      fullPath: mockPath
    },
    app: {
      replaceRoute: mockReplaceRoute
    }
  })
}));

let queryParameter;
let setParameter;

beforeEach(() => {
  jest.clearAllMocks();
  const slightlyMockedUseQueryParameter = useQueryParameter({useCallback}, null);
  testHook(() => {
    [queryParameter, setParameter] = slightlyMockedUseQueryParameter('testKey');
  });
});

describe('useQueryParam', () => {
  it('returns the value of the specified query parameter', () => {
    expect(queryParameter).toBe('test value');
  });

  it('provides a function to set the query parameter using setRoute', () => {
    setParameter('new value');
    expect(mockReplaceRoute).toHaveBeenCalledWith('testroute.com?testKey=new+value');
  });
});
