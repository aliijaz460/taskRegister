const request = require('supertest');
const app = require('../app');

describe('Task API', () => {
    it('should get all tasks for a user', async () => {
        const token = await loginAndGetToken();
        const res = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });

    it('should create a task', async () => {
        const token = await loginAndGetToken();
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Task', category: 'Work' });
        expect(res.statusCode).toEqual(201);
    });
});

async function loginAndGetToken() {
    const res = await request(app).post('/api/auth/login').send({
        username: 'testuser',
        password: 'testpassword'
    });
    return res.body.token;
}
