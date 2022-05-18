## Installation instructions

## Run Docker Compose

```
docker-compose up
```

or 

```
docker-compose up -d
```

## SQL Migrations

When any existing Flyway migration script is edited, developers need to run
the following command in order to reset their database:

```
docker-compose down --volumes
```

And then, they can do:

```
docker-compose up
```

You can then log into PHPMyAdmin via http://localhost:3029

## More developer doc
See [frontend/CONTRIBUTING.md] and [backend/CONTRIBUTING.md] for more developer documentation.
