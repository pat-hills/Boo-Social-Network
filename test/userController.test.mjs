import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import { expect } from 'chai';


chai.use(chaiHttp);

//This custom unit testing handles Part 2 of the required task

// describe('User Controller (Unit Tests)', () => {
//   beforeEach(() => { });

//   it('should create a new user', async () => {  
//     const response = await chai.request(app).post('/api/create-user').send({ name: 'John Doe' });
//     expect(response).to.have.status(201);
//     expect(response.body).to.be.an('object');
//     expect(response.body).to.have.property('name', 'John Doe');
//   });

//   // Add more unit test cases here, focusing on individual controller functions
// });

describe('User Controller (Unit Tests)', () => {
  let authorId,commentId; // Declare userId to store the created user's ID

  it('should create a new user and an associated comment', async () => {
    // Create a new user
    const userResponse = await chai.request(app).post('/api/create-user').send({ name: 'John Doe' });
    expect(userResponse).to.have.status(201);
    expect(userResponse.body).to.be.an('object');
    expect(userResponse.body).to.have.property('name', 'John Doe');

    // Store the user ID for later use
    authorId = userResponse.body._id;

    // Create a new comment associated with the user
    const commentResponse = await chai.request(app)
      .post(`/api/create-comment`)
      .send({ comments: 'A new comment' })
      .send({ authorId: authorId });

    expect(commentResponse).to.have.status(201);
    expect(commentResponse.body).to.be.an('object');
    expect(commentResponse.body).to.have.property('comments', 'A new comment');
    expect(commentResponse.body).to.have.property('author', authorId);


    commentId = commentResponse.body._id;

    console.log("CommentId:>>>>>>>>" + commentId);

    
  });

  it('should like the created comment', async () => {
    const likeResponse = await chai.request(app)
      .put(`/api/comments/${commentId}/like`)
      .send({ action: 'likes' });

      console.log("likeResponse:>>>>>>>>" + likeResponse.body._id);

    expect(likeResponse).to.have.status(201);
    expect(likeResponse.body).to.be.an('object');
    expect(likeResponse.body).to.have.property('likes').that.is.greaterThan(0);
  });


  it('should dislike the created comment', async () => {
    const dislikeResponse = await chai.request(app)
      .put(`/api/comments/${commentId}/dislike`)
      .send({ action: 'dislikes' });

      console.log("likeResponse:>>>>>>>>" + dislikeResponse.body._id);

    expect(dislikeResponse).to.have.status(201);
    expect(dislikeResponse.body).to.be.an('object');
    expect(dislikeResponse.body).to.have.property('dislikes').that.is.greaterThan(0);
  });

 

 
});