# fix-es-imports

## What

Turns:

```js
import fs from 'fs';
import x from './x';
import { y } from './y';
export { default as z } from './z';
```

Into:

```js
import fs from 'fs';
import x from './x.mjs';
import { y } from './y/index.js';
export { default as z } from './z.json';
```

## How

```bash
npx fix-es-imports
```

## Why

Did you use ES module syntax before it was ~cool~ implemented? And then maybe didn't completely respect the exact rules around explicit filenames? But it was okay, right, since Babel didn't really mind...

And then you used `--experimental-modules` with `.mjs` files from Node 8.9.0, and it pretty much worked perfectly. And you were super happy you could finally stop using Babel with Node code.

And then Node 11.4.0 came along, and it all stopped working. They were actually enforcing the rules now! Oops. And maybe there are a few thousand references to deal with, so maybe you left it for a while.

At some point, `--es-module-specifier-resolution=node` came along, and it saved the day - things worked as normal again! But you knew this wouldn't be a long term solution - one day you'd have to fix the imports once and for all.

And now Node 13.2.0 has shipped. ES module support is no longer experimental. You conclude you've pushed it off long enough. The time has come.

This tool is for you.

## Support

Please open an issue on this repository.

## Authors

- James Billingham <james@jamesbillingham.com>

## License

MIT licensed - see [LICENSE](LICENSE) file
