import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { selectFullRecipe } from "../../store/recipes/selectors";

import { hopAdditionInGrams } from "../../BrewingCalculations";
import CheckIcon from "@material-ui/icons/Check";
import "./BrewPage.css";
import { updateBrew } from "../../store/brew/actions";
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
  const [endOfBoilVolume, setEndofBoilVolume] = useState(brewLengthInL);
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
        const quantity = hopAdditionInGrams(
          IBU,
          //@ts-ignore
          percentageAlphaAcidsFromAddition,
          timeOfAdditionInMinBeforeEndOfBoil,
          alphaAcidContent,
          brewLengthInL
        ).toFixed(0);
        return {
          name,
          quantity,
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
  const dispatch = useDispatch();
  function handleSubmit(event: any) {
    event.preventDefault();
    dispatch(
      updateBrew("fermentation", "volumeEndOfBoilingL", endOfBoilVolume)
    );
  }
  const seconds = countdownInS % 60 ? countdownInS % 60 : "00";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Card
        bg={"dark"}
        text={"white"}
        style={{ width: "25rem", alignSelf: "center", marginTop: "1em" }}
        className="mb-2"
      >
        <Card.Header>Boil Timer</Card.Header>
        <Card.Body>
          <Card.Title>
            {`Ends in ${Math.floor(countdownInS / 60)}:${seconds} min`}
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
                    className="timer-button"
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

      <br />
      <InputGroup
        size="lg"
        style={{
          maxWidth: "25rem",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">
            Volume transfered to fermenter (L)
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setEndofBoilVolume(parseFloat(e.target.value))}
          defaultValue={endOfBoilVolume}
        />
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="submit-button"
        >
          Submit
        </Button>
      </InputGroup>
    </div>
  );
}
