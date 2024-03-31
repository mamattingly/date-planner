function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }

  var hasUpperCase = /[A-Z]/.test(password);
  var hasLowerCase = /[a-z]/.test(password);
  var hasDigit = /\d/.test(password);
  var hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecial)) {
    return false;
  }

  return true;
}

module.exports = validatePassword;