const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    describe('index route', () => {
        it('should return an OK status from the index route', async () => {
            const expectedState = 200;
            const response = await request(server).get('/');
            expect(response.status).toEqual(expectedState);
        });
        it('should return a JSON object from the index route', async () => {
            const expectedBody = { api: 'running' };
            const response = await request(server).get('/');
            expect(response.body).toEqual(expectedBody);
        });
        it('should return a JSON object from the index route', async () => {
            const response = await request(server).get('/');
            expect(response.type).toEqual('application/json');
        });
    });
});