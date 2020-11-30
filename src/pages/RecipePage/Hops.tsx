import React from "react";
import { Table } from "react-bootstrap";
import translation from "./translation";
import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import { hopAdditionInGrams } from "../../BrewingCalculations";
interface HopProps {
  recipe: FullRecipe;
  brewLengthInL: number;
}

export default function Hops(props: HopProps) {
  const { recipe, brewLengthInL } = props;
  const { mashSteps: hopAdditions, IBU } = recipe;

  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_type, t_timing, t_quantity, t_percentage_of_BUs } = translation[
    userLanguage
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{t_type}</th>
          <th> {t_timing} </th>
          <th>{t_percentage_of_BUs}</th>
          <th>{`${t_quantity} (g)`}</th>
        </tr>
      </thead>
      <tbody>
        {hopAdditions.map((hopAddition: HopAddition) => {
          const {
            id,
            name,
            timeOfAdditionInMinBeforeEndOfBoil,
            percentageAlphaAcidsFromAddition,
            alphaAcidContent,
          } = hopAddition;
          if (
            // Tried to build a type guard at the beggining of the function with filter but it did not work.
            !percentageAlphaAcidsFromAddition ||
            !timeOfAdditionInMinBeforeEndOfBoil
          ) {
            return null;
          }
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{timeOfAdditionInMinBeforeEndOfBoil}</td>
              <td>{percentageAlphaAcidsFromAddition}</td>
              <td>
                {hopAdditionInGrams(
                  IBU,
                  percentageAlphaAcidsFromAddition,
                  timeOfAdditionInMinBeforeEndOfBoil,
                  alphaAcidContent,
                  brewLengthInL
                ).toFixed(0)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
