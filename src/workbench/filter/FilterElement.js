import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { operatorsExtraInfo } from "sideBar/operators/operatorsData";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  operatorContainer: {
    position: "absolute",
    display: "flex",
    flexFlow: "column",
    padding: 5,
    cursor: "all-scroll",
    borderRadius: "0px 0px 80px 80px",
    border: "1px solid #2c5367",
    width: 130,
    height: 75,
    backgroundColor: theme.palette.background.paper
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  avatar: {
    marginRight: 10,
    width: 25,
    height: 25
  },
  filterType: {
    textAlign: "center"
  }
});

const FilterElement = ({
  classes,
  elementId,
  elementLabel,
  filterType,
  x,
  y
}) => (
  <div
    id={elementId}
    className={classes.operatorContainer}
    style={{ left: x, top: y }}
  >
    <div className={classes.titleContainer}>
      <Avatar
        className={classes.avatar}
        style={{ backgroundColor: operatorsExtraInfo[2].backgroundColor }}
      >
        {React.createElement(operatorsExtraInfo[2].IconComponent)}
      </Avatar>
      <Typography variant="subheading" noWrap>
        {elementLabel}
      </Typography>
    </div>
    <Typography className={classes.filterType} variant="body2" noWrap>
      {filterType}
    </Typography>
  </div>
);

FilterElement.propTypes = {
  classes: PropTypes.object.isRequired,
  elementId: PropTypes.string.isRequired,
  elementLabel: PropTypes.string.isRequired,
  filterType: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default withStyles(styles)(FilterElement);
