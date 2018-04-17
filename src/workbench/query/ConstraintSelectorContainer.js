import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  addQueryConstraint,
  updateQueryConstraintType,
  updateQueryConstraintValues,
  removeQueryConstraint
} from "workbench/actions";

import { getQuery, getConstraintTargets } from "workbench/query/selectors";

import ConstraintSelector from "workbench/query/ConstraintSelector";

class ConstraintSelectorContainer extends Component {
  static propTypes = {
    elementConfig: PropTypes.object.isRequired,
    filterCapabilities: PropTypes.array.isRequired,
    contraintTargets: PropTypes.array.isRequired,
    dispatchAddQueryConstraint: PropTypes.func.isRequired,
    dispatchUpdateQueryConstraintType: PropTypes.func.isRequired,
    dispatchUpdateQueryConstraintValues: PropTypes.func.isRequired,
    dispatchRemoveQueryConstraint: PropTypes.func.isRequired
  };

  handledAddQueryConstraint = selectedConstraintTarget => {
    const {
      elementConfig,
      dispatchAddQueryConstraint,
      filterCapabilities
    } = this.props;
    // For a new constraint default the filterType to the first value
    // of filter capabilities for the selected dataType.
    const constraintTarget = {
      ...selectedConstraintTarget,
      FilterType: filterCapabilities[selectedConstraintTarget.DataType][0].Type
    };

    dispatchAddQueryConstraint(
      elementConfig.ElementId,
      elementConfig.Constraints.length,
      constraintTarget
    );
  };

  handledUpdateQueryConstraintType = (constraintId, constraintType) => {
    const { elementConfig, dispatchUpdateQueryConstraintType } = this.props;

    dispatchUpdateQueryConstraintType(
      elementConfig.ElementId,
      constraintId,
      constraintType
    );
  };

  handledUpdateQueryConstraintValues = (constraintId, constraintValues) => {
    const { elementConfig, dispatchUpdateQueryConstraintValues } = this.props;

    dispatchUpdateQueryConstraintValues(
      elementConfig.ElementId,
      constraintId,
      constraintValues
    );
  };

  handledRemoveQueryConstraint = constraintId => {
    const { elementConfig, dispatchRemoveQueryConstraint } = this.props;

    dispatchRemoveQueryConstraint(elementConfig.ElementId, constraintId);
  };

  render() {
    const { elementConfig, filterCapabilities, contraintTargets } = this.props;

    return (
      <ConstraintSelector
        queryConstraints={elementConfig.Constraints}
        filterCapabilities={filterCapabilities}
        contraintTargets={contraintTargets}
        handledAddQueryConstraint={this.handledAddQueryConstraint}
        handledUpdateQueryConstraintType={this.handledUpdateQueryConstraintType}
        handledUpdateQueryConstraintValues={
          this.handledUpdateQueryConstraintValues
        }
        handledRemoveQueryConstraint={this.handledRemoveQueryConstraint}
      />
    );
  }
}

const mapStateToProps = state => ({
  elementConfig: getQuery(state),
  filterCapabilities: state.queryConfigReducer.filterCapabilities,
  contraintTargets: getConstraintTargets(state)
});

const mapDispatchToProps = dispatch => ({
  dispatchAddQueryConstraint: (elementId, constraintId, constraintTarget) =>
    dispatch(addQueryConstraint(elementId, constraintId, constraintTarget)),
  dispatchUpdateQueryConstraintType: (
    elementId,
    constraintId,
    constraintType
  ) =>
    dispatch(
      updateQueryConstraintType(elementId, constraintId, constraintType)
    ),
  dispatchUpdateQueryConstraintValues: (
    elementId,
    constraintId,
    constraintValues
  ) =>
    dispatch(
      updateQueryConstraintValues(elementId, constraintId, constraintValues)
    ),
  dispatchRemoveQueryConstraint: (elementId, constraintId) =>
    dispatch(removeQueryConstraint(elementId, constraintId))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ConstraintSelectorContainer
);
