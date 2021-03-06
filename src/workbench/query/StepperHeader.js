import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Stepper, { Step, StepButton } from "@material-ui/core/Stepper";

const styles = theme => ({
  gridTitle: {
    position: "fixed",
    width: "99%",
    backgroundColor: "white",
    zIndex: 2,
    borderBottom: "1px solid #eee"
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2
  },
  title: {
    marginRight: theme.spacing.unit * 2
  },
  stepper: {
    padding: 0,
    width: "100%"
  },
  stepTitle: {
    marginTop: 85
  }
});

const StepperHeader = ({
  classes,
  title,
  stepLabels,
  currentStep,
  completedSteps,
  dispatchGoToStep
}) => {
  const handleStep = stepIndex => () => {
    return dispatchGoToStep(stepIndex);
  };

  return (
    <Fragment>
      <Grid item xs={12} className={classes.gridTitle}>
        <div className={classes.titleContainer}>
          <Typography variant="title" className={classes.title}>
            {title}
          </Typography>
        </div>
        <Stepper
          classes={{ root: classes.stepper }}
          nonLinear
          activeStep={currentStep}
        >
          {stepLabels.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                disabled={completedSteps[index] == null}
                completed={completedSteps[index]}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12} className={classes.stepTitle}>
        <Typography variant="headline">
          {`Step ${currentStep + 1}: ${stepLabels[currentStep]}`}
        </Typography>
      </Grid>
    </Fragment>
  );
};

StepperHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  stepLabels: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
  completedSteps: PropTypes.array.isRequired,
  dispatchGoToStep: PropTypes.func.isRequired
};

export default withStyles(styles)(StepperHeader);
