<!-- PROJECT LOGO -->
<p align="center">
  <!-- <a href="https://github.com/zhagm/officeplace">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->
  <h1 align="center">OfficePlace</h1>

  <p align="center">
    A virtual space to work alongside others
    <br />
    <a href="https://github.com/zhagm/officeplace/issues">Report Bug</a>
    ·
    <a href="https://github.com/zhagm/officeplace/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Demo](#demo)
- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

[![Watch the demo here!](https://youtu.be/-vrytNw_v_A)](https://youtu.be/-vrytNw_v_A)

<!-- ABOUT THE PROJECT -->

## About The Project

OfficePlace was built as a part of the [Techtonica](http://techtonica.org) H12020 program.

officeplace.online creates a virtual 'open office' space for your team, closing the distance between remote coworkers so that even when you’re working on your own, you’re working together.

Users can create a virtual environment where users can go for accountability and communication. In times like these when working in a physical office is not an option, it's helpful to have a virtual space that emulates an open office space where you can see when your coworkers/peers are present at their desks.

### Built With

- [React](https://reactjs.org)
- [Redux](https://redux.js.org)
- [Material UI](https://material-ui.com)
- [Node](https://nodejs.org)
- [MongoDB](https://www.mongodb.org)
- [Socket.io](https://socket.io)

<!-- GETTING STARTED -->

## Getting Started

<!-- ### Prerequisites -->

### Installation

Clone the repository

```bash
git clone https://github.com/zhagm/officeplace.git
```

Move into project directory and install all dependencies.

```bash
cd officeplace
```

```bash
npm run install-all
```

The project requires a couple environment variables. You can find a in the root directory named .sample-env
You can update the keys but I put some test keys so that your app still functions as it should.
.sample-env is just a placeholder, we'll want to rename it to .env to work with the [dotenv](https://www.npmjs.com/package/dotenv) library.

```bash
npm run env-setup
```

And voila, you should be ready to run!

<!-- USAGE EXAMPLES -->

## Usage

This project is structured into a separate frontend and backend. To run both concurrently you can run the following command:

```bash
npm run dev
```

<!-- CONTACT -->

## Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

Zhag Magauina - [@zhag_m](https://twitter.com/zhag_m) - zhagdev@gmail.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/zhag
[product-screenshot]: images/screenshot.png
