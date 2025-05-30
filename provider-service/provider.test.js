const { Verifier } = require("@pact-foundation/pact");
const app = require("./providerService");

let server;

beforeAll(() => {
  server = app.listen(8081);
});

afterAll(() => {
  server.close();
});

test("verify CCWEB consumer pact from broker", async() => {

  const verifier = new Verifier({
    provider: "UserService1",
    providerBaseUrl: "http://localhost:8081",
    pactUrls: [
      "http://localhost:9292/pacts/provider/UserService1/consumer/Consumer-CCWEB1/version/1.0.0"
    ],
    publishVerificationResult: true,
    providerVersion: "1.0.0",
  });
  const output = await verifier.verifyProvider();
  return output;
});

test.skip("verify ABF consumer pact from broker", async() => {

  const verifier = new Verifier({
    provider: "OrderService",
    providerBaseUrl: "http://localhost:8081",
    pactUrls: [
      "http://localhost:9292/pacts/provider/OrderService/consumer/Consumer-ABF/version/1.0.0"
    ],
    publishVerificationResult: true,
    providerVersion: "1.0.0",
  });
  const output = await verifier.verifyProvider();
  return output;
});