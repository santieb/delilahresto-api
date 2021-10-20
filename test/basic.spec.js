require('dotenv').config();
const assert = require('assert');
const fetch = require('node-fetch');
const users = require('../src/models/users.models');

describe('#find()', function () {
  it('responds with matching records', async function () {
    const url = `http://localhost:3000/register`;

    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": "juan",
        "name": "juan",
        "email": "juan@gmail.com",
        "phone": 12345,
        "addressBook": [
          {
            "shippingAddress": "rivadavia"
          },
          {
            "shippingAddress": "falso123"
          }
        ],
        "password": "juan"
      })
    })
    let response = await response.body
    response = response.json()
    return assert.equal(decoded.id, user._id);

  });
});