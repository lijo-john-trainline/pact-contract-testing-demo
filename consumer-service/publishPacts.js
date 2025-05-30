// publishPacts.js
const pact = require('@pact-foundation/pact-node');
const path = require('path');

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, './pact/pacts')],
  pactBroker: 'http://localhost:9292', // your Pact Broker URL
  consumerVersion: '1.0.0',            // replace with your app version
  tags: ['dev']
};

pact.publishPacts(opts)
  .then(() => {
    console.log('✅ Pacts published successfully');
  })
  .catch(err => {
    console.error('❌ Pact publish failed: ', err);
  });