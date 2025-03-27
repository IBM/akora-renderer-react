/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import getLoadingSpinner from './LoadingSpinner';
import getComponents from './components';

const renderers = new Map();

export default function getReactRenderer(React, {createRoot}) {
  const reactDomRenders = renderers.get(React);
  const renderer = reactDomRenders && reactDomRenders.get(createRoot);

  if (renderer) {
    return renderer;
  }

  const LoadingSpinner = getLoadingSpinner(React);
  const components = getComponents(React);

  const ReactRenderer = class ReactRenderer {
    constructor(element, app) {
      this.element = element;
      this.app = app;
      this.root = createRoot(element);
      this.isShown = false;
      this.contextValue = {
        state: null,
        app
      };
    }

    setState(lastState, state) {
      this.state = state;
      this.stateToPropMapper = state.stateToPropMapper || (() => ({}));
      this.contextValue = {
        state,
        app: this.app
      };
    }

    renderComponent(component, props) {
      this.root.render(
        React.createElement(
          components.AkoraStateProvider,
          {
            value: this.contextValue
          },
          React.createElement(component, props)
        )
      );
    }

    render() {
      const component = this.state.component;

      this.isActive = true;

      const loadingTimer = setTimeout(() => {
        if (this.isActive && this.state.component === component) {
          this.renderComponent(LoadingSpinner);
        }
      }, 500);

      this.getComponent().then(loadedComponent => {
        clearTimeout(loadingTimer);
        if (this.isActive && this.state.component === component) {
          this.renderComponent(
            loadedComponent.default || loadedComponent,
            this.stateToPropMapper(this.state, this.app)
          );
        }
      });
    }

    getComponent() {
      const component = this.state.component();
      if (component instanceof Promise) {
        return component.then(x => x.default || x);
      }
      return Promise.resolve(component);
    }

    destroy() {
      this.isActive = false;
      this.root.unmount(this.element);
    }
  };

  if (!reactDomRenders) {
    renderers.set(React, new Map());
  }

  ReactRenderer.components = components;

  renderers.get(React).set(createRoot, ReactRenderer);

  return ReactRenderer;
}
