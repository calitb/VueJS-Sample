![Deploy Production](https://github.com/calitb/VueJS-Sample/workflows/Deploy%20Production/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/21208728-57ac-4c79-af80-d3397f68d5bc/deploy-status)](https://app.netlify.com/sites/thirsty-easley-66d0cc/deploys)

# VueJS Sample

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run production build

```
npm start
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

## GraphQL

### Types generation

Write your queries in `./src/queries`, and then run:

```
npx apollo client:codegen [OPTIONS] --target=typescript --includes='./src/queries/**.ts' --no-addTypename --outputFlat './src/types'
```

here are the OPTIONS that must be passed:

```
--endpoint=<url>
# url of GraphQL endpoint
```

## Docker

### Run latest production image

```
docker run --rm -p 80:5000 docker.pkg.github.com/calitb/vuejs-sample/demo
```
