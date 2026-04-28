import { Resend } from 'resend';

const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@insightafriresearch.com';
const ADMIN = process.env.ADMIN_EMAIL ?? 'insightafri@gmail.com';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder');
}

export async function sendEnquiryNotification(data: {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  serviceInterest?: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  await getResend().emails.send({
    from: FROM,
    to: ADMIN,
    subject: `New enquiry from ${data.name}`,
    html: `
      <h2>New Enquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.organization ? `<p><strong>Organisation:</strong> ${data.organization}</p>` : ''}
      ${data.serviceInterest ? `<p><strong>Service Interest:</strong> ${data.serviceInterest}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  });
}

export async function sendEnquiryConfirmation(to: string, name: string) {
  if (!process.env.RESEND_API_KEY) return;
  await getResend().emails.send({
    from: FROM,
    to,
    subject: 'We received your enquiry',
    html: `
      <h2>Thank you, ${name}.</h2>
      <p>We have received your enquiry and will respond within two business days.</p>
      <p>Insight AfriResearch Ltd<br>
      4th Floor, Hughes Building, Kenyatta Avenue, Nairobi<br>
      020 800 5000 | insightafri@gmail.com</p>
    `,
  });
}

export async function sendTrainingRegistrationConfirmation(
  to: string,
  name: string,
  programTitle: string,
  startDate: Date,
  venue: string,
  fee: number,
) {
  if (!process.env.RESEND_API_KEY) return;
  const dateStr = startDate.toLocaleDateString('en-KE', { dateStyle: 'long' });
  await getResend().emails.send({
    from: FROM,
    to,
    subject: `Registration confirmed: ${programTitle}`,
    html: `
      <h2>Registration confirmed</h2>
      <p>Hello ${name},</p>
      <p>Your registration for <strong>${programTitle}</strong> is confirmed.</p>
      <p><strong>Start Date:</strong> ${dateStr}</p>
      <p><strong>Venue:</strong> ${venue}</p>
      <p><strong>Fee:</strong> KES ${fee.toLocaleString()}</p>
      <p>Payment instructions will follow separately.</p>
      <p>Insight AfriResearch Ltd<br>insightafri@gmail.com | 020 800 5000</p>
    `,
  });
}
