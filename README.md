# Aura

# Link to the live project: https://capstone-client.lstribli.now.sh/

# API Documentation:

1. The auth/login endpoint: Users may use POST to send their login credentials to the server, which sends back an encrypted web token allowing them to access all of their own data for the duration of the session. Logging out destroys this token.
   Data from other users is not obtainable even when bypassing the client.

2. The /users endpoint: Users may POST a new set of credentials to the server to allow them access to their newly created account.

3. The /meditaitons endpoint: Users may GET the guided meditations and all information regarding them for use during their sessions. This is a protected endpoint.

4. The /notes endpoint: Users may GET, POST and DELETE notes from their account. This endpoint is protected and a users data may only be viewed and edited by that user.

# Summary

Aura is designed to provide users with guided meditation to suit the User's moods and an opportunity to reflect on their experiences with meditation.

# Technology

The full stack is deployed live and hosted by a third-party.

Front End:
The Front End was built from scratch in VScode, using the React and Javascript programming languages.

Back End: The Back End was built from scratch in VScode, using the node.js, bcrypt, helmet, cors, knex, mocha, supertest and chai languages and libraries.

Database: The Database was built using PostgreSQL and is written in raw SQL.

**********************\*\***********************DEV ONLY************************\*\*\*\*************************

# Server

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb aura`, `createdb aura-test`
- Create database user: `createuser aura`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE aura TO aura`
  - `GRANT ALL PRIVILEGES ON DATABASE "aura-test" TO aura`
- Prepare environment file: `cp example.env .env`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`

### Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:

```
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Sample Data

- To seed the database for development: `psql -U aura -d aura -a -f seeds/seed.allTables.sql`
- To clear seed data: `psql -U aura -d aura -a -f seeds/trunc.allTables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`
