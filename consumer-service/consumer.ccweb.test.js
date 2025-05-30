const path = require("path");
const { Pact } = require("@pact-foundation/pact");
const { getUser } = require("./consumerService");

const provider = new Pact({
  consumer: "Consumer-CCWEB1",
  provider: "UserService1",
  port: 1234,
  dir: path.resolve(__dirname, "pact/pacts"),
});

describe("Consumer Pact Test", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  beforeEach(() =>
    provider.addInteraction({
      state: "user with id 1 exists",
      uponReceiving: "a request for user 1",
      withRequest: { method: "GET", path: "/user/1" },
      willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { id: 1, name: "Alice" },
      },
    })
  );

  test("getUser() gets a valid user", async () => {
    const user = await getUser(1, provider.mockService.baseUrl);
    expect(user).toEqual({ id: 1, name: "Alice" });
  });

  afterEach(() => provider.verify());
});