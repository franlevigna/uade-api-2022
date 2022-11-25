# uade-api-2022
<img align="right" width="50" height="auto" src="https://user-images.githubusercontent.com/33434552/204025334-553dc7c3-0149-40ab-a3a0-679623e7c8ad.png">


# Profeflix
1. [Features](#features)
2. [Clone the project](#clone-the-project)![profeFlix]
3. [Run locally](#run-locally)
4. [Environment Variables](#environment-variables)
5. [Documentation](#documentation)
6. [Tech Stack](#tech-stack)
7. [ERD](#erd)


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

## Clone the project

```bash
  git clone https://github.com/franlevigna/uade-api-2022.git
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


## Run Locally

- Back-end

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




## Documentation

[Endpoints documentation](https://documenter.getpostman.com/view/6179397/2s8YsnVvPH)


## Tech Stack

**Client:** React, React-query, React-Router, MaterialUI

**Server:** Node, Express

**DB:** MySQL

## ERD
<p align="center">
  <img  src="https://user-images.githubusercontent.com/33434552/204020761-2842b727-9bd4-41d1-a3a3-c857a7957ff4.png">
</p>







