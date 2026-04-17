![Demo](demo.gif) [![Backend Tests Status](https://github.com/ether/ep_author_neat2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ether/ep_author_neat2/actions/workflows/test-and-release.yml)

# Line Author Sidebar for Etherpad

[Etherpad](https://etherpad.org) plugin that uses colored underlines instead of
colored backgrounds to indicate authorship.

This is a fork of [ep_author_neat](https://github.com/clkao/ep_author_neat),
which is no longer maintained.

*This requires Etherpad 1.8.4 or later.*

Left: original Etherpad; right: ep_author_neat2 enabled.

![ep_author_neat2](thumbnail.png "ep_author_neat2")

## Installation

Install from the Etherpad admin UI (**Admin → Manage Plugins**,
search for `ep_author_neat2` and click *Install*), or from the Etherpad
root directory:

```sh
pnpm run plugins install ep_author_neat2
```

> ⚠️ Don't run `npm i` / `npm install` yourself from the Etherpad
> source tree — Etherpad tracks installed plugins through its own
> plugin-manager, and hand-editing `package.json` can leave the
> server unable to start.

After installing, restart Etherpad.

## Copyright and License

Copyright © 2013 Chia-liang Kao <clkao@clkao.org>\
Copyright © 2013 John McLear <john@mclear.co.uk>\
Copyright © 2020 Sebastian Castro <sebastian.castro@protonmail.com>\
Copyright © 2020 Richard Hansen <rhansen@rhansen.org>

Licensed under the [MIT license](LICENSE).
