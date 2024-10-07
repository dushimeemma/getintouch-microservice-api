# GetInTouch Microservice

The **GetInTouch Microservice** is a Node.js-based service built using NestJS that handles user messages for a contact form. It supports storing user messages (full name, email, phone, message, and optional file uploads) in a MongoDB database or sending the messages directly via email. Files are stored in Firebase Storage.

## Features

- Accepts user messages via a REST API (`POST /api/v1/getintouch`).
- Two options for handling messages:
  - Option 1: Send the message directly as an email.
  - Option 2: Save the message and file uploads to a MongoDB database and Firebase Storage.
- All files uploaded are stored on Firebase Storage.
- Messages can be retrieved from the database (`GET /api/v1/getintouch`).
- Firebase Admin SDK is used for interacting with Firebase services.
- Requires authentication using a key passed in the request headers.
- Dockerized for easy deployment.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Docker Setup](#docker-setup)
- [Deployment on Render](#deployment-on-render)
- [Endpoints](#endpoints)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/getintouch-microservice.git
   cd getintouch-microservice
   ```

2. Install dependencies:

   ```bash
   $ yarn
   ```

3. Ensure you have `admin.sdk.json` (your Firebase Admin SDK key file) in the root directory of the project. This file should be added to `.gitignore`.

4. Set up your environment variables (see [Environment Variables](#environment-variables)).

5. Run the application:

   ```bash
   $ yarn start:dev
   ```

## Environment Variables

Ensure the following environment variables are set in a `.env` file:

```bash
$ mv .env.example .env
```

## Author

[Emmanuel Dushime](https://github.com/dushimeemma)
