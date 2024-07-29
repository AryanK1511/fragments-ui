# Fragments UI

A frontend UI built using Next.js to test all the functionalities provided by the [fragments API](https://github.com/AryanK1511/fragments).
<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" width="50"/>
  <img src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="NextJS" width="50"/>
  <img src="https://user-images.githubusercontent.com/25181517/183896132-54262f2e-6d98-41e3-8888-e40ab5a17326.png" alt="AWS" width="50"/>
  <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" width="50"/>
  <img src="https://user-images.githubusercontent.com/25181517/183868728-b2e11072-00a5-47e2-8a4e-4ebbb2b8c554.png" alt="GitHub Actions" width="50"/>
</div>
<br />

## How to run this project locally?

### Clone the Repository

Clone this repository on your local computer:

```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies

Run the following command in the root of your project folder to install all the dependencies:

```bash
npm install
```

### Create a `.env.local` file

Create a file called `.env.local` in the root of your repository and initialize the following variables.

```bash
NEXT_PUBLIC_API_URL=<link_to_your_backend>
NEXT_PUBLIC_AWS_COGNITO_POOL_ID=
NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID=
NEXT_PUBLIC_AWS_COGNITO_HOSTED_UI_DOMAIN=
NEXT_PUBLIC_OAUTH_SIGN_IN_REDIRECT_URL=<link_to_your_frontend>
NEXT_PUBLIC_OAUTH_SIGN_OUT_REDIRECT_URL=<link_to_your_frontend>
```

### Running the Project

#### Using the local development server

```bash
npm run dev
```

#### Using docker

Build the image

```bash
docker build -t aryank1511/fragments-ui:latest .
```

Run the container

```bash
docker run --rm --init --name fragments-ui -p 3000:3000 aryank1511/fragments-ui:main
```

> Your server should now be running at `http://localhost:3000`.

## Author

[Aryan Khurana](https://github.com/AryanK1511)
