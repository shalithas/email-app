"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
require("dotenv/config");
var express = require("express");
var bodyParser = require("body-parser");
var Axios = require("axios");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
var bodyParser__default = /* @__PURE__ */ _interopDefaultLegacy(bodyParser);
var Axios__default = /* @__PURE__ */ _interopDefaultLegacy(Axios);
const requiredVars = [
  "NODE_ENV",
  "PORT",
  "MAIL_GUN_API_URL",
  "MAIL_GUN_API_KEY",
  "MAIL_GUN_DOMAIN",
  "SENDGRID_API_KEY",
  "SENDGRID_API_URL"
];
requiredVars.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});
const config = {
  env: process.env.NODE_ENV,
  logger: {
    level: process.env.LOG_LEVEL || "info",
    enabled: process.env.BOOLEAN ? process.env.BOOLEAN.toLowerCase() === "true" : false
  },
  server: {
    port: Number(process.env.PORT)
  },
  email: {
    sender: process.env.EMAIL_SENDER,
    mailGun: {
      url: process.env.MAIL_GUN_API_URL,
      key: process.env.MAIL_GUN_API_KEY,
      domain: process.env.MAIL_GUN_DOMAIN
    },
    sendGrid: {
      key: process.env.SENDGRID_API_KEY,
      url: process.env.SENDGRID_API_URL
    }
  }
};
const handleAxios = (error2) => {
  if (error2.response) {
    console.log(error2.response.data);
    console.log(error2.response.status);
    console.log(error2.response.headers);
  } else if (error2.request) {
    console.log(error2.request);
  } else {
    console.log("Error", error2.message);
  }
};
var errorFunc = {
  handleAxios
};
const email = (value) => {
  return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value);
};
const textNotEmpty = (value) => {
  return value != null && value != "";
};
var validationsFunc = {
  email,
  textNotEmpty
};
const validations = validationsFunc;
const error = errorFunc;
const validate = (data) => {
  let valid = true;
  const errors = [];
  if (!validations.textNotEmpty(data.subject)) {
    errors.push("Subject cannot be empty");
  }
  if (!validations.textNotEmpty(data.text)) {
    errors.push("Message body cannot be empty");
  }
  if (data.to.length > 0) {
    data.to.forEach((email2) => {
      if (!validations.email(email2)) {
        errors.push(`Email address ${email2} is not valid`);
      }
    });
  } else {
    errors.push("To cannot be empty");
  }
  if (data.cc.length > 0) {
    data.cc.forEach((email2) => {
      if (!validations.email(email2)) {
        errors.push(`Email address ${email2} is not valid`);
      }
    });
  }
  if (data.bcc.length > 0) {
    data.bcc.forEach((email2) => {
      if (!validations.email(email2)) {
        errors.push(`Email address ${email2} is not valid`);
      }
    });
  }
  if (errors.length > 0) {
    valid = false;
  }
  return {
    isValid: valid,
    errors
  };
};
const prepareEmailAddresses = (emailAddresses) => {
  let items = [];
  if (emailAddresses) {
    items = emailAddresses.split(",");
    items = items.map((item) => item.trim());
  }
  return items;
};
const { url: url$1, domain, key: key$1 } = config.email.mailGun;
const sender$1 = config.email.sender;
const send$1 = (to, subject, text, cc, bcc) => {
  return Axios__default["default"]({
    url: `${url$1}/${domain}/messages`,
    method: "POST",
    auth: {
      username: "api",
      password: key$1
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    params: {
      from: `Mail App <${sender$1}>`,
      to: prepareAddresses$1(to),
      cc: prepareAddresses$1(cc),
      bcc: prepareAddresses$1(bcc),
      subject,
      text
    }
  });
};
const prepareAddresses$1 = (emailList) => {
  let output = "";
  emailList.forEach((item, index) => {
    output += `${item} <${item}>${index !== emailList.length - 1 ? ", " : ""}`;
  });
  return output;
};
const { key, url } = config.email.sendGrid;
const sender = config.email.sender;
const send = (to, subject, text, cc, bcc) => {
  const data = getDataStructure(to, subject, text, cc, bcc);
  return Axios__default["default"]({
    url: `${url}/mail/send`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`
    },
    data
  });
};
const prepareAddresses = (emailList) => {
  if (!emailList) {
    return [];
  }
  return emailList.map((item) => ({ email: item }));
};
const getDataStructure = (to, subject, text, cc, bcc) => {
  const personalizations = { to: prepareAddresses(to) };
  if (cc) {
    personalizations.cc = prepareAddresses(cc);
  }
  if (bcc) {
    personalizations.bcc = prepareAddresses(bcc);
  }
  return {
    personalizations: [personalizations],
    from: { email: sender },
    subject,
    content: [
      {
        type: "text/plain",
        value: text
      }
    ]
  };
};
const router = express.Router();
router.get("/", (res) => {
  res.status(405).send({
    errorMessage: "This is not a supported method."
  });
});
router.post("/", async (req, res) => {
  const data = req.body;
  data.to = prepareEmailAddresses(data.to);
  data.cc = prepareEmailAddresses(data.cc);
  data.bcc = prepareEmailAddresses(data.bcc);
  const validation = validate(data);
  console.log(validation);
  if (!validation.isValid) {
    return res.status(500).send({
      errorMessage: validation.errors.join(", ")
    });
  }
  const { to, subject, text, cc, bcc } = data;
  try {
    await send$1(to, subject, text, cc, bcc);
  } catch (error$1) {
    console.log("Mailgun service failed with error");
    error.handleAxios(error$1);
    console.log("Retrying with SendGrid");
    try {
      await send(to, subject, text);
    } catch (error$12) {
      console.log("SendGrid service failed with error");
      error.handleAxios(error$12);
      return res.status(500).send({
        errorMessage: "Unable to send email"
      });
    }
  }
  res.send({
    message: "Email sent successfully"
  });
});
var server = (app2) => {
  app2.get("/", (res, req) => {
    req.send("Welcome to the app");
  });
  app2.use(express.json());
  app2.use("/api/email", router);
};
const app = express__default["default"]();
app.use(bodyParser__default["default"].urlencoded({
  extended: true
}));
server(app);
app.listen(config.server.port, () => {
  console.log(`Server started on port ${config.server.port}`);
});
const viteNodeApp = app;
exports.viteNodeApp = viteNodeApp;
