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
import { hopAdditionInGrams } from "../../BrewingCalculations";
import CheckIcon from "@material-ui/icons/Check";
interface PropType {
  IBU: number;
  brewLengthInL: number;
  BoilDurationInMin: number;
}

export default function Boil(props: PropType) {
  const { IBU, brewLengthInL, BoilDurationInMin } = props;
  const hopAdditions: HopAddition[] = useSelector(selectFullRecipe)
    .hopAdditions;
  const boilAdditions: HopAddition[] = hopAdditions.filter(
    ({ isDryHop }) => !isDryHop
  );
  const [boilCountdown, setBoilCountdown] = useState({
    countdownInS: BoilDurationInMin * 60,
    active: false,
  });
  const [
    boilAdditionsWithQuantities,
    setBoilAdditionsWithQuantities,
  ] = useState(
    boilAdditions.map(
      ({
        name,
        timeOfAdditionInMinBeforeEndOfBoil,
        percentageAlphaAcidsFromAddition,
        alphaAcidContent,
      }) => {
        return {
          name,
          quantity: hopAdditionInGrams(
            IBU,
            //@ts-ignore
            percentageAlphaAcidsFromAddition,
            timeOfAdditionInMinBeforeEndOfBoil,
            alphaAcidContent,
            brewLengthInL
          ).toFixed(0),
          added: false,
          timeOfAdditionInMinBeforeEndOfBoil,
        };
      }
    )
  );

  useEffect(() => {
    let interval: any = null;
    if (boilCountdown.active) {
      const { countdownInS } = boilCountdown;
      interval = setInterval(() => {
        setBoilCountdown({ ...boilCountdown, countdownInS: countdownInS - 1 });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [boilCountdown]);

  const startCountdown = () => {
    setBoilCountdown({ ...boilCountdown, active: true });
  };
  const { countdownInS, active } = boilCountdown;
  console.log("boilAdditionsWithQuantities", boilAdditionsWithQuantities);
  const addButtonHandler = (targetIndex: number) => {
    setBoilAdditionsWithQuantities(
      boilAdditionsWithQuantities.map((boilAddition, index) => {
        if (index === targetIndex) {
          return { ...boilAddition, added: true };
        }
        return boilAddition;
      })
    );
  };
  return (
    <Card
      bg={"dark"}
      text={"white"}
      style={{ width: "25rem" }}
      className="mb-2"
    >
      <Card.Header>Boil Timer</Card.Header>
      <Card.Body>
        <Card.Title>
          {`Ends in ${Math.floor(countdownInS / 60)}:${countdownInS % 60} min`}
        </Card.Title>

        {active ? (
          countdownInS ? (
            <h2>
              <Badge variant="warning">Counting down</Badge>
            </h2>
          ) : (
            <h2>
              <Badge variant="success">Time to cool the wort</Badge>
            </h2>
          )
        ) : (
          <Button onClick={() => startCountdown()}> Start </Button>
        )}
        <div>
          {boilAdditionsWithQuantities.map(
            (
              { name, quantity, added, timeOfAdditionInMinBeforeEndOfBoil },
              index
            ) => {
              const disabled = added ? true : false;

              const variant =
                //@ts-ignore
                timeOfAdditionInMinBeforeEndOfBoil >= countdownInS / 60
                  ? added
                    ? "outline-success"
                    : "warning"
                  : "secondary";
              return (
                <Button
                  variant={variant}
                  key={`${name}${quantity}`}
                  disabled={disabled}
                  onClick={() => addButtonHandler(index)}
                >
                  {`Add ${quantity}g of ${name} at T-${timeOfAdditionInMinBeforeEndOfBoil}`}{" "}
                  {added ? <CheckIcon style={{ color: "#008000" }} /> : ""}
                </Button>
              );
            }
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
