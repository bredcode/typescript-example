export interface EmailService {
  send(to: string, message: string): string | Promise<string>;
}

export function sendEmail(emailService: EmailService, to: string, message: string): string | Promise<string> {
  return emailService.send(to, message);
}
