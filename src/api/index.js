export const SERVER_URL = 'http://localhost:9090'

export const VERSION = 'v1'

export const myFetcher = (url, args) => fetch(url, args).then(res => res.json())