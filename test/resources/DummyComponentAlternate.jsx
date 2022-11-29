/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
import React from 'react';
import PropTypes from 'prop-types';

class DummyComponentAlternate extends React.Component {
  render() {
    return (
      <div className='sample-class__alternate'>
        <span className='sample-class__label'>{this.props.sampleString}</span>
      </div>
    );
  }
}

DummyComponentAlternate.propTypes = {
  sampleString: PropTypes.string
};

DummyComponentAlternate.defaultProps = {
  sampleString: 'test'
};

export default DummyComponentAlternate;
