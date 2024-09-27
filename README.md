# Quiz Flow

## Introduction

The application implements a cycle scheduling process for assigning questions to users based on their region. The following flowchart illustrates the high-level operations involved in this process:

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
    G -->|Schedule job with delay| H[/Queue:Process Job Before Cycle End/]
  end

  subgraph Queue Retry Mechanism
    D --> I[Retry 3 times if error]
  end

  H -->|Wait until delay| D
```

The Bullboard interface is available at http://localhost:3000/api/v1/bullboard for monitoring queue activities.

![bullboard](image.png)


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

### Swagger 

The Swagger interface is available at http://localhost:3000/swagger
