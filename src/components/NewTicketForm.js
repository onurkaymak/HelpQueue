import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { formatDistanceToNow } from 'date-fns';
import { serverTimestamp } from "firebase/firestore";


const NewTicketForm = (props) => {

  const handleNewTicketFormSubmission = (event) => {
    event.preventDefault();
    props.onNewTicketCreation({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      timeOpen: serverTimestamp(),
      formattedWaitTime: formatDistanceToNow(new Date(), {
        addSuffix: true
      })
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;