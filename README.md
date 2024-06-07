# Documentation for Express Server

## Overview

This document provides details on setting up and running an Express server that retrieves API keys securely based on environment variables. The server includes basic endpoints to check if it's running and to retrieve a key if the correct secret is provided.

## Requirements

- Node.js installed
- npm (Node Package Manager) installed
- dotenv package for managing environment variables

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:

   ```bash
   npm install express dotenv
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following content:
   ```plaintext
   PORT=3000
   SECRET=your-secret-key
   KEY=your-api-key
   ```

## Usage

1. **Start the Server**:

   ```bash
   node index.js
   ```

   or

   ```bash
   npm start
   ```

2. **Server Endpoints**:

   - **GET /**:

     - **Description**: Check if the server is running
     - **Response**:
       ```json
       {
         "message": "Server is running"
       }
       ```

   - **POST /get-key**:

     - **Description**: Retrieve the API key if the correct secret is provided
     - **Request Body**:
       ```json
       {
         "secret": "your-secret-key"
       }
       ```
     - **Response**:
       - **Success (200)**:
         ```json
         {
           "key": "your-api-key"
         }
         ```
       - **Unauthorized (401)**:
         ```json
         {
           "message": "Unauthorized"
         }
         ```

   - **404 Not Found**:
     - **Description**: Handle undefined endpoints
     - **Response**:
       ```json
       {
         "message": "Endpoint not found"
       }
       ```

## Example Code

```javascript
// express server
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Server is running' });
});

app.post('/get-key', (req, res) => {
  if (req.body.secret === process.env.SECRET) {
    res.send({ key: process.env.KEY });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

app.use((req, res) => {
  res.status(404).send({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
