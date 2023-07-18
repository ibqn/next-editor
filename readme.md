## Getting Started

First, run the development server:

```bash
pnpm dev
```

## Notes

When loading `tsx` language support, one also need to load `jsx` and `typescript`.

There is also an `autoloader` plugin

```ts
import 'prismjs/plugins/autoloader/prism-autoloader'

Prism.plugins.autoloader.languages_path = '/prism/'
```

To get it working additional languages will be loaded from i.e. `http://localhost:3000/prism/...`.
Therefore, please make sure that you place them into the `public` folder.
