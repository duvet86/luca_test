import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import HelpPageCard from "welcomePage/HelpPageCard";

import linksList from "welcomePage/cardsData";

const styles = {
  container: {
    padding: 25
  }
};

const WelcomePage = ({ classes }) => (
  <Grid container className={classes.container} spacing={16}>
    <Grid item xs={12}>
      <Typography variant="headline" gutterBottom>
        Welcome
      </Typography>
    </Grid>
    {linksList.map(({ id, ...rest }) => (
      <Grid item md={4} xs={12} key={id}>
        <HelpPageCard {...rest} />
      </Grid>
    ))}
  </Grid>
);

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WelcomePage);
