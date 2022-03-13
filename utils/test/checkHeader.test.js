const jwt = require("jsonwebtoken");
const checkHeader = require("../checkHeader");
jest.mock("jsonwebtoken");

describe("Header 검증", () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  test("Header에 accessToken이 존재하지 않을 경우 401 에러를 보낸다.", () => {
    const req = {
      headers: {
        authorization: `Bearer `,
      },
    };
    checkHeader(req, res, next);
    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith("Unauthorized");
  });
});
