const {
  getUserById,
  register,
  authUser,
} = require("../controllers/users.controller");
const UserService = require("../service/user.service");
const jwtSevice = require("../utils/jwt");

jest.mock("../service/user.service", () => ({
  ...jest.requireActual("../service/user.service"),
  getUser: jest.fn(),
  createUser: jest.fn(),
}));

jest.mock("../utils/jwt", () => ({
  ...jest.requireActual("../utils/jwt"),
  verifyJwt: jest.fn(),
}));

const user = {
  user_name: "bob",
};

describe("test Controller Users", () => {
  test("getUserById Function EndPoint", async () => {
    const mockSend = jest.fn();

    const request = {
      params: {
        id: 1,
      },
    };

    const response = {
      send: mockSend,
    };

    UserService.getUser.mockResolvedValue(user);

    await getUserById(request, response);

    expect(mockSend).toHaveBeenCalledWith(user);
  });
  test("register Function EndPoint", async () => {
    const mockStatus = jest.fn();
    const mockJson = jest.fn();

    const request = {
      body: {
        user_name: "bob",
        user_email: "bobi@gmail.com",
        user_password: "12345678",
      },
    };

    const response = {
      status: mockStatus,
      json: mockJson,
    };

    UserService.createUser.mockResolvedValue(user);

    await register(request, response);

    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith(user);
  });
  test("Test authUser Controller", async () => {
    jwtSevice.verifyJwt.mockResolvedValue({ _doc: { user_name: "bob" } });

    const mockJsonMethod = jest.fn();
    const mockStatus = jest.fn();
    const response = {
      json: mockJsonMethod,
      status: mockStatus,
    };
    const request = {
      cookies: {
        token: "token",
      },
    };

    await authUser(request, response);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJsonMethod).toHaveBeenCalledWith({
      success: true,
      user: { user_name: "bob" },
    });
  });
  test("Test authUser Controller Failed", async () => {

    jwtSevice.verifyJwt.mockReturnValue(null);

    const mockJsonMethod = jest.fn();
    const mockStatus = jest.fn();
    const mockSend = jest.fn();

    const response = {
      json: mockJsonMethod,
      status: mockStatus,
      send:mockSend
    };
    const request = {
      cookies: {
        token: null,
      },
    };

    await authUser(request, response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({error:"token is not valid"});
  });
});
