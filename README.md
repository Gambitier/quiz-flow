# Quiz Flow

## Usage

Copy `.env.sample` file and rename it to `.env` and update necessary configs

### Install packages

```shell
npm install
npm run build
```

### Migrate database

```shell
npx prisma migrate dev
```

seed required data

```shell
npm run seed:admin
npm run seed:regions
npm run seed:questions
npm run seed:question-assignments
```

### Run the project

```shell
npm run start:prod
```
