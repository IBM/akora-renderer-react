/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

export default React => class LoadingSpinner extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{
        top: 'calc(50% - 84px)',
        left: 'calc(50% - 84px)',
        position: 'absolute'
      }}>
        <div className="bx--loading">
          <svg className="bx--loading__svg" viewBox="-75 -75 150 150">
            <circle cx="0" cy="0" r="37.5" />
          </svg>
        </div>
      </div>
    );
  }
};
