const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            password: 'testpassword'
        });
        expect(res.statusCode).toEqual(201);
    });

    it('should log in a user', async () => {
        const res = await request(app).post('/api/auth/login').send({
            username: 'testuser',
            password: 'testpassword'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeTruthy();
    });
});
