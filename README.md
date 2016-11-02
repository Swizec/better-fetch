# better-fetch

A tiny ES6 fetch() wrapper that makes your life easier.

Without changing the API, better-fetch **automatically includes cookies**, which would have saved me a very frustrating amount of time yesterday,  lets you **add default headers**, and you can **pass request body as a plain JS object**, none of that `FormData` nonsense.

`better-fetch` works the same as `fetch()`, but is less cumbersome to use.

## In practice better-fetch looks like this:

You install with npm. Or whatever you use to install packages from npmjs.org. Yarn maybe?

```
$ npm install --save better-fetch
```

Then you set up headers that every one of your `fetch()` calls needs. My backend requires an `Authorization`, and an `Accept` header from all calls.

<pre lang="javascript">
// top of project
// src/index.js

import fetch from 'better-fetch';

fetch.setDefaultHeaders({
    Authorization: `Token token=${GlobalTokenValue}`,
    Accept: "application/json.v2"
});

// ^ this is optional and depends on your use-case ^
</pre>

You can then use `better-fetch` anywhere in your code as you normally would with `fetch()`. The API feels the same and promises work just like you'd expect.

<pre lang="javascript">
// any file
import fetch from 'better-fetch';

fetch('/api/some/thing')
  .then(response => response.json())
	.then(json => {
		// do stuff
	});
</pre>

This code fetches JSON document with a `GET` request to the `/api/some/thing` URL. Any default headers are set in the request and cookies are sent as well.

POST-ing is also made less cumbersome:

<pre lang="javascript">
// any file
import fetch from 'better-fetch';

const data = {
	key: 'value',
	key2: 'value2'
};

fetch('/api/save_response', {method: 'POST',
                             body: data})
          .then(response => response.json())
          .then(json => {
              console.log(json);
          });
</pre>

A dictionary `body` is automatically transformed into a `FormData` object, strings and FormData objects are let through. This gives you flexibility to work with any API backend, but still makes your life easier.

Similarly, you can specify headers as either a `Headers` object or a dictionary - better-fetch has you covered.

Happy hacking 🤓
