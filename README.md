# Instalink Server

## Small server implimentation built on top of [instalink lib](https://github.com/ItqanDo/instalink)

### API

`/p/post_id` where post_id is the Instagram image ID.

Example: `https://www.instagram.com/p/BnQQysKB0LF/?taken-by=itqando`

Post id is `BnQQysKB0LF` so the API call should be

`localhost:3300/p/BnQQysKB0LF` or whatever server name/id/port you assigned.

Runs by default on port 3300. Add an env variable by the name **INSTALINK_PORT** to run it on a different port.
