import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../config/config.service';
import { MailProps } from '@/common/interface/email.interface';

@Injectable()
export class EmailService {
  private logger: Logger;

  constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) {
    this.logger = new Logger(MailerService.name);
  }

  private sendEmail({ email: to, name, subject, text, html }: MailProps) {
    return this.mailerService.sendMail({
      to,
      from: `${this.configService.getAppConfig().name} <${name}>`,
      subject: `mhicha Alert: ${subject}`,
      ...(text && { text }),
      ...(html && { html })
    });
  }

  sendPaymentSentMail(email: string, senderName: string, receiverName: string, amount: number) {
    this.logger.log(`Sending payment sent mail to ${email}`);

    return this.sendEmail({
      email,
      name: senderName,
      subject: 'Payment Success',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Payment Success</title>
          </head>
          <body>
            <p>Hi ${senderName},</p>
            <p>You have successfully sent <b>Rs. ${amount}</b> to <b>${receiverName}</b>.</p>
            <br />
            <p><i>Note: This is a system generated email. Please do not reply to this email.</i></p>
            <br />
            <p>Thank you for using our service.</p>
            <p>mhicha</p>
          </body>
        </html>
      `
    });
  }

  sendPaymentReceivedMail(email: string, senderName: string, receiverName: string, amount: number) {
    this.logger.log(`Sending payment received mail to ${email}`);

    return this.sendEmail({
      email,
      name: receiverName,
      subject: 'Payment Received',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Payment Received</title>
          </head>
          <body>
            <p>Hi ${receiverName},</p>
            <p>You have successfully received <b>Rs. ${amount}<b> from <b>${senderName}</b>.</p>
            <br />
            <p><i>Note: This is a system generated email. Please do not reply to this email.</i></p>
            <br />
            <p>Thank you for using our service.</p>
            <p>mhicha</p>
          </body>
        </html>
      `
    });
  }

  sendTransferMail(
    senderEmail: string,
    receiverEmail: string,
    senderName: string,
    receiverName: string,
    amount: number
  ) {
    this.sendPaymentSentMail(senderEmail, senderName, receiverName, amount);
    this.sendPaymentReceivedMail(receiverEmail, senderName, receiverName, amount);
  }
}
