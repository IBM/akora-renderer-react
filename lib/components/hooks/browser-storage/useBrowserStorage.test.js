/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import useBrowserStorage from './useBrowserStorage';

describe.each`
  storageType
  ${'local'}
  ${'session'}
`('useBrowserStorage with $storageType storage', ({storageType}) => {
  const testKey = 'testKey';
  const testValue = 'testValue';
  const testValueJSON = { testValue };
  const presetValue = 'presetValue';

  const useBrowserStorageWithReact = (props) => useBrowserStorage(React)({ storageType, ...props});

  beforeEach(() => {
    window[`${storageType}Storage`].setItem(testKey, null);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if nothing is set at the key', () => {
    const {result} = renderHook(() => useBrowserStorageWithReact({ key: testKey}));
    const [storedValue] = result.current;

    expect(storedValue).toEqual(null);
  });

  it('returns initialValue if nothing is set at the key', () => {
    const {result} = renderHook(() => useBrowserStorageWithReact({ key: testKey, initialValue: testValueJSON }));
    const [storedValue] = result.current;

    expect(storedValue).toEqual(testValueJSON);
  });

  it('returns initialValue if parsing fails in try catch for useState', function() {
    let undefinedVar;
    window[`${storageType}Storage`].setItem(testKey, undefinedVar);

    const {result} = renderHook(() => useBrowserStorageWithReact({ key: testKey, initialValue: testValue }));
    const [storedValue] = result.current;

    expect(storedValue).toEqual(testValue);
  });

  it('returns present value if it\'s already defined under the provided key', function() {
    window[`${storageType}Storage`].setItem(testKey, presetValue);

    const {result} = renderHook(() => useBrowserStorageWithReact({ key: testKey, initialValue: testValue }));
    const [storedValue] = result.current;

    expect(storedValue).toEqual(presetValue);
  });

  it('returns the set value', function() {
    const {result} = renderHook(() => useBrowserStorageWithReact({ key: testKey }));
    let storedValue = result.current[0];
    const setStoredValue = result.current[1];

    expect(storedValue).toEqual(null);
    act(() => {
      setStoredValue(testValue);
    });

    [storedValue] = result.current;

    expect(storedValue).toEqual(testValue);
  });

  it('check event listener set', function() {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    renderHook(() => useBrowserStorageWithReact({ key: testKey }));

    expect(addEventListenerSpy).toBeCalledWith(`${storageType}-storage-${testKey}`, expect.any(Function));
  });

  it('check set value, dispatches event', function() {
    const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
    const {result} = renderHook(() => useBrowserStorageWithReact({ key: testKey }));
    // eslint-disable-next-line no-unused-vars
    const [__, setValue] = result.current;
    expect(dispatchEventSpy).not.toHaveBeenCalled();
    act(() => {
      setValue(testValue);
    });
    expect(dispatchEventSpy).toHaveBeenCalled();
  });

  it('check event from one instances, causes value update on other with same key', function() {
    const { result: instance1 } = renderHook(() => useBrowserStorageWithReact({ key: testKey }));
    const { result: instance2 } = renderHook(() => useBrowserStorageWithReact({ key: testKey }));
    const [instance1Value, setInstance1Value] = instance1.current;

    expect(instance1Value).toEqual(null);
    expect(instance2.current[0]).toEqual(null);

    act(() => {
      setInstance1Value(testValue);
    });

    expect(instance1.current[0]).toEqual(testValue);
    expect(instance2.current[0]).toEqual(testValue);
  });

  it('check event from one instances, does not causes value update on other key', function() {
    const { result: instance1 } = renderHook(() => useBrowserStorageWithReact({ key: testKey }));
    const { result: instance2 } = renderHook(() => useBrowserStorageWithReact({ key: 'other-key' }));
    const [instance1Value, setInstance1Value] = instance1.current;

    expect(instance1Value).toEqual(null);
    expect(instance2.current[0]).toEqual(null);

    act(() => {
      setInstance1Value(testValue);
    });

    expect(instance1.current[0]).toEqual(testValue);
    expect(instance2.current[0]).toEqual(null);
  });
});
