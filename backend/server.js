const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const filePath = path.join("sales.json");
const app = express();
const PORT = process.env.PORT || 3000;

function readSalesFile() {
  try {
      if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, JSON.stringify([])); // Kreiraj prazan niz ako fajl ne postoji
      }
      const data = fs.readFileSync(filePath);
      return JSON.parse(data);
  } catch (error) {
      console.error("Greška pri čitanju fajla:", error);
      return [];
  }
}

function writeSaleToFile(product) {
  const sales = readSalesFile();
  sales.push(product);
  fs.writeFileSync(filePath, JSON.stringify(sales, null, 2));
}

// Middleware
app.use(cors({origin: "http://127.0.0.1:5500", credentials: true}));
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({extended: true}));

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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Ruta za slanje mejla
app.post("/send-email", async (req, res) => {
  const { name, email, address, phone, day, month, year, time, products, totalPrice, argsForPDF } = req.body;

  if (!email || !name || !address || !products || products.length === 0) {
    return res.status(400).json({ message: "Nedostaju podaci!" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: "Pogresan format emaila"})
  }

  //pisanje u sales.json
  products.forEach(prod => {
    let productForSales = {
      id: prod.id,
      name: prod.name,
      price: prod.price,
      quantity: prod.quantity,
      day: day,
      month: month,
      year: year
    }

    writeSaleToFile(productForSales);
  })

  const date = `${day}. ${month}. ${year}`;

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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email uspešno poslat!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Greška pri slanju emaila." });
  }
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET_KEY = process.env.SECRET_KEY;
const LOGIN = process.env.LOGIN;
const FORM = process.env.FORM;
const LOGOUT = process.env.LOGOUT;

app.post(LOGIN, (req, res) => {
  const {email, password} = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ success: true, token});
  } else {
    return res.status(401).json({ success: false, message: "Pogresan email ili lozinka" });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Pristup odbijen" });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Nevažeći token" });

      req.admin = decoded.admin;
      next();
  });
}

app.get(FORM, authenticateToken, (req, res) => {
  let data = readSalesFile();
  res.json({ sales: data });
})

app.post(LOGOUT, (req, res) => {
  res.json({ success: true });
})

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});