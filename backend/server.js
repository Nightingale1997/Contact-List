const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

const port = 21111;

const tableName = "users";

// Store contacts in-memory for simplicity
const contacts = new Map();
let contactsId = 0;

app.use(cors());
app.use(express.json());

app.get("/users", async (request, response) => {
  console.log("Received request on 'GET /users'");

  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  response.send(Array.from(contacts, ([id, contact]) => ({ id, ...contact })));
});

app.post("/user", (request, response) => {
  console.log(`Received request on 'POST /user': ${request.body}`);

  const { id, name, address, phone, image } = request.body;
  const contact = { name, address, phone, image };

  if (id || id === 0) {
    // This is a request to update an existing contact
    const existingContact = contacts.get(id);

    if (!existingContact) {
      console.error(
        `No contact with ID '${id}' exists and therefore cannot be updated.`
      );
      response.sendStatus(400);
    } else {
      contacts.set(id, contact);
      console.log(`Contact with ID '${id}' was successfully updated.`);
      response.send({ id });
    }
  } else {
    // This is a request to add a new contact, "generate" an ID and return it to the client
    const id = contactsId++;
    contacts.set(id, contact);
    console.log(
      `Contact was successfully added to contacts with ID '${id}':`,
      JSON.parse(JSON.stringify(contact))
    );
    response.send({ id });
  }

  // Make sure to respond with something if we haven't already
  if (!response.headersSent) {
    console.error("Unexpected error");
    response.sendStatus(500);
  }
});

app.delete("/user", (request, response) => {
  console.log(`Received request on 'DELETE /user': ${request.body}`);

  const { id } = request.body;

  if (id || id === 0) {
    // This is a request to update an existing contact
    const existingContact = contacts.get(id);

    if (!existingContact) {
      console.error(
        `No contact with ID '${id}' exists and therefore cannot be deleted.`
      );
      response.sendStatus(404);
    } else {
      contacts.delete(id);
      response.sendStatus(200);
    }
  } else {
    response.sendStatus(400);
  }

  // Make sure to respond with something if we haven't already
  if (!response.headersSent) {
    console.error("Unexpected error");
    response.sendStatus(500);
  }
});

http.createServer(app).listen(port, (err) => {
  if (err) {
    console.err("Failed to start server", err);
    return;
  }

  console.log(`Server started on http://localhost:${port}`);
});
