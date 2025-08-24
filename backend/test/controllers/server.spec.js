import request from 'supertest';
import app from '../../server.js';

describe('API /products', () => {

    it("Obteniendo un 200 GET", async () => {
        const res = await request(app).get('/products').send();
        const status = res.statusCode;
        expect(status).toBe(200);
    })

    it('Regresa products como un array', async () => {
        const res = await request(app).get('/products');
        expect(res.body.products).toBeInstanceOf(Array);
    });

});

describe('API /users', () => {
    it("Obteniendo un 400 POST", async () => {
        const res = await request(app).get('/users').send();
        const status = res.statusCode;
        expect(status).toBe(400);
    })
})
describe('API /login', () => {
    it("Obteniendo un 400 POST", async () => {
        const res = await request(app).post('/login').send();
        const status = res.statusCode;
        expect(status).toBe(400);
    })
})
describe('API /register', () => {
    it("Obteniendo un 400 POST", async () => {
        const res = await request(app).post('/register').send();
        const status = res.statusCode;
        expect(status).toBe(400);
    })
})