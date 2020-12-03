import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage } from "../../store/appState/selectors";
import { Alert } from "react-bootstrap";
import { clearMessage } from "../../store/appState/actions";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const showMessage = message !== null;
  if (!showMessage) return null;

  const handleCloseAlert = (dismissable: boolean) => {
    if (dismissable) dispatch(clearMessage());
  };
  return (
    <Alert
      show={showMessage}
      variant={message.variant}
      dismissible={message.dismissable}
      onClose={() => handleCloseAlert(message.dismissable)}
    >
      {message.text}
    </Alert>
  );
}
