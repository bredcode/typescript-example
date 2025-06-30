const { EmailService, sendEmail } = require("../../src/mail/mail");

it("sendEmail은 emailService.send를 호출한다", () => {
  const mockService = {
    send: jest.fn().mockReturnValue("sent"),
  };

  const result = sendEmail(mockService, "user@example.com", "Hello!");

  expect(mockService.send).toHaveBeenCalledWith("user@example.com", "Hello!");
  expect(result).toBe("sent");
});
