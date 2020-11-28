import React from "react";
import { Table } from "react-bootstrap";
import translation from "./translation";
import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";

interface MashProps {
  mashSteps: MashStep[];
}

export default function MashSchedule(props: MashProps) {
  const { mashSteps } = props;

  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_duration, t_temperature } = translation[userLanguage];

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t_duration}</th>
            <th> {t_temperature} </th>
          </tr>
        </thead>
        <tbody>
          {mashSteps.map((mashStep: MashStep) => {
            const { id, durationInMin, temperature } = mashStep;

            return (
              <tr key={id}>
                <td>{durationInMin}</td>
                <td>{temperature}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
