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
npm run seed:regions
npm run seed:admin
npm run seed:questions
npm run seed:question-assignments
npm run seed:regional-question-cycle
```

### Run the project

```shell
npm run start:prod
```

## About Quiz Flow

### Cycles Scheduling Process

```mermaid
flowchart TD
  subgraph Admin Actions
    A[Admin Adds New Cycle] -->|Creates Cycle| B[(Database: RegionalQuestionCycle)]
  end
  
  subgraph Queue Processor
    B --> C[/Queue: Schedule Next Cycle/]
    C --> D[[Processor: Schedule Next Cycle]]
    D -->|Check if Overlapping Cycle Exists| E{Cycle Overlap?}
    E -->|Yes| F[Skip Cycle Creation]
    E -->|No| G[Check if questions for a given region available]
    G -->|No| F[Skip Cycle Creation]
    G -->|Yes: Create next cycle| B
  end

  subgraph Queue Retry Mechanism
    D --> H[Retry 3 times if error]
  end
```
