import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';


chai.use(chaiHttp);


//This integrating test handle Part 1 of the required task

describe('User Profile Integration', function () {
  this.timeout(5000);
  it('Should create a new user profile and then fetch it', function (done) {
    chai.request(app)
      .post('/api/create-profile')
      .send({ name: 'Ella Ampong' })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        // Expecting a status code, 201
        chai.expect(res).to.have.status(201);

        const Id = res.body._id;
        chai.request(app)
          .get(`/api/profiles/${Id}`)
          .end((err, res) => {
            if (err) {
              done(err);
              return;
            }

             
            chai.expect(res).to.have.status(200);

            // I called done here, making sure the is complete
            done();
          });
      });
  });
});

