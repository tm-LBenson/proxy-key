# README

Simple server to return up to five API keys without storing them in GitHub.

## Deploy

1. Fork this repo to your account.
2. On render.com create a new Web Service from your fork.
3. During setup add environment variables named:
   key
   key2
   key3
   key4
   key5
   Add only the ones you need.
4. Set the start command to `node app.js` and deploy.

## Endpoints

Send a POST request to one of these endpoints. Each returns the matching environment variable.

POST /get-key  uses env key  
POST /get-key2 uses env key2  
POST /get-key3 uses env key3  
POST /get-key4 uses env key4  
POST /get-key5 uses env key5

If the variable is not set the server returns 404 with a short message.

## Examples

Fetch
```js
const res = await fetch('https://your-service.onrender.com/get-key2', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{}'
});
const data = await res.json();
// data.key is your value
```
