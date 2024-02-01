import { beforeEach, describe, expect, it, vi } from 'vitest';

const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Import your server or create an instance for testing
const app = require('../server'); // Make sure to export your app in server.js
app.use(cors());
app.use(express.json());

// Assuming you have the validation logic in a separate file or included directly for this example
app.post('/validate', (req, res) => {
    const { email, likes, reposts, views } = req.body;
    let errors = [];

    // Validation logic here...

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    res.json({ message: 'Succeeded' });
});

describe('POST /validate', () => {
    it('should validate the input data', async () => {
    const response = await request(app)
      .post('/validate')
      .send({
        email: 'test@example.com',
        likes: 5,
        reposts: 5,
        views: 5,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Succeeded' });
  });

  it('returns errors for invalid input', async () => {
    const response = await request(app)
      .post('/validate')
      .send({
        email: 'not-an-email',
        likes: 0, // Invalid value
        reposts: 11, // Invalid value
        views: -1, // Invalid value
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toContain('Invalid email address.');
    expect(response.body.errors).toContain('Likes must be between 1 and 10.');
    expect(response.body.errors).toContain('Reposts must be between 1 and 10.');
    expect(response.body.errors).toContain('Views must be between 1 and 10.');
  });
});
