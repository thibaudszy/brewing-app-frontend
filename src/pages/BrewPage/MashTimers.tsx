import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Card,
  InputGroup,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { selectFullRecipe } from "../../store/recipes/selectors";
import { selectBrew } from "../../store/brew/selectors";
import moment from "moment";

export default function MashTimers() {
  const mashSteps: MashStep[] = useSelector(selectFullRecipe).mashSteps;
  const [stepsWithCountdown, setStepsWithCountdown] = useState(
    mashSteps.map(({ stepNo, durationInMin, temperature }) => {
      return {
        stepNo,
        countdownInS: durationInMin * 60,
        temperature,
        active: false,
      };
    })
  );
  const brewLengthInL = useSelector(selectBrew).targetVolumeInLiters;
  const brew = useSelector(selectBrew);

  useEffect(() => {
    let interval: any = null;

    interval = setInterval(() => {
      setStepsWithCountdown(
        stepsWithCountdown.map((step) => {
          const { countdownInS, active } = step;
          if (active && countdownInS > 0) {
            return { ...step, countdownInS: countdownInS - 1 };
          }
          return step;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [stepsWithCountdown]);
  const startCountdown = (targetStepNo: number) => {
    setStepsWithCountdown(
      stepsWithCountdown.map((step) => {
        if (step.stepNo === targetStepNo) {
          return { ...step, active: true };
        }
        return step;
      })
    );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "1em",
      }}
    >
      {stepsWithCountdown.map(
        ({ stepNo, countdownInS, temperature, active }) => (
          <Card
            bg={"dark"}
            key={stepNo}
            text={"white"}
            style={{ width: "18rem" }}
            className="mb-2"
          >
            <Card.Header>{`Step ${stepNo}`}</Card.Header>
            <Card.Body>
              <Card.Title>
                {" "}
                {`Ends in ${Math.floor(countdownInS / 60)}:${
                  countdownInS % 60
                } min`}{" "}
              </Card.Title>
              <Card.Text>{`Temperature: ${temperature}C`}</Card.Text>
              {active ? (
                countdownInS ? (
                  <h2>
                    <Badge variant="warning">Counting down</Badge>
                  </h2>
                ) : (
                  <h2>
                    <Badge variant="success">Step completed</Badge>
                  </h2>
                )
              ) : (
                <Button onClick={() => startCountdown(stepNo)}> Start </Button>
              )}
            </Card.Body>
          </Card>
        )
      )}
    </div>
  );
}
