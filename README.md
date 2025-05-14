# Bangladesh Election Commission Online Nomination Submission System

## #Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Environments](#environments)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Contact](#contact)
- [Dependencies](#dependencies)

## Description

This project is an online nomination submission system developed for the Bangladesh Election Commission. It provides a secure and user-friendly platform for candidates to submit their nomination forms online. The system streamlines the nomination process, ensuring accuracy and efficiency while reducing the need for physical paperwork.

## Installation

To install and set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/pentaglobalsltd/ec_frontend
   cd <repository-directory>
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
   Or
   ```bash
   yarn
   ```

## Environments

This project repository has three environments:

- **Development**: For active development and testing.
- **Training**: For training purposes and demonstrations.
- **Production**: For the live production environment.

## Usage

#### 1. To start the `dev` server, run:

```bash
npm run dev-private
```

Or

```bash
yarn dev-private
```

#### 2. To start the `training` server, run:

```bash
npm run training
```

Or

```bash
yarn training
```

#### 3. To start the `production` server, run:

```bash
npm run production
```

Or

```bash
yarn production
```

#### 4. To build the project for `dev` environment, run:

```bash
npm run build:dev-private
```

Or

```bash
yarn build:dev-private
```

#### 5. To build the project for `training` environment, run:

```bash
npm run build:training
```

Or

```bash
yarn build:training
```

#### 6. To build the project for `production` environment, run:

```bash
npm run build:production
```

Or

```bash
yarn build:production
```

## Features

- Online nomination form submission
- Keycloak authentication
- Multi-language support with i18next
- Form validation with React Hook Form and Yup
- Responsive design

## Contributing

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes.
4. Commit your changes
   ```bash
   git commit -m 'Add some feature'
   ```
5. Push to the branch
   ```bash
   git push origin feature-branch
   ```
6. Create a Pull Request.

## Contact

For support or questions, please contact info@pentabd.com.

## Dependencies

- @hookform/error-message
- @hookform/resolvers
- @pentabd/icons
- @pentabd/ui
- @react-keycloak/web
- axios
- classnames
- crypto-js
- dayjs
- i18next
- jwt-decode
- keycloak-js
- path
- react
- react-dom
- react-error-boundary
- react-hook-form
- react-i18next
- react-image-gallery
- react-otp-input
- react-pdf
- react-redux
- react-router-dom
- react-toastify
- react-tooltip
- react-webcam
- redux
- redux-devtools-extension
- sass
- typescript
- xss
- yup
