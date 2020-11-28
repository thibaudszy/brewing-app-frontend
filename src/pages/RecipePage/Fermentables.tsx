import React from "react";
import { Table } from "react-bootstrap";
import translation from "./translation";
import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import { calculateMaltQuantity } from "../../BrewingCalculations";

export default function Fermentables(props: any) {
  const { recipe, brewLengthInL } = props;
  const { maltAdditions, OGinPlato } = recipe;

  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_type, t_percentageOfExtract, t_quantity } = translation[
    userLanguage
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{t_type}</th>
          <th>{t_percentageOfExtract}</th>
          <th>{`${t_quantity} (kg)`}</th>
        </tr>
      </thead>
      <tbody>
        {maltAdditions.map((maltAddition: MaltAddition) => {
          return (
            <tr key={maltAddition.id}>
              <td>{maltAddition.name}</td>
              <td>{maltAddition.percentageOfExtract}</td>
              <td>
                {calculateMaltQuantity(
                  OGinPlato,
                  maltAddition.percentageOfExtract,
                  maltAddition.defaultMoistureInPercentage,
                  brewLengthInL
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
