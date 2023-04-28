import supertest from "supertest";
import app from "../app";

describe(GET / titles, () => {
  test("Get - 200 returns the exam titles", () => {
    return request(app)
      .get("/titles")
      .expect(200)
      .then((res) => {
        expect(res.body.titles.length).toBe(20);
      });
  });
});
