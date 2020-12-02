import React from "react";
import { Table } from "react-bootstrap";
import translation from "./translation";
import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";

interface HopProps {
  dryHops: HopAddition[];
  brewLengthInL: number;
}

export default function DryHops(props: HopProps) {
  const { dryHops, brewLengthInL } = props;
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_type, t_quantity, t_AF } = translation[userLanguage];

  if (!dryHops.length) {
    return null;
  }

  return (
    <div>
      <h2> Dry Hop </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t_type}</th>
            <th>{t_AF}</th>
            <th>{`${t_quantity} (g)`}</th>
          </tr>
        </thead>
        <tbody>
          {dryHops.map((hopAddition: HopAddition) => {
            const {
              id,
              name,
              dryHopTimingInPercentageAF,
              dryHopRateInGramsPerLitre,
            } = hopAddition;

            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{dryHopTimingInPercentageAF}</td>
                <td>{dryHopRateInGramsPerLitre * brewLengthInL}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
