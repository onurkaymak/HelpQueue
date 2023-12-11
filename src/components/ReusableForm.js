import React, { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import PropTypes from "prop-types";

const ReusableForm = (props) => {
  // We create a ThemeContext consumer and 
  // get access to the provider value.
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("ThemeContext must be used within a ThemeContext.Provider!");
  }

  // We create button styles.
  const buttonStyles = {
    backgroundColor: theme.buttonBackground,
    color: theme.textColor,
  }

  // We create input styles.
  const inputStyles = {
    backgroundColor: theme.inputBackground,
    color: theme.textColor,
  }


  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          style={inputStyles}
          type='text'
          name='names'
          placeholder='Pair Names' />
        <input
          style={inputStyles}
          type='text'
          name='location'
          placeholder='Location' />
        <textarea
          style={inputStyles}
          name='issue'
          placeholder='Describe your issue.' />
        <button style={buttonStyles} type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
};

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;