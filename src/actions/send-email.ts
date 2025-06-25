"use server";

import { render } from "@react-email/components";
import ResonatrEmail from "@/emails/ResonatrEmail";
import transporter from "@/lib/nodemailer";

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const html = await render(ResonatrEmail({ subject, meta }));

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `Resonatr - ${subject}`,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (err) {
    const e = err as Error;

    return { success: false, message: e.message };
  }
}
