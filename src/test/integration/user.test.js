import { should } from 'chai'
import chaiHttp from "chai-http";
import { bootstrap } from './../../index.router.js';
import express from "express";

should();

chai.use(chaiHttp);

async function getAdminToken(chai, app) {
          const response = await chai
                    .request(app)
                    .post("/api/v1/auth/login")
                    .send({
                              phone: "01021257615",
                              password: "Admin22@"
                    });
          return response.body.token;
}

describe('admin Statistics', () => {
          let app;
          let token;
          before(async () => {
                    app = express();
                    bootstrap(app);
                    app.listen(5000);
                    token = await getAdminToken(chai, app);
          })
          after(async () => {
                    app.close();
          })
          it('should get statistics', async () => {
                    chai.request(app)
                              .get('/api/v1/user/')
                              .set('token', `${token}`)
                              .end((err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.a('object');
                                        res.body.should.have.property('data');
                                        res.body.should.have.property('page');
                                        res.body.should.have.property('limit');
                                        res.body.should.have.property('total');
                                        res.body.should.have.property('hasNextPage');
                                        res.body.should.have.property('hasPreviousPage');
                              })
          })
})
