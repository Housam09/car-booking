const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  try {
    const data = JSON.parse(event.body)

    const msg = {
      to: "info@hb-mechanics.com", // your email
      from: "no-reply@hb-mechanics.com", // must be verified in SendGrid
      subject: `New Booking from ${data.name}`,
      text: `
        You received a new booking:

        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Service: ${data.service}
        Date: ${data.date}
        Time: ${data.time}
        Notes: ${data.notes || "None"}
      `,
    }

    await sgMail.send(msg)

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (error) {
    console.error("SendGrid error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    }
  }
}
