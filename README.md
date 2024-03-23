# Timing safe string compare using double HMAC

Prevents [timing attacks](http://codahale.com/a-lesson-in-timing-attacks/) using Brad Hill's
[Double HMAC pattern](https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2011/february/double-hmac-verification/)
to perform secure string comparison. Double HMAC avoids the timing attacks by blinding the
timing channel using random time per attempt comparison against iterative brute force attacks.

## Install

```
npm install tsscmp-js
```

## Why

To compare secret values like **authentication tokens**, **passwords** or
**capability urls** so that timing information is not
leaked to the attacker.

## Example

```js
import { timingSafeCompare } from "tsscmp-js";

const sessionToken = "5439fd10-e3e0-4926-a239-e95658906718";
const givenToken = "5439fd10-e3e0-4926-a239-e95658906718";

if (timingSafeCompare(sessionToken, givenToken)) {
  console.log("good token");
} else {
  console.log("bad token");
}
```

## License

[MIT](LICENSE)

**Credits to:** [@suryagh](https://github.com/suryagh)
