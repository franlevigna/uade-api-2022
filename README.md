# uade-api-2022

# Profeflix


## Features

Professor:
- Create/ Update/ Delete/ Publish/ Unpublish lesson
- Accept/reject subscription
- Accept/reject comments

Student:
- Hire a Professor
- Finish/ Cancel subscription
- Rate/ comment lesson

Common: 

- List lessons
- Search by title, subject, type(individual, groupal), frequency(unique, weekly, monthly) and rating

## Run Locally

- Back-end

Clone the project

```bash
  git clone https://github.com/franlevigna/uade-api-2022.git
```

Go to the back-end folder

```bash
  cd back-end
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

- Front-end

Go to the front-end folder

```bash
  cd front-end
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Back-end

`SECRET` = ""

`EMAIL_USER` = "profeflix.mailer@gmail.com"

`EMAIL_PASSWORD` = ""

`BASE_URL` = http://localhost:8000/

`UI_BASE_URL` = http://127.0.0.1:5173/

`CLOUDINARY_NAME` = dbvhvnear

`CLOUDINARY_API_KEY` = ""

`CLOUDINARY_API_SECRET` = ""

`CLOUDINARY_UPLOAD_PRESET` = dev_preset

- UI

`VITE_BASE_URL` = http://localhost:8000/

`VITE_CRUD_BASE_UR` = http://localhost:8000/



## Documentation

[Endpoints documentation](https://documenter.getpostman.com/view/6179397/2s8YsnVvPH)


## Tech Stack

**Client:** React, React-query, React-Router, MaterialUI

**Server:** Node, Express

**DB:** MySQL







