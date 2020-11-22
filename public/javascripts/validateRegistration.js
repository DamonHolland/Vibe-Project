function validateFirstName(firstName) {
  const FIRST_NAME_MIN = 1;
  const FIRST_NAME_MAX = 30;
  const ERROR_FNAME_MIN = "First name is too short.";
  const ERROR_FNAME_MAX = "First name is too long.";

  let error_message = 0;

  if (firstName.length < FIRST_NAME_MIN) {
    error_message = ERROR_FNAME_MIN;
  }
  else if (firstName.length > FIRST_NAME_MAX) {
    error_message = ERROR_FNAME_MAX;
  }

  return error_message;
}

function validateLastName(lastName) {
  const LAST_NAME_MIN = 1;
  const LAST_NAME_MAX = 30;
  const ERROR_LNAME_MIN = "Last name is too short.";
  const ERROR_LNAME_MAX = "Last name is too long.";

  let error_message = 0;

  if (lastName.length < LAST_NAME_MIN) {
    error_message = ERROR_LNAME_MIN;
  }
  else if (lastName.length > LAST_NAME_MAX) {
    error_message = ERROR_LNAME_MAX;
  }

  return error_message;
}

function validateUsername(username) {
  const FIRST_USERNAME_MIN = 5;
  const FIRST_USERNAME_MAX = 30;
  const ERROR_USERNAME_MIN = "Username is too short.";
  const ERROR_USERNAME_MAX = "Username is too short.";

  let error_message = 0;

  if (username.length < FIRST_USERNAME_MIN) {
    error_message = ERROR_USERNAME_MIN;
  }
  else if (username.length > FIRST_USERNAME_MAX) {
    error_message = ERROR_USERNAME_MAX;
  }

  return error_message;
}

function validatePassword(password, passwordConfirm) {
  const PASSWORD_MIN = 8;
  const PASSWORD_MAX = 30;
  const PASSWORD_FORMAT = /\S*(\S*([a-zA-Z]\S*[0-9])|([0-9]\S*[a-zA-Z]))\S*/;
  const ERROR_PASSWORD_MIN = "Password is too short.";
  const ERROR_PASSWORD_MAX = "Password is too long.";
  const ERROR_PASSWORD_FORMAT = "Passsword must contain at least one letter, one number, and no spaces.";
  const ERROR_PASSWORD_MATCH = "Passswords do not match.";

  let error_message = 0;

  //Validate Password
  if (password.length < PASSWORD_MIN) {
    error_message = ERROR_PASSWORD_MIN;
  }
  else if (password.length > PASSWORD_MAX) {
    error_message = ERROR_PASSWORD_MAX;
  }
  else if (!PASSWORD_FORMAT.test(password)) {
    error_message = ERROR_PASSWORD_FORMAT;
  }
  else if (password != passwordConfirm) {
    error_message = ERROR_PASSWORD_MATCH;
  }

  return error_message;
}

function validateEmail(email) {
  const EMAIL_FORMAT = /\S+@\S+\.\S+/;
  const ERROR_EMAIL_FORMAT = "Invalid Email."

  let error_message = 0;

   if (!EMAIL_FORMAT.test(email)) {
    error_message = ERROR_EMAIL_FORMAT;
  }

  return error_message;
}

function validateSecurityAnswer(answer) {
  const ANSWER_MIN = 1;
  const ANSWER_MAX = 30;
  const ERROR_ANSWER_MIN = "You must answer a security question.";
  const ERROR_ANSWER_MAX = "Security answer too long.";

  let error_message = 0;

  if (answer.length < ANSWER_MIN) {
    error_message = ERROR_ANSWER_MIN;
  }
  else if (answer.length > ANSWER_MAX) {
    error_message = ERROR_ANSWER_MAX;
  }

  return error_message;
}

module.exports = { 
  validateFirstName,
  validateLastName,
  validateUsername,
  validatePassword,
  validateEmail,
  validateSecurityAnswer
}