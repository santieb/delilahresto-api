require('dotenv').config();
const jwt = require('jsonwebtoken');
const assert = require('assert');
const fetch = require('node-fetch');
const users = require('../models/users.models');

describe('#find()', function() {
  it('responds with matching records', async function() {
    const url = `http://localhost:3000/login`;
    
    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin' })
    })
    let response = await response.body
    response = response.json()
    const decoded = jwt.verify(response.token, process.env.SECRET);
    const user = await users.findOne ({ id: decoded._id })
    return assert.equal(decoded.id, user._id);

  });
});