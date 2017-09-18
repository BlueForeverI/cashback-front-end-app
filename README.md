# Cashback SPA

## Dependencies
 * VueJS 2.0 - [Documentation](https://vuejs.org/v2/guide/)
 * Axios - Promise based HTTP client ([Github](https://github.com/mzabriskie/axios))
 * Vue-router - Route management. [Documentation](https://router.vuejs.org/en/)
 * Vuex - State management. [Documentation](https://vuex.vuejs.org/en/intro.html)

## Configuration
Environment variables used in the application can be found in env.js file

| Variable Name | Description |
 | ------            | ------ |
 | **api_url**       | API url of the application.
 | **grant_type** 	 | Grant type to be used when doing authentication |
 | **client_id** 	 | Client identifier|
 | **client_secret** | Client secret|
 | **scope** | Scope of the authorization granted |

 Following variables are needed for [OAuth 2.0](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) authentication. For values of the grant_type, client_id, client_secret and scope you can use values that can be seeded with 'gradle seedData' command in the backend app.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
