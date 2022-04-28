## Web application requirements

Listed below are the requirements of the minimum viable product (MVP) as well as optional suggested features.

### MVP requirements

The application must contain a form which is used to add new contacts to the contact list. In addition, a list of all contacts that have been added must be displayed.

#### Form for adding new contacts

- [x] The form must allow inputting and submitting contact details.
  - [x] Input for name.
  - [x] Input for address.
  - [x] Input for phone number.
  - [x] Button for adding the contact.
- [x] When clicking the "Add contact" button, the input is validated.
  - [x] Input values must not be empty or only whitespace characters.
  - [x] An error is shown if the validation of the input fails.
- [x] When clicking the "Add contact" button and the input is valid, the contact is added to the contacts list.
- [x] When clicking the "Add contact" button and the input is valid, the form is cleared.

#### Contacts list displaying all contacts

- [x] Contact list displays the name, address, and phone of all the contacts that have been added.

### Suggested extra features

Here are a few suggestions on features that may be implemented for this web application. For the features that include server communication, a pre-existing server is provided in the folder `backend`. See document `backend/readme.md` for instructions on how to start up the server locally.

#### Form for adding new contacts

- [x] Input values are remembered when refreshing the page. For example, if the input for the contact's name contains the value "Björn", this value is retained as the contact's name when the page is refreshed.
- [x] The first input of the form is automatically focused when the page is loaded and when a contact has been added.
- [x] When any of the inputs are focused, pressing Enter acts as if the "Add contact" button was clicked.
- [ ] Optional profile picture can be added when creating a contact.
- [x] When clicking the "Add contact" button, the input data is sent to the server as JSON according to the specification described in **[Specification of endpoint `POST /contact`](#specification-of-endpoint-post-contact)**.
- [x] An error is shown if the data is not successfully sent to the server.

#### Contacts list displaying all contacts

- [x] Allow sorting contacts by name, either ascending or descending.
- [x] Allow searching for contacts based on name, address, and phone.
- [x] When opening the page, contacts are fetched from the server according to the specification described in **[Specification of endpoint `GET /contacts`](#specification-of-endpoint-get-contacts)**.
  - [x] While fetching, a message is shown indicating that contacts are being loaded.
- [x] An error is shown if the fetching of contacts fails.
- [x] Existing contacts can be edited. Edited values must be validated the same way as when adding new contacts.
  - [x] If contacts are stored on the server, the edited contact is updated on the server according to the specification described in **[Specification of endpoint `POST /contact`](#specification-of-endpoint-post-contact)**.
  - [x] An error is shown if the update of contact fails. For example, through validation error or server error.

#### General features

- [x] Light/dark theme.
- [x] Responsive design for various screens.

### Your own features

Fill this with any features you have implemented that are not already listed.

- [x] Fetch contacts without page reload on adding a new contact.

---

## Web API specification

### Endpoint `GET /contacts` THIS IS WRONG - /users is right

On a successful request (status code `200`), this endpoint responds with a JSON object according to the following schema:

```json
{
  "type": "object",
  "required": ["contacts"],
  "properties": {
    "contacts": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "type": "object",
            "required": ["id", "name", "address", "phone"],
            "properties": {
              "id": {
                "type": "integer",
                "description": "The identifier of the contact."
              },
              "name": {
                "type": "string",
                "description": "The name of the contact."
              },
              "address": {
                "type": "string",
                "description": "The address of the contact."
              },
              "phone": {
                "type": "string",
                "description": "The phone number of the contact."
              },
              "image": {
                "type": "string",
                "description": "Optional. An image of the contact."
              }
            }
          }
        ]
      }
    }
  }
}
```

**Note:** Schema may be extended as part of implementing extra features.

Example:

```json
{
  "contacts": [
    {
      "id": 1,
      "name": "Alfred",
      "address": "Alfredsvägen 3",
      "phone": "0716942873"
    },
    {
      "id": 2,
      "name": "Pond",
      "address": "Fiskhamnsgatan 7",
      "phone": "+46728394782",
      "image": "/9j/4AAQSkZJRgAB..."
    }
  ]
}
```

### Endpoint `POST /contact`

This endpoint accepts a request containing JSON data (`application/json`) according to the following schema:

```json
{
  "type": "object",
  "required": ["name", "address", "phone"],
  "properties": {
    "id": {
      "type": "integer",
      "description": "Optional. The identifier of an existing contact that should be updated. If the field is not provided, this indicates that a new contact should be added."
    },
    "name": {
      "type": "string",
      "description": "The name of the contact that should be added or updated."
    },
    "address": {
      "type": "string",
      "description": "The address of the contact that should be added or updated."
    },
    "phone": {
      "type": "string",
      "description": "The phone number of the contact that should be added or updated."
    },
    "image": {
      "type": "string",
      "description": "Optional. An image of the contact that should be added or updated. The image should be encoded in Base64."
    }
  }
}
```

**Note:** Schema may be extended as part of implementing extra features.

Examples:

```json
{ "name": "Alfred", "address": "Alfredsvägen 3", "phone": "0716942873" }
```

```json
{
  "name": "Pond",
  "address": "Fiskhamnsgatan 7",
  "phone": "+46728394782",
  "image": "/9j/4AAQSkZJRgAB..."
}
```

```json
{ "id": 34, "name": "Frudie", "address": "Mekvägen 12", "phone": "0718271822" }
```

On a successful request (status code `200`), the endpoint responds with a JSON object according to the following schema:

```json
{
  "type": "object",
  "required": ["id"],
  "properties": {
    "id": {
      "type": "integer",
      "description": "The identifier of the contact that has been successfully added or updated."
    }
  }
}
```

**Note:** Schema may be extended as part of implementing extra features.

Example:

```json
{ "id": 43 }
```

---

## Contact

For any questions or feedback, feel free to send an email to [daniel.wassbjer@i3tex.com](mailto:daniel.wassbjer@i3tex.com).
