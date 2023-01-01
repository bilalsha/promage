### **Promage**
A project management app. It includes eslint, typescript, expressjs, prettier, jest already setup for production enviornment

### Database
This app uses noSQL relational database sqlite. We can use other database like PostgreSQL or MySQL with this schema as well. Since schema types are predfined. SQL is faster than NoSQL with predefined and nested queries structure. 
![Alt text](database_design.png?raw=true "Promage Schema")


### Architecture

Took Layered Approach. Separated app into different layers like services, models, controller, middleware and data access layer.

### Logger
Logger application is under /logger folder

### API's

/projects(/:id)

/tasks(/:id)

### Project **Setup**

Use nvm to install the correct version of node:

```bash
nvm install
```

Copy .env.example to .env:

```bash
cp .env.example .env
```

Install packages:

```bash
npm install
```

### **Usage**

Run the app:

```bash
npm run dev
```

Run the prettier:

```bash
npm run prettier
```

Run the linter:

```bash
npm run lint
```

Run the tests:

```bash
npm run test
```

To Run Docker Build
```bash
docker-compose up
```