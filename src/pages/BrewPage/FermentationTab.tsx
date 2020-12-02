import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Card,
  FormControl,
  InputGroup,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { selectFullRecipe } from "../../store/recipes/selectors";
import { selectBrew } from "../../store/brew/selectors";
import moment from "moment";
import { updateBrew } from "../../store/brew/actions";

export default function FermentationTab() {
  const {
    targetVolumeInLiters,
    volumeEndOfBoilingL,
    timeStartFermentation,
    pitchingTemperature,
    volumeEndOfFermentationInL,
    comments,
  } = useSelector(selectBrew);
  const {
    yeastStrain,
    PitchRateInGramsperLiter,
    FermentationTemperature,
    hopAdditons,
  } = useSelector(selectFullRecipe);
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
  return (
    <div
      style={{
        display: "flex",
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
        <InputGroup size="lg">
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
    </div>
  );
}
