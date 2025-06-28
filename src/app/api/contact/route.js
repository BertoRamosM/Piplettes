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
  try {
    const data = await req.json();
    console.log("Received data:", data);

    if (!data.email || !data.subject || !data.message) {
      console.error("Validation error:", data);
      return new Response(JSON.stringify({ message: "Bad request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailContent = generateEmailContent(data);
    console.log("Email content generated");

    await transporter.sendMail({
      ...mailOptions,
      subject: data.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    console.log("Email sent successfully");
    return new Response(JSON.stringify({ message: "Form submitted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to submit form" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}