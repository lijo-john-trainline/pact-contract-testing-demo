const path = require("path");
const { Pact } = require("@pact-foundation/pact");
const { getOrder } = require("./consumerService");

const provider = new Pact({
  consumer: "Consumer-ABF1",
  provider: "OrderService1",
  port: 1235,
  dir: path.resolve(__dirname, "pact/pacts"),
});

describe("Consumer Pact Test", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  beforeEach(() =>
    provider.addInteraction({
      state: "order with id 1 exists",
      uponReceiving: "a request for order 1",
      withRequest: { method: "GET", path: "/order/1" },
      willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { id: 1, orderStatus: "Pending" },
      },
    })
  );

  test("getOrder() gets a valid order", async () => {
    const order = await getOrder(1, provider.mockService.baseUrl);
    expect(order).toEqual({ id: 1, orderStatus: "Pending" });
  });

  afterEach(() => provider.verify());
});