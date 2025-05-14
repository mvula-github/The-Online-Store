const request = require("supertest");
const app = require("./server");

describe("Orders API", () => {
  it("should return a list of orders", async () => {
    const response = await request(app).get("/orders");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should return a single order", async () => {
    const response = await request(app).get("/orders/1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
