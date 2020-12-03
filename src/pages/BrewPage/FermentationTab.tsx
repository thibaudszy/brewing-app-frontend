import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl, InputGroup, Table } from "react-bootstrap";
import { selectFullRecipe } from "../../store/recipes/selectors";
import { selectBrew } from "../../store/brew/selectors";

import { updateBrew } from "../../store/brew/actions";

export default function FermentationTab() {
  const {
    targetVolumeInLiters,
    volumeEndOfBoilingL,
    timeStartFermentation,
    pitchingTemperature,
  } = useSelector(selectBrew);
  const {
    yeastStrain,
    PitchRateInGramsperLiter,
    FermentationTemperature,
    hopAdditions,
    OGinPlato,
    FGinPlato,
  } = useSelector(selectFullRecipe);
  const dryHops: HopAddition[] = hopAdditions.filter(
    (hopAddition: HopAddition) => hopAddition.isDryHop
  );
  const [inputPitchingTemperature, setInputPitchingTemperature] = useState(
    FermentationTemperature
  );
  const volumeInLiters = volumeEndOfBoilingL || targetVolumeInLiters;
  const yeastPitchInGrams = PitchRateInGramsperLiter * volumeInLiters;
  const dispatch = useDispatch();
  const handleStartFermentationClick = () => {
    dispatch(updateBrew("fermentation", "timeStartFermentation", new Date()));
  };
  function handlePitchingTempSubmit(event: any) {
    event.preventDefault();
    dispatch(
      updateBrew(
        "fermentation",
        "pitchingTemperature",
        inputPitchingTemperature
      )
    );
  }
  console.log("dryhops", dryHops);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginTop: "1em",
      }}
    >
      {!timeStartFermentation ? (
        <Button onClick={() => handleStartFermentationClick()}>
          {" "}
          {`Add ${yeastPitchInGrams} of ${yeastStrain} to the beer at ${FermentationTemperature}C`}{" "}
        </Button>
      ) : !pitchingTemperature ? (
        <InputGroup
          size="lg"
          style={{
            maxWidth: "35rem",
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
            defaultValue={inputPitchingTemperature}
            onChange={(e) => setInputPitchingTemperature(e.target.value)}
          />
          <Button type="submit" onClick={(e) => handlePitchingTempSubmit(e)}>
            {" "}
            Submit{" "}
          </Button>
        </InputGroup>
      ) : (
        ""
      )}
      {dryHops.length ? (
        <div>
          {" "}
          <h2>Dry Hop Schedule</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Variety</th>
                <th>Amount</th>
                <th>When beer density reaches</th>
              </tr>
            </thead>
            <tbody>
              {dryHops.map(
                ({
                  id,
                  name,
                  dryHopRateInGramsPerLitre,
                  dryHopTimingInPercentageAF,
                }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{`${
                      dryHopRateInGramsPerLitre * volumeEndOfBoilingL
                    } g`}</td>
                    <td>
                      {Math.round(
                        //@ts-ignore
                        ((OGinPlato - FGinPlato) * dryHopTimingInPercentageAF) /
                          100
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
