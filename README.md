# FMCSA-VIEWER

## 📚 Table of Contents

- [FMCSA-VIEWER](#fmcsa-viewer)
  - [📚 Table of Contents](#-table-of-contents)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [🔧 How to use](#-how-to-use)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
    - [3. Add environment file](#3-add-environment-file)
    - [4. Prepare the database](#4-prepare-the-database)
    - [5. Running the project in development](#5-running-the-project-in-development)
  - [📞 Contact](#-contact)

## 🛠️ Technologies Used

- **Framework**: Next.js with TypeScript
- **Styling**: MUI (Material-UI)
- **Database**: SQLite
- **ORM**: Prisma
- **HTTP Requests**: Axios
- **Spreadsheet Integration**: xlsx

## 🔧 How to use

Follow these steps to set up your local environment and get started with the project:

### 1. Clone the repository

Clone the repository to your local machine using the following command:

```
git clone https://github.com/FabioCeleste/fmcsa.git
```

### 2. Install dependencies

Navigate to the project directory and install the required dependencies using npm:

```
cd fmcsa
npm install
```

### 3. Add environment file

Create a `.env` file in the root directory based on `.env.example` for Prisma database configuration.:

```
DATABASE_URL="file:./database.db"
```

### 4. Prepare the database

This step will delete the migrations and the database, then run new migrations. After that, it will read the content from the spreadsheet located at utils/records.ods and start writing to the database. This step is optional; the code already has a database. Use this step only if you want to create a new database or use a new spreadsheet to create the database.

```
npm run load-new-contents
```

### 5. Running the project in development

With the database configured, run the command to start Next.js:

```
npm run dev
```

## 📞 Contact

- **LinkedIn**: [Fabio Celeste](https://www.linkedin.com/in/fabio-celeste/)
- **GitHub**: [FabioCeleste](https://github.com/FabioCeleste)
- **Email**: [fabio.wow.lol@gmail.com](mailto:fabio.wow.lol@gmail.com)
