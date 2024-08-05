[![Netlify Status](https://api.netlify.com/api/v1/badges/28ef4188-01a4-40e8-bac6-c6f661b220d3/deploy-status)](https://app.netlify.com/sites/parkinder/deploys)

# Preview Link

[https://parkinder.netlify.app/](https://parkinder.netlify.app/)

# Wemolo Frontend Challenge

Welcome to the Wemolo Frontend Coding Challenge! This application is a training tool to evaluate parking lots, inspired by the Tinder UI. You can swipe right to label a parking lot as outstanding and swipe left to avoid it. You can also review your choices from the session in a summary view.

## Features

- **Tinder View**:

- View metadata and image of one parking lot at a time.

- Label parking lots as "good" or "bad".

- Load the next parking lot after each decision.

- Pre-fetch up to 5 parking lots in advance using pagination.

- Switch to the summary view at any time.

- **Summary View**:

- Review the good and bad parking lots from the current session.

- Group, sort, and filter the results for better overview.

## Technology Stack

- **Framework**: ReactJs with Next.js

- **Type-Safety**: TypeScript.

- **UI Component Library**: Material UI.

- **GraphQL**: Fetch data from the Wemolo GraphQL API.

- **Testing**: Jest for unit tests.

## Getting Started

### Prerequisites

- Node.js

- npm or yarn

### Installation

1. Clone the repository:

```sh

git clone <repository_url>

```

2. Navigate to the project directory:

```sh

cd parkinder-next

```

3. Install dependencies:

```sh

npm install

# or

yarn install

```

### Running the Application

To start the development server:

```sh

npm run dev

# or

yarn dev

```

Open http://localhost:3000 with your browser to see the result.

# Building for Production

To build the application for production:

```sh
npm run build

# or

yarn build
```

To start the production server:

```sh
npm run start

# or

yarn start
```

# Linting

To lint the codebase:

```sh

npm run lint

# or

yarn lint
```

# Testing

To run tests:

```sh

npm run test

# or

yarn test
```

To run tests with coverage:

```sh

npm run test:coverage

# or

yarn test:coverage
```

# GraphQL API

The application fetches data from the Wemolo GraphQL API. It uses pagination to limit the number of parking lots fetched at a time to a maximum of 5.

# Conclusion

Thank you for reviewing the Wemolo frontend challenge submission. If you have any questions or feedback, feel free to reach out.
