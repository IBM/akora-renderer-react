/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import setUrlParameters from './setUrlParameters';

describe('setUrlParameters', () => {
  const testBaseURl = 'https://testurl.com';
  it('updates an existing parameter when there is only one parameter', () => {
    const testUrl = `${testBaseURl}?testKey=oldTestValue`;

    const newUrl = setUrlParameters(testUrl, {'testKey': 'newTestValue'});

    expect(newUrl).toBe('https://testurl.com?testKey=newTestValue');
  });

  it('updates an existing parameter from a set of parameters', () => {
    const testUrl = `${testBaseURl}?otherKey=otherValue&testKey=oldTestValue`;

    const newUrl = setUrlParameters(testUrl, {'testKey': 'newTestValue'});

    expect(newUrl)
      .toBe('https://testurl.com?otherKey=otherValue&testKey=newTestValue');
  });

  it('updates an existing parameters from a set of parameters', () => {
    const testUrl = `${testBaseURl}?keyOne=valueOne&keyTwo=valueTwo`;

    const newUrl = setUrlParameters(testUrl, {
      'keyOne': 'newValueOne',
      'keyTwo': 'newValueTwo'
    });

    expect(newUrl)
      .toBe('https://testurl.com?keyOne=newValueOne&keyTwo=newValueTwo');
  });

  it('adds url parameters if none exist', () => {
    const testUrl = `${testBaseURl}`;

    const newUrl = setUrlParameters(testUrl, {'testKey': 'newTestValue'});

    expect(newUrl)
      .toBe('https://testurl.com?testKey=newTestValue');
  });

  it('removes an existing parameter from a set of parameters when no value is provided', () => {
    const testUrl = `${testBaseURl}?otherKey=otherValue&testKey=oldTestValue`;

    const newUrl = setUrlParameters(testUrl, {'testKey': ''});

    expect(newUrl).toBe('https://testurl.com?otherKey=otherValue');
  });

  it('removes an existing parameter when no value is provided', () => {
    const testUrl = `${testBaseURl}?testKey=oldTestValue`;

    const newUrl = setUrlParameters(testUrl, {'testKey': ''});

    expect(newUrl).toBe(testBaseURl);
  });
});
