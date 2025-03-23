const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({origin: "*"}));
app.use(bodyParser.json({limit: "10mb"}));

// Nodemailer transporter konfiguracija
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("Server je pokrenut i radi!");
});

// Ruta za slanje mejla
app.post("/send-email", async (req, res) => {
  console.log("podaci: " + req.body);
  const { name, email, address, phone, date, time, products, totalPrice, argsForPDF } = req.body;

  if (!email || !name || !address || !products || products.length === 0) {
    return res.status(400).json({ message: "Nedostaju podaci!" });
  }

  // Kreiranje HTML sadrzaja za email
  const productList = products
    .map((p) => `<tr> 
    <td style="text-align: left;"> <b> ${p.name} </b> </td> 
    <td style="text-align: center;"> <b> x ${p.quantity}, </b> </td>
    <td style="text-align: right;"> <b> ${p.quantity * p.price} RSD </b> <td> 
    </tr>`)
    .join("");

  const mailOptions = {
    from: `"Kilex - store" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Potvrda porudžbine",
    html: `
      <h2 style="color: black;">Pozdrav, ${name}!</h2>
      <h3 style="color: black;">Hvala što ste poručili iz naše prodavnice. Detalji porudžbine su:</h3>
      <table style="font-size: 20px; color: black;">${productList}</table>
      <h3 style="color: black;">Ukupna cena porudžbine: <strong> ${totalPrice} </strong> RSD</h3>
      <p style="color: black;">Vreme porudžbine: <strong> ${date}, ${time} </strong> </p>
      <p style="color: black;">Adresa dostave: <strong>${address}</strong></p>
      <p style="color: black;">Vaša porudžbina će uskoro biti obrađena.</p>
    `,
    attachments: [
        {
            filename: "faktura.pdf",
            content: Buffer.from(argsForPDF, "base64"),
            encoding: "base64",
        }
    ]
  };

  const mailOptionsSeki = {
    from: `"Kilex - store" <${process.env.EMAIL_USER}>`,
    to: "kilexxx0@gmail.com",
    subject: "Potvrda porudžbine",
    html: `
      <h2 style="color: black;">Korisnik: ${name}!</h2>
      <h3 style="color: black;">Detalji porudžbine su:</h3>
      <table style="font-size: 20px; color: black;">${productList}</table>
      <h3 style="color: black;">Ukupna cena porudžbine: <strong> ${totalPrice} </strong> RSD</h3>
      <p style="color: black;">Vreme porudžbine: <strong> ${date}, ${time} </strong> </p>
      <p style="color: black;">Adresa dostave: <strong>${address}</strong></p>
    `,
    attachments: [
        {
            filename: "faktura.pdf",
            content: Buffer.from(argsForPDF, "base64"),
            encoding: "base64",
        }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email uspešno poslat!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Greška pri slanju emaila." });
  }

  // try {
  //   await transporter.sendMail(mailOptionsSeki);
  // } catch (error) {
  //   console.error(error);
  // }

});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});