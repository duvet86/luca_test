import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { operatorsExtraInfo } from "sideBar/operators/operatorsData";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import SettingsIcon from "@material-ui/icons/SettingsApplications";

const styles = theme => ({
  operatorContainer: {
    position: "absolute",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    cursor: "all-scroll",
    borderRadius: 5,
    border: "1px solid #7b582d",
    padding: 5,
    width: 165,
    backgroundColor: theme.palette.background.paper
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: 5
  },
  avatar: {
    marginRight: 10,
    width: 25,
    height: 25
  },
  list: {
    overflow: "auto",
    maxHeight: 150,
    padding: 0,
    width: 150
  },
  listItem: {
    padding: 0
  },
  itemIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

const QueryElement = ({ classes, columns, elementId, elementLabel, x, y }) => (
  <div
    id={elementId}
    className={classes.operatorContainer}
    style={{ left: x, top: y }}
  >
    <div className={classes.titleContainer}>
      <Avatar
        className={classes.avatar}
        style={{ backgroundColor: operatorsExtraInfo[1].backgroundColor }}
      >
        {React.createElement(operatorsExtraInfo[1].IconComponent)}
      </Avatar>
      <Typography variant="subheading" noWrap>
        {elementLabel}
      </Typography>
    </div>
    <div>
      <Typography variant="body2" noWrap>
        Columns
      </Typography>
      <Divider />
      <List className={classes.list}>
        {columns.map(({ Label, ColumnName }) => (
          <ListItem key={ColumnName} className={classes.listItem} dense>
            <ListItemIcon className={classes.itemIcon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.listItem}
              classes={{ primary: classes.primary }}
              primary={Label}
            />
          </ListItem>
        ))}
      </List>
    </div>
  </div>
);

QueryElement.propTypes = {
  classes: PropTypes.object.isRequired,
  elementId: PropTypes.string.isRequired,
  elementLabel: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default withStyles(styles)(QueryElement);
