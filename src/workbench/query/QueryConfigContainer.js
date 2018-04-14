import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  updateQueryDataService,
  addQueryColumn,
  removeQueryColumn,
  addQueryConstraint
} from "workbench/actions";
import {
  closeQueryConfig,
  goToStep,
  dataServicesRequest,
  filterCapabilitiesRequest
} from "workbench/query/actions";

import {
  getQuery,
  getDataServices,
  getAvailableColumns,
  getQueryColumns,
  getConstraintTargets,
  getCompletedSteps
} from "workbench/query/selectors";

import QueryConfig from "workbench/query/QueryConfig";

class QueryConfigContainer extends Component {
  static propTypes = {
    elementConfig: PropTypes.object.isRequired,
    dataServices: PropTypes.array.isRequired,
    selectedColumns: PropTypes.array.isRequired,
    contraintTargets: PropTypes.array.isRequired,
    dispatchGoToStep: PropTypes.func.isRequired,
    dispatchDataServicesRequest: PropTypes.func.isRequired,
    dispatchFilterCapabilitiesRequest: PropTypes.func.isRequired,
    dispatchDescribeQuery: PropTypes.func.isRequired,
    dispatchAddQueryColumn: PropTypes.func.isRequired,
    dispatchRemoveQueryColumn: PropTypes.func.isRequired,
    dispatchAddQueryConstraint: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {
      dispatchDataServicesRequest,
      dispatchFilterCapabilitiesRequest
    } = this.props;

    dispatchDataServicesRequest();
    dispatchFilterCapabilitiesRequest();
  }

  handleChangeDataService = selectedDataServiceId => {
    const { elementConfig, dispatchDescribeQuery } = this.props;
    dispatchDescribeQuery(elementConfig.ElementId, {
      TargetDataViewId: selectedDataServiceId
    });
  };

  handleAddQueryColumn = column => {
    const { elementConfig, dispatchAddQueryColumn } = this.props;
    dispatchAddQueryColumn(elementConfig.ElementId, column);
  };

  handleRemoveQueryColumn = ({ ColumnName }) => {
    const { elementConfig, dispatchRemoveQueryColumn } = this.props;
    dispatchRemoveQueryColumn(elementConfig.ElementId, ColumnName);
  };

  handledAddQueryConstraint = selectedConstraintTarget => {
    const { elementConfig, dispatchAddQueryConstraint } = this.props;
    dispatchAddQueryConstraint(
      elementConfig.ElementId,
      elementConfig.Constraints.length,
      selectedConstraintTarget
    );
  };

  handleChangeContraintTarget = selectedConstraintTarget => {};

  render() {
    return (
      <QueryConfig
        {...this.props}
        handleChangeDataService={this.handleChangeDataService}
        handleAddQueryColumn={this.handleAddQueryColumn}
        handleRemoveQueryColumn={this.handleRemoveQueryColumn}
        handledAddQueryConstraint={this.handledAddQueryConstraint}
        handleChangeContraintTarget={this.handleChangeContraintTarget}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.queryConfigReducer,
  elementConfig: getQuery(state),
  dataServices: getDataServices(state),
  availableColumns: getAvailableColumns(state),
  selectedColumns: getQueryColumns(state),
  contraintTargets: getConstraintTargets(state),
  completedSteps: getCompletedSteps(state)
});

const mapDispatchToProps = dispatch => ({
  dispatchGoToStep: step => dispatch(goToStep(step)),
  dispatchCloseQueryConfig: () => dispatch(closeQueryConfig()),
  dispatchDataServicesRequest: () => dispatch(dataServicesRequest()),
  dispatchFilterCapabilitiesRequest: () =>
    dispatch(filterCapabilitiesRequest()),
  dispatchDescribeQuery: (elementId, query) =>
    dispatch(updateQueryDataService(elementId, query)),
  dispatchAddQueryColumn: (elementId, column) =>
    dispatch(addQueryColumn(elementId, column)),
  dispatchRemoveQueryColumn: (elementId, column) =>
    dispatch(removeQueryColumn(elementId, column)),
  dispatchAddQueryConstraint: (elementId, constraintId, constraintTarget) =>
    dispatch(addQueryConstraint(elementId, constraintId, constraintTarget))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  QueryConfigContainer
);
