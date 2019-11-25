# fix-es-imports

Fixes your ES import paths - from Node-style to explicit filenames

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

## Caveats

### Regex-based parsing

Currently this tool is implemented with a fairly primitive regex, rather than any kind of real parser. As such, it is not expected to work in every situation.

Some cases known not to work:

- inclusion of any quote characters within the path (even if escaped)
- anything prior to the declaration on the same line (including whitespace)
- declarations not containing any whitespace (e.g. `import'x';`)
- declarations where the path string is not immediately followed by a semicolon and the end of the line

The reason for the use of regex rather than e.g. Babel is because we want to leave every other part of the file exactly as-is, with absolutely no unnecessary changes.

If you're keen to implement a better approach, please open a PR!

### Non-JS modules

```js
import foo from './foo.json';
```

At this stage, using module declarations with non-JS files is [still experimental](https://nodejs.org/api/esm.html#esm_experimental_json_modules) and the syntax for doing this will almost certainly change due to [security issues affecting the web](https://github.com/w3c/webcomponents/issues/839).

This tool will work with such files if the correct flag is enabled, but you should really look to load these without module declarations until the final syntax is determined.

### Package files

```js
import fs from 'mz/fs';
```

Not currently supported. Each instance found will be outputted to stderr. You will need to manually change these.

In this case, to:

```js
import fs from 'mz/fs.js';
```

If you can, best not to use this kind of import for now. Likely to result in unexpected breaking changes by package developers unfamiliar with the explicit filename rules.

## Support

Please open an issue on this repository.

## Authors

- James Billingham <james@jamesbillingham.com>

## License

MIT licensed - see [LICENSE](LICENSE) file
