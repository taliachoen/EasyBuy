const { getUsers } = require("../controllers/users.controller");
const { createAppE2E } = require("../createApp");

describe("Test Controller E2E tests", () => {
  beforeAll(() => {
    createAppE2E();
  });

  test("Test GetUser Controller", async () => {

    const mockStatus = jest.fn();
    const mockJson = jest.fn();
    const response = {
      send: jest.fn(),
      json: mockJson,
      status: mockStatus,
    };
    const request = {};

    await getUsers(request, response);

    console.log(mockJson.mock)

    expect(mockStatus).toHaveBeenCalledWith(200)
    // expect(mockJson).toHaveBeenCalledWith(2)
  });
});
