import React from "react";
import { Table } from "react-bootstrap";
import translation from "./translation";
import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
interface Specifications {
  ABV: number;
  IBU: number;
  OGinPlato: number;
  FGinPlato: number;
  colorInEBC: number;
  DesiredCarbonationInGramsPerLiter: number;
}
export default function SpecificationTable(props: Specifications) {
  const {
    ABV,
    IBU,
    OGinPlato,
    FGinPlato,
    colorInEBC,
    DesiredCarbonationInGramsPerLiter,
  } = props;
  const userLanguage: Language = useSelector(selectUserLanguage);
  const {
    t_ABV,
    t_Bitterness,
    t_OG,
    t_FG,
    t_color,
    t_carbonation,
  } = translation[userLanguage];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{t_ABV}</th>
          <th>{t_Bitterness}</th>
          <th>{t_OG}</th>
          <th>{t_FG}</th>
          <th>{t_color}</th>
          <th>{t_carbonation}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ABV}</td>
          <td>{IBU}</td>
          <td>{OGinPlato}</td>
          <td>{FGinPlato}</td>
          <td>{colorInEBC}</td>
          <td> {DesiredCarbonationInGramsPerLiter}</td>
        </tr>
      </tbody>
    </Table>
  );
}
