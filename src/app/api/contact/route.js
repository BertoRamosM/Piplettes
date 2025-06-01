import { transporter, mailOptions } from "../../../../config/nodemailer";

const CONTACT_MESSAGE_FIELDS = {
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce((str, [key, value]) => {
    return (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${value} \n\n`);
  }, "");

  const htmlData = Object.entries(data).reduce((str, [key, value]) => {
    return (str += `<h1>${CONTACT_MESSAGE_FIELDS[key]}</h1><p>${value}</p>`);
  }, "");

  return {
    text: stringData,
    html: htmlData,
  };
};

export async function POST(req) {
  const data = await req.json();

  if (!data.email || !data.subject || !data.message) {
    return new Response(JSON.stringify({ message: "Bad request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const emailContent = generateEmailContent(data);

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: data.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    return new Response(
      JSON.stringify({ message: "Form submitted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({ error: "Failed to submit form" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
