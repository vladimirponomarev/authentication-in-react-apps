const express = require('express');
const validator = require('validator');
const router = express.Router();

router.post('/signup', function(req, res, next) {
  let validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
  }

  return res.status(200).end();
});

router.post('/login', function(req, res, next) {
  let validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
  }

  return res.status(200).end();
});


/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for a whole form.
 */
function validateSignupForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';

  if (!payload.email || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (!payload.password || !validator.isLength(payload.password, 8)) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
  }

  if (!payload.name || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = "Please provide your name.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';

  if (!payload.email || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = "Please provide your email address.";
  }

  if (!payload.password || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}


module.exports = router;
