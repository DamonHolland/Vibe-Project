function validateRegistration(firstName, lastName, username, password, passwordconfirm, email){
  const STRING_MIN = 1;
  const STRING_MAX = 25;
  //A Regular expression to check the format of entered email against
  const EMAIL_FORMAT = /\S+@\S+\.\S+/;

  const ERROR_FNAME_MIN = "First name is too short.";
  const ERROR_FNAME_MAX = "First name is too long.";
  const ERROR_LNAME_MIN = "Last name is too short.";
  const ERROR_LNAME_MAX = "Last name is too long.";
  const ERROR_USERNAME_MIN = "Username is too short.";
  const ERROR_USERNAME_MAX = "Name is too short.";
  const ERROR_PASSWORD_MIN = "Password is too short.";
  const ERROR_PASSWORD_MAX = "Password is too long.";
  const ERROR_PASSWORD_MATCH = "Passswords do not match.";
  const ERROR_EMAIL_FORMAT = "Invalid Email."

  let error_message = "";

  //Validate First Name
  if (firstName.length < STRING_MIN) {
    error_message = error_message.concat(ERROR_FNAME_MIN);
  }
  else if (firstName.length > STRING_MAX) {
    error_message = error_message.concat("\n" + ERROR_FNAME_MAX);
  }

  //Validate Last Name
  if (lastName.length < STRING_MIN) {
    error_message = error_message.concat("\n" + ERROR_LNAME_MIN);
  }
  else if (lastName.length > STRING_MAX) {
    error_message = error_message.concat("\n" + ERROR_LNAME_MAX);
  }

  //Validate Username
  if (username.length < STRING_MIN) {
    error_message = error_message.concat("\n" + ERROR_USERNAME_MIN);
  }
  else if (username.length > STRING_MAX) {
    error_message = error_message.concat("\n" + ERROR_USERNAME_MAX);
  }

  //Validate Password
  if (password.length < STRING_MIN) {
    error_message = error_message.concat("\n" + ERROR_PASSWORD_MIN);
  }
  else if (password.length > STRING_MAX) {
    error_message = error_message.concat("\n" + ERROR_PASSWORD_MAX);
  }
  else if (password != passwordconfirm) {
    error_message = error_message.concat("\n" + ERROR_PASSWORD_MATCH);
  }

  //Validate Email
  if (!EMAIL_FORMAT.test(email)) {
    error_message = error_message.concat("\n" + ERROR_EMAIL_FORMAT);
  }

  return error_message;
};

module.exports = { validateRegistration }