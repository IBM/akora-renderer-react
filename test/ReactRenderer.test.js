/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import getReactRenderer         from '../dist/akora-renderer-react.cjs';
import {JSDOM}                  from 'jsdom';
import DummyComponent           from './resources/DummyComponent';
import DummyComponentAlternate  from './resources/DummyComponentAlternate';
import React                    from 'react';
import ReactDOMClient             from 'react-dom/client';
import 'core-js';

const ReactRenderer = getReactRenderer(React, ReactDOMClient);

describe('ReactRenderer', () => {
  it('should return the same renderer for the same version of react', () => {
    const r1 = getReactRenderer(React, ReactDOMClient);
    const r2 = getReactRenderer(React, ReactDOMClient);

    expect(r1).toEqual(r2);
  });

  it('should return a different renderer for the same version of react but different react DOM', () => {
    const r1 = getReactRenderer(React, ReactDOMClient);
    const r2 = getReactRenderer(React, {});

    expect(r1).not.toEqual(r2);
  });

  it('should return a different renderer for the same version of react DOM but different react', () => {
    const r1 = getReactRenderer(React, ReactDOMClient);
    const r2 = getReactRenderer({Component: class { }, createContext: () => { }}, ReactDOMClient);

    expect(r1).not.toEqual(r2);
  });

  it('should return a different renderer for different versions of react and react dom', () => {
    const r1 = getReactRenderer(React, ReactDOMClient);
    const r2 = getReactRenderer({Component: class { }, createContext: () => { }}, {});

    expect(r1).not.toEqual(r2);
  });

  it('should be able to create from an element', () => {
    const dom = new JSDOM('<div></div>');
    const divElem = dom.window.document.querySelector('div');

    const myRenderer = new ReactRenderer(divElem);

    expect(myRenderer.element).toBe(divElem);
  });

  it('should be able to set state', () => {
    const dom = new JSDOM('<div></div>');
    const divElem = dom.window.document.querySelector('div');

    const myRenderer = new ReactRenderer(divElem);
    const state = {
      params: {
        testParam: 1
      },
      component: () => DummyComponent,
      stateToPropMapper: () => ({})
    };
    myRenderer.setState(null, state);

    expect(myRenderer.state).toBe(state);
    expect(myRenderer.state.stateToPropMapper).toBe(state.stateToPropMapper);
  });

  it('should render', (done) => {
    const dom = new JSDOM('<div></div>');
    global.window = dom.window;
    const divElem = dom.window.document.querySelector('div');

    const myRenderer = new ReactRenderer(divElem);
    const state = {
      params: {
        testParam: 1
      },
      component: () => DummyComponent,
      stateToPropMapper: () => ({})
    };
    myRenderer.setState(null, state);
    const renderComponentSpy = jest.spyOn(myRenderer, 'renderComponent');

    myRenderer.render();
    expect(myRenderer.isActive).toBe(true);

    setImmediate(() => {
      expect(renderComponentSpy).toBeCalledTimes(1);
      done();
    });
  });

  it('should destroy a rendered component', (done) => {
    const dom = new JSDOM('<div></div>');
    global.window = dom.window;
    const divElem = dom.window.document.querySelector('div');

    const myRenderer = new ReactRenderer(divElem);
    const state = {
      params: {
        testParam: 1
      },
      component: () => DummyComponent,
      stateToPropMapper: () => ({})
    };
    myRenderer.setState(null, state);
    const unmountComponentAtNodeSpy = jest.spyOn(myRenderer.root, 'unmount');

    myRenderer.render();
    expect(myRenderer.isActive).toBe(true);

    setImmediate(() => {
      myRenderer.destroy();
      expect(unmountComponentAtNodeSpy).toBeCalledTimes(1);

      done();
    });
  });

  const waitForComponent = async (element, className) => {
    return new Promise((resolve) => {
      const intervalTimer = setInterval(() => {
        if (element.querySelector(className)) {
          clearInterval(intervalTimer);
          resolve();
        }
      }, 100);
    });
  };

  it('should render a loading spinner THEN a component', async () => {
    const dom = new JSDOM('<div></div>');
    global.window = dom.window;
    const doc = dom.window.document;
    const divElem = doc.querySelector('div');

    const myRenderer = new ReactRenderer(divElem);
    const state = {
      params: {
        testParam: 1
      },
      component: () => new Promise(resolve =>
        setTimeout(() => resolve(DummyComponent), 600)
      )
    };
    myRenderer.setState(null, state);

    jest.useFakeTimers({doNotFake: ['setInterval', 'clearInterval']});
    myRenderer.render();
    expect(divElem.innerHTML).toBeFalsy();

    jest.advanceTimersByTime(501);
    await waitForComponent(divElem, '.bx--loading');
    expect(divElem.querySelector('.bx--loading')).toBeTruthy();

    jest.advanceTimersByTime(1000);
    jest.useRealTimers();

    await waitForComponent(divElem, '.sample-class');
    expect(divElem.querySelector('.sample-class')).toBeTruthy();
  });

  it('should attempt to render two components simultaneously', async () => {
    const dom = new JSDOM('<div></div>');
    global.window = dom.window;
    const doc = dom.window.document;
    const divElem = doc.querySelector('div');

    const myRenderer = new ReactRenderer(divElem);
    const state = {
      params: {
        testParam: 1
      },
      component: () => new Promise(resolve =>
        setTimeout(() => resolve(DummyComponent), 600)
      )
    };
    myRenderer.setState(null, state);

    jest.useFakeTimers({doNotFake: ['setInterval', 'clearInterval']});
    myRenderer.render();
    expect(divElem.innerHTML).toBeFalsy();

    jest.advanceTimersByTime(501);

    await waitForComponent(divElem, '.bx--loading');
    expect(divElem.querySelector('.bx--loading')).toBeTruthy();

    jest.advanceTimersByTime(1000);
    jest.useRealTimers();
    await waitForComponent(divElem, '.sample-class');
    expect(divElem.querySelector('.sample-class')).toBeTruthy();

    const component2State = {
      params: {
        testParam: 1
      },
      component: () => new Promise(resolve =>
        setTimeout(() => resolve(DummyComponentAlternate), 1300)
      )
    };
    myRenderer.setState(null, component2State);

    jest.useFakeTimers({doNotFake: ['setInterval', 'clearInterval']});
    myRenderer.render();
    jest.advanceTimersByTime(501);
    await waitForComponent(divElem, '.bx--loading');
    expect(divElem.querySelector('.bx--loading')).toBeTruthy();

    // Component 2 should render here and timeout 2 destroyed
    jest.advanceTimersByTime(1000);
    jest.useRealTimers();

    await waitForComponent(divElem, '.sample-class__alternate');
    expect(divElem.querySelector('.sample-class__alternate')).toBeTruthy();
  });
});
