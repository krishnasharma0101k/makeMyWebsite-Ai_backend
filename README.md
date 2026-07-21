# MakeMyWebsite AI — Backend

The backend API for **MakeMyWebsite AI**, a service that lets users generate, edit, and deploy full websites from natural-language prompts using an LLM. Built with Node.js, Express, and MongoDB.

## Features

- **Google authentication** — passwordless sign-in via Google, session managed with JWT stored in an HTTP-only cookie.
- **AI website generation** — turns a text prompt into a complete, responsive, single-file HTML website using an LLM (via OpenRouter).
- **Conversational website editing** — iteratively update a previously generated site by describing the change you want.
- **Website management** — list, fetch, and retrieve generated sites by ID or slug.
- **One-click "deploy"** — assigns a public slug/URL to a generated site.
- **Credits & billing** — usage-based credit system with Stripe Checkout for plan upgrades and a Stripe webhook to top up credits after payment.

## Tech Stack

- **Runtime:** Node.js (ES modules)
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (`jsonwebtoken`), HTTP-only cookies (`cookie-parser`), `bcrypt`
- **Payments:** Stripe
- **AI:** OpenRouter API (`deepseek/deepseek-chat`)
- **Dev tooling:** `nodemon`, `dotenv`

## Project Structure

```
.
├── src/
│   ├── config/
│   │   ├── openrouter.js      # LLM API client for website generation
│   │   ├── plan.js            # Subscription plan definitions (free/pro/enterprise)
│   │   └── stripe.js          # Stripe SDK setup
│   ├── controllers/
│   │   ├── auth.controller.js         # Google auth, logout
│   │   ├── billing.controller.js      # Stripe checkout session creation
│   │   ├── stripeWebHook.controller.js# Stripe webhook (credit top-up)
│   │   ├── use.controllers.js         # Current user lookup
│   │   └── website.controller.js      # Generate/update/list/deploy websites
│   ├── db/
│   │   └── dbconfig.js        # MongoDB connection
│   ├── middlewares/
│   │   └── auth.middleware.js # JWT verification middleware
│   ├── models/
│   │   ├── user.model.js      # User schema (email, credits, plan)
│   │   └── website.model.js   # Website schema (code, conversation, deploy info)
│   ├── routes/
│   │   ├── auth.Route.js
│   │   ├── billing.route.js
│   │   ├── user.route.js
│   │   └── website.route.js
│   ├── app.js                 # Express app & route registration
│   ├── constants.js           # DB name constant
│   └── index.js                # Entry point
├── utils/
│   └── extracJson.js          # Robust JSON extraction from LLM output
├── package.json
└── .gitignore
```

## Prerequisites

- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)
- A [Stripe](https://stripe.com/) account (secret key + webhook secret)
- An [OpenRouter](https://openrouter.ai/) API key
- A Google OAuth client (for authenticating on the frontend, which sends `name`/`email`/`avatar` to this backend)

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

FRONTEND_URL=https://your-frontend-url.example.com
```

## Installation

```bash
git clone https://github.com/krishnasharma0101k/makeMyWebsite-Ai_backend.git
cd makeMyWebsite-Ai_backend
npm install
```

## Running the App

```bash
# Development (auto-restarts with nodemon)
npm run dev
```

The server starts on `http://localhost:5000` (or your configured `PORT`).

## API Overview

All authenticated routes require a valid `token` cookie (set automatically after Google auth).

### Auth — `/api/auth`
| Method | Endpoint  | Description                          |
|--------|-----------|--------------------------------------|
| POST   | `/google` | Log in / register via Google profile |
| GET    | `/logout` | Clear the auth cookie                |

### User — `/api/user`
| Method | Endpoint | Description               |
|--------|----------|---------------------------|
| GET    | `/me`    | Get the current logged-in user |

### Website — `/api/website`
| Method | Endpoint             | Description                                  |
|--------|-----------------------|----------------------------------------------|
| POST   | `/generate`           | Generate a new website from a prompt         |
| POST   | `/update/:id`         | Update an existing website with a new prompt |
| GET    | `/get-by-id/:id`      | Get a website by its ID                      |
| GET    | `/get-all`            | List all websites for the current user       |
| GET    | `/deploy/:id`         | Assign a deploy slug/URL to a website         |
| GET    | `/get-by-slug/:slug`  | Get a website by its deploy slug              |

### Billing — `/api/billing`
| Method | Endpoint | Description                              |
|--------|----------|-------------------------------------------|
| POST   | `/`      | Create a Stripe Checkout session for a plan |

### Webhooks
| Method | Endpoint             | Description                                  |
|--------|-----------------------|----------------------------------------------|
| POST   | `/api/stripe/wenhook` | Stripe webhook — credits added on successful payment |

## How Website Generation Works

1. The user sends a prompt to `POST /api/website/generate`.
2. The backend checks the user has enough credits, then sends a detailed "master prompt" (enforcing responsive, single-file, framework-free HTML output) to the LLM via OpenRouter.
3. The LLM's raw response is parsed into JSON (`utils/extracJson.js` strips markdown fences and extracts the JSON payload), retrying once with a stricter instruction if parsing fails.
4. The generated HTML is saved to MongoDB along with the conversation history, and the user's credits are decremented.
5. Subsequent edits (`POST /api/website/update/:id`) send the existing HTML plus the new instruction back to the LLM to produce an updated version.

## Notes

- CORS is currently locked to a single origin (`https://makemywebsite-ai.netlify.app`) in `src/app.js` — update this for local frontend development.
- Cookies are set with `secure: true` and `sameSite: "none"`, which requires HTTPS in most browsers — use a tunneling tool (e.g. ngrok) or adjust these flags for local HTTP testing.

## Author

Krishna Sharma

## License

ISC
