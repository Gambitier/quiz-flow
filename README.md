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
    subgraph Admin_Actions
        A[Admin Adds New Cycle] -->|Creates Cycle| B[/Queue 1/]
    end

    subgraph Queue_1_Assign_Question
        B --> C[[Processor: Assign Question]]
        C -->|Assign Region's Question| D[(Database: QuestionAssignment)]
        D -->|Update Assignment| E[/Queue 2/]
        C -->|No Questions Available| F[TODO: Handle No Questions]
    end

    subgraph Queue_2_Schedule_Next_Cycle
        E --> G[[Processor: Schedule Next Cycle]]
        G --> H{Check: Next Cycle Exists?}
        H -->|Yes| I[No Action]
        H -->|No| J[(Database: Schedule Default 7-Day Cycle)]
        J -->|New Cycle| B
    end
```
