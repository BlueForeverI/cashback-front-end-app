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

 Following variables are needed for [OAuth 2.0](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) authentication. For values of the grant_type, client_id, client_secret and scope you can use values that can be seeded with 'gradle seedData' command in the backend app. See Cashback API backend [documentation](https://github.com/BlueForeverI/cashback-back-end-app).



## Building
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Running 
default development server points at http://localhost:8080

## Branching and pull requests

The following branching convention is used:

| Branch | Description |
| ------ | ------ |
| master | Used for production |
| dev | Used for dev/QA |
| Feature branch | Used for a separate feature. The name should be `CS-{Trello task ID}`. Example: `CS-30` |

When a feature is ready, a PR should be made to `dev`. The feature branch should not break the Gradle build.
The PR, branch and commit(s) should be attached to the Trello task manually. via (Power-Ups/GitHug option on the right when editing a task)
