## Documentation

You can see below the API reference of this module.

### Plugin Configuration

- **Object** `config`:
  - `key` (String): The MailerSend API key.

### `send(message)`
Send an email.

#### Params

- **Object** `message`: An object containing:
  - `to_email` (String): The recipient email address.
  - `to_name` (String): The recipient name.
  - `from_email` (String): The sender email address.
  - `from_name` (String): The sender name.
  - `subject` (String): The email subject.
  - `text` (String): The email text content.
  - `html` (String): The email HTML content.

#### Return
- **Promise** A promise resolving the result from MailerSend.

