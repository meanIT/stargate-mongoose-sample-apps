# sample-apps

Official sample apps for [astra-mongoose](https://npmjs.com/package/@datastax/astra-mongoose).

## Getting Started

Each directory contains an isolated sample Node.js application.
The following is a list of available sample apps.

* [netlify-functions-ecommerce](netlify-functions-ecommerce) - E-commerce shopping cart with Netlify Functions and Stripe
* [discord-bot](discord-bot) - Discord bot integration example
* [typescript-express-reviews](typescript-express-reviews) - Vehicle review API with TypeScript and Express
* [photography-site-demo](photography-site-demo.js) - Photography site with vector search capabilities

## Prerequisites

In order to run these demos, you'll need to have [Node.js](https://nodejs.org) 20.6.0 or higher installed.

You'll also need to run a copy of the Stargate infrastructure stack including the Data API.
The simplest way to do this is by using the script found under the [bin](bin) directory
to start the stack with [Docker](https://docker.com):

```bash
cd stargate-mongoose-sample-apps
bin/start_data_api.sh
```

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/meanIT/stargate-mongoose-sample-apps.git
   cd stargate-mongoose-sample-apps
   ```

2. **Start the Stargate Data API** (using Docker)
   ```bash
   bin/start_data_api.sh
   ```

3. **Choose a sample app and follow its README**
   ```bash
   cd netlify-functions-ecommerce
   npm install
   # Follow the specific README.md in each sample directory
   ```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

For security best practices and reporting vulnerabilities, see [SECURITY.md](SECURITY.md).

## Troubleshooting

### Node.js Version Issues
Ensure you're using Node.js 20.6.0 or higher:
```bash
node --version
```

If using nvm:
```bash
nvm use
```

### Docker Issues
Make sure Docker is running:
```bash
docker ps
```

### Port Conflicts
Check if ports 8181 (Data API) or 8081 (Auth) are already in use:
```bash
lsof -i :8181
lsof -i :8081
```

### Database Connection Issues
Verify the Stargate Data API is running and accessible:
```bash
curl http://127.0.0.1:8181/v1/
```

## License

MIT

