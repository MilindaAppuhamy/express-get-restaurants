const { execSync } = require("child_process");
execSync("npm run seed");

const request = require("supertest");
const app = require("./src/app");
const db = require("./db/connection");

describe("restaurant endpoints", () => {
  it("should return a status code of 200", async () => {
    const res = await request(app).get("/restaurants");
    expect(res.statusCode).toBe(200);
  });

  it("should return an array of restaurants", async () => {
    const res = await request(app).get("/restaurants");
    expect(Array.isArray(res.body)).toBeTruthy();
  });
  it("should return the correct number of restaurants", async () => {
    const res = await request(app).get("/restaurants");
    expect(res.body.length).toBe(3);
  });

  it("/:id should return the restaurant", async () => {
    const res = await request(app).get("/restaurants/1");
    expect(res.body.name).toBe("AppleBees");
  });

  it("should create a new restaurant when POST method is called", async () => {
    const newRestaurant = {
      name: "Bella-Vita",
      location: "Milan",
      cuisine: "Italian",
    };
    const res = await request(app).post("/restaurants").send(newRestaurant);

    expect(res.statusCode).toEqual(200);
    console.log(res.body);
    expect(res.body[3].name).toBe("Bella-Vita");
  });

  it("should return am error if the POST request is sent with empty values", async () => {
    const newRestaurant = {
      name: "",
      location: "",
      cuisine: "Italian",
    };
    const res = await request(app).post("/restaurants").send(newRestaurant);

    expect(res.statusCode).toEqual(400);
    expect(res.body.error.length).toBe(2);
  });

  it("should update a restuarant when PUT method is called", async () => {
    const updatedRestaurant = {
      name: "BellaVita",
      location: "Verona",
      cuisine: "Italian",
    };
    const res = await request(app)
      .put("/restaurants/4")
      .send(updatedRestaurant);

    expect(res.statusCode).toEqual(200);
    expect(res.body[3].name).toEqual(updatedRestaurant.name);
  });

  it("should delete a restaurant when DELETE method is called", async () => {
    const res = await request(app).delete("/restaurants/4");
    expect(res.statusCode).toEqual(200);
  });
});
