# Recipt maker app

## Requirements

Docker on [Windows](https://www.docker.com/products/docker-desktop/)

### Testing Locally

After cloning and go to root directory and run

```
docker compose up
```

This takes around 5 minutes (depending on you machine). It builds react client, node server and postgres server. Once the build is completed, navigate to following url to test -

[http://localhost:3000](http://localhost:3000)

Stop Docker

```
docker compose down -v
```

### Running Locally

After clone, make sure your terminal is in root folder.

## Running Frontend

```
cd client
```

For first time users -

```
npm install
```

```
npm run dev
```

## Running Backend

Open new terminal

```
cd server
```

For first time users -

```
npm install
```

```
npm run dev
```
