#### 1. Project init

- Run `npm run init` after git clone. This command might need root access because of `npm link`, so
  feel free to add `sudo` before the command if you get an error related to permissions. Also you
  can resolve this error by updating the global npm context or by using
  [nvm](https://github.com/nvm-sh/nvm).
- Create a `.env.dev` file. Here is an example of a minimal required configuration:

```
FRONTEND_PORT=3000
BACKEND_PORT=8000
DB_PORT=5432

POSTGRES_DB=db
POSTGRES_USER=user
POSTGRES_PASSWORD=user

REDIS_PORT=6380
REDIS_PASS=user
REDIS_URI=redis://default:${REDIS_PASS}@redis:${REDIS_PORT}

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRATION_TIME=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:${BACKEND_PORT}/api/v1/auth/google/callback
GOOGLE_AUTH_SUCCESS_URL=http://localhost:${FRONTEND_PORT}/auth/google-success

MAIL_DOMAIN=
MAIL_API_KEY=
JWT_VERIFICATION_TOKEN_SECRET=
JWT_VERIFICATION_TOKEN_EXPIRATION_TIME=
RESET_PASSWORD_URL=http://localhost:${FRONTEND_PORT}/auth/reset
EMAIL_CONFIRMATION_URL=http://localhost:${BACKEND_PORT}/api/v1/email-confirmation/confirm
LOGIN_URL=http://localhost:${FRONTEND_PORT}/auth/signin

REACT_APP_API_URL=http://localhost:${BACKEND_PORT}/api/v1
REACT_APP_WSS_URL=http://localhost:${BACKEND_PORT}/

BUCKET_PROJECT_ID=
BUCKET_PRIVATE_KEY=
BUCKET_CLIENT_EMAIL=
BUCKET_NAME=
ENVIRONMENT=develop

REACT_APP_AUTH_TOKEN=

INVOICE_SERVICE_PORT=4000
GOTENBERG_PORT=4001
GOTENBERG_URL=http://gotenberg:${GOTENBERG_PORT}

RABBITMQ_PORT=5672
RABBITMQ_DEFAULT_USER=user
RABBITMQ_DEFAULT_PASS=user
RABBITMQ_HOST=rabbitmq:${RABBITMQ_PORT}
RABBITMQ_URL=amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@rabbitmq:5672

STRIPE_SECRET_KEY=
REACT_APP_STRIPE_PUBLIC_KEY=
STRIPE_WEBHOOK_KEY=

=======
---

#### 2. Bootstrap project using Docker Compose

- To build (rebuild) `npm run start:build`
- To start without building `npm run start`
- To stop `npm run stop`

---

