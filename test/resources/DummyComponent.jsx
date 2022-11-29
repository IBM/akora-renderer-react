/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
import React from 'react';
import PropTypes from 'prop-types';

class DummyComponent extends React.Component {
  render() {
    return (
      <div className='sample-class'>
        <span className='sample-class__label'>{this.props.sampleString}</span>
      </div>
    );
  }
}

DummyComponent.propTypes = {
  sampleString: PropTypes.string
};

DummyComponent.defaultProps = {
  sampleString: 'test'
};

export default DummyComponent;
