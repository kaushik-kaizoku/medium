# Tech Stack  
1.React in the frontend  
2.Cloudflare workers in the backend  
3.zod as the validation library, type inference for the frontend types  
4.Typescript as the language  
5.Prisma as the ORM, with connection pooling  
6.Postgres as the database  
7.jwt for authentication  
 

#Setup Guide 

## Setting up the repository
### Clone the repository
```bash
git clone "https://github.com/kaushik-kaizoku/medium"
```
### Install packages
```bash
cd frontend
npm install
```
```bash
cd backend
npm install
```
### Initialize DB
1. Get your connection url from neon.db or aieven.tech similar to this
  ```bash
  postgres://avnadmin:password@host/db
  ```
2. Get connection pool URL from Prisma accelerate https://www.prisma.io/data-platform/accelerate similar to this
  ```bash
  prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTM2M2U5ZjEtNmNjMS00MWNkLWJiZTctN2U4NzFmMGFhZjJmIiwidGVuYW50X2lkIjoiY2I5OTE2NDk0MzFkNWZmZWRmNmFiYzViMGFlOTIwYzFhZDRjMGY5MTg1ZjZiNDY0OTc3MzgyN2IyMzY2OWIwMiIsImludGVybmFsX3NlY3JldCI6Ijc0NjE4YWY2LTA4NmItNDM0OC04MzIxLWMyMmY2NDEwOTExNyJ9.HXnE3vZjf8YH71uOollsvrV-TSe41770FPG_O8IaVgs
  ```
3. Establish connection to database  
  Replace `DATABASE_URL` in `.env`
  ```bash
  DATABASE_URL="postgres://avnadmin:password@host/db"
  ```
  Add `DATABASE_URL` as the connection pool url in `wrangler.toml`
  ```bash
  name = "backend"
  compatibility_date = "2023-12-01"
  
  [vars]
  DATABASE_URL = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTM2M2U5ZjEtNmNjMS00MWNkLWJiZTctN2U4NzFmMGFhZjJmIiwidGVuYW50X2lkIjoiY2I5OTE2NDk0MzFkNWZmZWRmNmFiYzViMGFlOTIwYzFhZDRjMGY5MTg1ZjZiNDY0OTc3MzgyN2IyMzY2OWIwMiIsImludGVybmFsX3NlY3JldCI6Ijc0NjE4YWY2LTA4NmItNDM0OC04MzIxLWMyMmY2NDEwOTExNyJ9.HXnE3vZjf8YH71uOollsvrV-TSe41770FPG_O8IaVgs"
  ```
4. Migrate your database
  ```bash
  npx prisma migrate dev
  ```
5. Add a new env variable `JWT_SECRET` to `wrangler.toml`
```bash
JWT_SECRET = "my_secret_key"
```
### Run the project locally
```bash
cd backend
npm run dev
```
```bash
cd frontend
npm run dev
```

 
