import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import { app, server } from '../src/app';
import { db } from '../src/db';

describe("GET /api/v1/users", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return all users with a 200 status", async () => {
    const mockUsers = [{ id: 1, name: "Alice", age: 25, email: "alice@mail.com", }, { id: 2, name: "Bob", age: 25, email: "bob@mail.com" }];
    sinon.stub(db.query.usersTable, "findMany").resolves(mockUsers);

    const response = await request(app).get("/api/v1/users");

    expect(response.status).to.equal(200);
    expect(response.body.data).to.deep.equal(mockUsers);
    expect(response.body.message).to.equal("Get all users data success");
  });
});

describe("POST /api/v1/users", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should create a new user and return a 201 status with user data", async () => {
    const newUser = { name: "John Doe", age: 25, email: "johndoe@email.com" };
    const mockCreatedUser = { id: 1, ...newUser };

    sinon.stub(db, "insert").returns({
      values: sinon.stub().returns({
        returning: sinon.stub().resolves([mockCreatedUser]),
      }),
    } as any);

    const response = await request(app).post("/api/v1/users").send(newUser);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("status", 201);
    expect(response.body).to.have.property("message", "User created successfully");
    expect(response.body.data).to.deep.equal(mockCreatedUser);
  });

  it("should return a 400 status if input data is invalid", async () => {
    const invalidUser = { name: "", age: "twenty-five", email: "invalidemail.com" };

    const response = await request(app).post("/api/v1/users").send(invalidUser);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("status", 400);
    expect(response.body).to.have.property("message").that.includes("Invalid input data");
  });

  it("should return a 500 status if there is an internal server error", async () => {
    const newUser = { name: "Jane Doe", age: 30, email: "janedoe@email.com" };

    sinon.stub(db, "insert").throws(new Error("Internal Server Error"));

    const response = await request(app).post("/api/v1/users").send(newUser);

    expect(response.status).to.equal(500);
  });
});

describe("DELETE /api/v1/users/:id", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should delete a user and return a 200 status with a success message", async () => {
    const userId = 1;
    const mockDeletedUser = { id: userId, name: "Alice", age: 25, email: "alice@mail.com" };

    sinon.stub(db, "delete").returns({
      where: sinon.stub().returns({
        returning: sinon.stub().resolves([mockDeletedUser]),
      }),
    } as any);

    const response = await request(app).delete(`/api/v1/users/${userId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", 200);
    expect(response.body).to.have.property("message", "User deleted successfully.");
  });

  it("should return a 404 status if the user is not found", async () => {
    const userId = 999;

    sinon.stub(db, "delete").returns({
      where: sinon.stub().returns({
        returning: sinon.stub().resolves([]),
      }),
    } as any);

    const response = await request(app).delete(`/api/v1/users/${userId}`);

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status", 404);
    expect(response.body).to.have.property("message", "User not found");
  });

  it("should return a 500 status if there is an internal server error", async () => {
    const userId = 1;

    sinon.stub(db, "delete").throws(new Error("Internal Server Error"));

    const response = await request(app).delete(`/api/v1/users/${userId}`);

    expect(response.status).to.equal(500);
  });
});

describe("PUT /api/v1/users/:id", () => {
  afterEach(() => {
    sinon.restore();
  });

  after((done) => {
    server.close(done);
  });

  it("should update a user and return a 200 status with updated user data", async () => {
    const userId = 1;
    const updateUser = { name: "Jane Doe", age: 30, email: "janedoe@email.com" };
    const mockUpdatedUser = { id: userId, ...updateUser };

    sinon.stub(db, "update").returns({
      set: sinon.stub().returns({
        where: sinon.stub().returns({
          returning: sinon.stub().resolves([mockUpdatedUser]),
        }),
      }),
    } as any);

    const response = await request(app).put(`/api/v1/users/${userId}`).send(updateUser);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", 200);
    expect(response.body).to.have.property("message", "User updated successfully.");
    expect(response.body.data).to.deep.equal(mockUpdatedUser);
  });

  it("should return a 400 status if input data is invalid", async () => {
    const userId = 1;
    const invalidData = { name: "", age: "thirty", email: "invalidemail" };

    const response = await request(app).put(`/api/v1/users/${userId}`).send(invalidData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("status", 400);
    expect(response.body).to.have.property("message").that.includes("Invalid input data");
  });

  it("should return a 404 status if the user is not found", async () => {
    const userId = 999;
    const updateUser = { name: "Jane Doe", age: 30, email: "janedoe@email.com" };

    sinon.stub(db, "update").returns({
      set: sinon.stub().returns({
        where: sinon.stub().returns({
          returning: sinon.stub().resolves([]),
        }),
      }),
    } as any);

    const response = await request(app).put(`/api/v1/users/${userId}`).send(updateUser);

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status", 404);
    expect(response.body).to.have.property("message", "User not found");
  });

  it("should return a 500 status if there is an internal server error", async () => {
    const userId = 1;
    const updateUser = { name: "Jane Doe", age: 30, email: "janedoe@email.com" };

    sinon.stub(db, "update").throws(new Error("Internal Server Error"));

    const response = await request(app).put(`/api/v1/users/${userId}`).send(updateUser);

    expect(response.status).to.equal(500);
  });
});