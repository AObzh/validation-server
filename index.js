const express = require("express");

const app = express();
const port = 3001;

const isEmptyErrors = (obj) => Object.keys(obj).length === 0;
const requiredFieldErrorMessage = "This field is required";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/validate", (req, res) => {
  const errors = {};
  if (!req?.body?.firstName) {
    errors.firstName = requiredFieldErrorMessage;
  }
  if (!req?.body?.lastName) {
    errors.lastName = requiredFieldErrorMessage;
  }
  if (!req?.body?.bio) {
    errors.bio = requiredFieldErrorMessage;
  }
  if (req?.body?.firstName?.length > 15) {
    errors.firstName = "FirstName should be less than 16 characters";
  }
  if (req?.body?.lastName?.length > 15) {
    errors.lastName = "LastName should be less than 16 characters";
  }
  if (req?.body?.bio?.length > 255) {
    errors.bio = "Bio should be less than 255 characters";
  }

  if (!isEmptyErrors(errors)) {
    res.status(400).json(errors);
  } else {
    res.status(200).json({ success: true });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
