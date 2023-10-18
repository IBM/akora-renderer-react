# akora-renderer-react
A react renderer for easily rendering react components into a region

```javascript
import getReactRenderer from '@ibm/akora-renderer-react';
import React from 'react';
import ReactDOM from 'react-dom';

const ReactRenderer = getReactRenderer(React, ReactDOM);

export default {
  routes: [
    path: '/my-route',
    regions: {
      app: {
        renderer: ReactRenderer,
        state: {
          component: () => import('MyComponent.jsx') // Using webpack async loader
        }
      }
    }
  ]
}
```

## State
The state to provide the renderer with.

  **params** *optional*
  The params to be used within the component.

  **component**
  Should be set to a function which returns either the component that should be
  rendered or a promise which eventually resolves to a component. This allows for
  code splitting with bundlers such as webpack.

  **stateToPropMapper** *optional*
  Can be set to a function which takes in the configuration of the renderer and
  returns the props that should be passed to the react component. Typically
  the params object will be used to take values from the url, e.g:

  **react** *optional*
  Provide your own instance of React.

  **reactDom** *optional*
  Provide your own instance of ReactDOM.

```javascript
export default {
  routes: [
    path: '/my-route/:myparameter',
    regions: {
      app: {
        renderer: ReactRenderer,
        state: {
          component: () => import('MyComponent.jsx'),
          paramToPropMapper: ({params}) => ({
            myProp: params.myparameter
          })
        }
      }
    }
  ]
}
```
