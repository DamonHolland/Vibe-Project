function validateRegistration(firstName, lastName, username, password, passwordconfirm, email){
  const STRING_MIN = 1;
  const PASSWORD_MIN = 8;
  const STRING_MAX = 30;
  //Regular expressions to check the formatting of user input
  const EMAIL_FORMAT = /\S+@\S+\.\S+/;
  const PASSWORD_FORMAT = /\S*(\S*([a-zA-Z]\S*[0-9])|([0-9]\S*[a-zA-Z]))\S*/;

  const ERROR_FNAME_MIN = "First name is too short.";
  const ERROR_FNAME_MAX = "First name is too long.";
  const ERROR_LNAME_MIN = "Last name is too short.";
  const ERROR_LNAME_MAX = "Last name is too long.";
  const ERROR_USERNAME_MIN = "Username is too short.";
  const ERROR_USERNAME_MAX = "Name is too short.";
  const ERROR_PASSWORD_MIN = "Password is too short.";
  const ERROR_PASSWORD_MAX = "Password is too long.";
  const ERROR_PASSWORD_FORMAT = "Passsword must contain at least one letter, one number, and no spaces.";
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
  if (password.length < PASSWORD_MIN) {
    error_message = error_message.concat("\n" + ERROR_PASSWORD_MIN);
  }
  else if (password.length > STRING_MAX) {
    error_message = error_message.concat("\n" + ERROR_PASSWORD_MAX);
  }
  else if (!PASSWORD_FORMAT.test(password)) {
    error_message = error_message.concat("\n" + ERROR_PASSWORD_FORMAT);
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