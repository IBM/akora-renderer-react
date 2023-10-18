/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable react/prop-types */
export default (React, AkoraContext) => class Region extends React.Component {
  static contextType = AkoraContext;

  regionRef = React.createRef();

  render() {
    const {
      regionComponent,
      // eslint-disable-next-line no-unused-vars
      regionId,
      // eslint-disable-next-line no-unused-vars
      defaultState,
      ...rest
    } = this.props;

    const RegionComponent = regionComponent || 'div';

    return <RegionComponent ref={this.regionRef} {...rest} />;
  }

  componentDidMount() {
    this.createRegion();
  }

  componentDidUpdate(prevProps) {
    if (
      this.regionRef.current !== this.region.element ||
      this.props.regionId !== this.region.id
    ) {
      this.destroyRegion();
      this.createRegion();
    }
    if (this.props.defaultState &&
       JSON.stringify(this.props.defaultState) !==
          JSON.stringify(prevProps.defaultState)) {
      this.region.setDefaultState(this.props.defaultState);
    }
  }

  componentWillUnmount() {
    this.destroyRegion();
  }

  createRegion() {
    const {
      regionId,
      defaultState
    } = this.props;

    if (!regionId) {
      throw new Error('A region ID must be provided');
    }

    this.region = this.context.app.createRegion(
      regionId,
      this.regionRef.current,
      defaultState
    );
  }

  destroyRegion() {
    this.context.app.destroyRegionByElement(this.region.element);
  }
};
