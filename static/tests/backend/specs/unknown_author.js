'use strict';

const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(
    __dirname, '..', '..', '..', '..', 'static', 'js', 'index.js');

describe(__filename, function () {
  let src;
  before(function () { src = fs.readFileSync(indexPath, 'utf8'); });

  it('aceSetAuthorStyle does not bake "Unknown Author" into ::before content (#8)',
      function () {
        const hookBody = src.match(/exports\.aceSetAuthorStyle\s*=\s*[\s\S]*?\n\};/);
        assert(hookBody, 'expected aceSetAuthorStyle export');
        // The hook used to write `z2$.content = '...${authorName}'` even
        // when `authorName` came back as the placeholder "Unknown Author"
        // (because USER_NEWINFO hadn't populated the user list yet). The
        // label should only be written when we actually resolved a real
        // name — otherwise the first render nails a wrong label into CSS
        // that never updates.
        assert(/authorName\s*!==\s*['"]Unknown Author['"]/.test(hookBody[0]),
            'aceSetAuthorStyle should skip writing the CSS label when the resolved author name ' +
            'is "Unknown Author" so a later USER_NEWINFO can overwrite it with the real name');
      });
});
