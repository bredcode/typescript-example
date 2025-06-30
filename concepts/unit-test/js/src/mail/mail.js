function sendEmail(emailService, to, message) {
  return emailService.send(to, message);
}

module.exports = { sendEmail };
