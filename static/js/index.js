var $sidedivinner; var getAuthorClassName; var init; var authorNameAndColorFromAuthorId; var
  out$ = typeof exports !== 'undefined' && exports || this;
function allClasses($node) {
  let ref$;
  return ((ref$ = $node.attr('class')) != null ? ref$ : '').split(' ');
}
out$.postAceInit = postAceInit;
function postAceInit(hook_name, arg$) {
  let ace;
  ace = arg$.ace;
  $sidedivinner = $('iframe[name="ace_outer"]').contents().find('#sidedivinner');
  if (!$('#editorcontainerbox').hasClass('flex-layout')) {
    return $.gritter.add({
      title: 'Error',
      text: 'ep_author_neat2: Please upgrade to Etherpad 1.8.4 for this plugin to work correctly',
      sticky: true,
      class_name: 'error',
    });
  }
}
function derivePrimaryAuthor($node) {
  let byAuthor, mPA, authorClass, author, value;
  byAuthor = {};
  $node.find('span').each(function () {
    let $this; let i$; let ref$; let len$; let spanclass; const
      results$ = [];
    $this = $(this);
    for (i$ = 0, len$ = (ref$ = allClasses($this)).length; i$ < len$; ++i$) {
      spanclass = ref$[i$];
      if (/^author/.exec(spanclass)) {
        byAuthor[spanclass] == null && (byAuthor[spanclass] = 0);
        results$.push(byAuthor[spanclass] += $this.text().length);
      }
    }
    return results$;
  });
  mPA = 0;
  authorClass = null;
  for (author in byAuthor) {
    value = byAuthor[author];
    if (value > mPA) {
      mPA = value;
      authorClass = author;
    }
  }
  return authorClass;
}
function toggleAuthor($node, prefix, authorClass) {
  let hasClass, myClass, i$, ref$, len$, c;
  hasClass = false;
  myClass = `${prefix}-${authorClass}`;
  for (i$ = 0, len$ = (ref$ = allClasses($node)).length; i$ < len$; ++i$) {
    c = ref$[i$];
    if (c.indexOf(prefix) === 0) {
      if (c === myClass) {
        hasClass = true;
      } else {
        $node.removeClass(c);
      }
    }
  }
  if (hasClass) {
    return false;
  }
  $node.addClass(myClass);
  return true;
}
function updateDomline($node) {
  let lineNumber, authorClass;
  lineNumber = $node.index() + 1;
  if (!lineNumber) {
    return false;
  }
  authorClass = $node.text().length > 0 ? derivePrimaryAuthor($node) : 'none';
  toggleAuthor($node, 'primary', authorClass);
  return authorViewUpdate($node, lineNumber, null, authorClass);
}
function extractAuthor($node) {
  let ref$, a, ref1$;
  return (ref$ = (function () {
    let i$; let ref$; let len$; const
      results$ = [];
    for (i$ = 0, len$ = (ref$ = allClasses($node)).length; i$ < len$; ++i$) {
      a = ref$[i$];
      if (/^primary-/.exec(a)) {
        results$.push(a);
      }
    }
    return results$;
  }())) != null ? (ref1$ = ref$[0]) != null ? ref1$.replace(/^primary-/, '') : void 8 : void 8;
}
function authorViewUpdate($node, lineNumber, prevAuthor, authorClass) {
  let $authorContainer, prev, prevId, ref$, authorChanged, next, logicalPrevAuthor;
  if (!$sidedivinner) {
    $sidedivinner = $('iframe[name="ace_outer"]').contents().find('#sidedivinner');
  }
  $authorContainer = $sidedivinner.find(`div:nth-child(${lineNumber})`);
  authorClass == null && (authorClass = extractAuthor($node));
  if (!prevAuthor) {
    prev = $authorContainer;
    while ((prev = prev.prev()) && prev.length) {
      prevAuthor = extractAuthor(prev);
      if (prevAuthor !== 'none') {
        break;
      }
    }
  }
  if (prevAuthor === authorClass) {
    $authorContainer.addClass('concise');
  } else {
    $authorContainer.removeClass('concise');
  }
  prevId = (ref$ = $authorContainer.attr('id')) != null ? ref$.replace(/^ref-/, '') : void 8;
  if (prevId === $node.attr('id')) {
    authorChanged = toggleAuthor($authorContainer, 'primary', authorClass);
    if (!authorChanged) {
      return;
    }
  } else {
    $authorContainer.attr('id', `ref-${$node.attr('id')}`);
    toggleAuthor($authorContainer, 'primary', authorClass);
  }
  next = $node.next();
  if (next.length) {
    logicalPrevAuthor = authorClass === 'none' ? prevAuthor : authorClass;
    return authorViewUpdate(next, lineNumber + 1, logicalPrevAuthor);
  }
}
getAuthorClassName = function (author) {
  return `author-${author.replace(/[^a-y0-9]/g, (c) => {
    if (c === '.') {
      return '-';
    } else {
      return `z${c.charCodeAt(0)}z`;
    }
  })}`;
};
function outerInit(outerDynamicCSS) {
  let x$, y$, z$;
  x$ = outerDynamicCSS.selectorStyle('#sidedivinner.authorColors > div');
  x$.borderRight = 'solid 5px transparent';
  y$ = outerDynamicCSS.selectorStyle('#sidedivinner.authorColors > div.concise::before');
  y$.content = "' '";
  z$ = outerDynamicCSS.selectorStyle('#sidedivinner.authorColors > div::before');
  z$.fontSize = '11px';
  z$.textTransform = 'capitalize';
  z$.textOverflow = 'ellipsis';
  z$.overflow = 'hidden';
  return init = true;
}
out$.aceSetAuthorStyle = aceSetAuthorStyle;
function aceSetAuthorStyle(name, context) {
  let dynamicCSS, outerDynamicCSS, parentDynamicCSS, info, author, authorSelector, color, authorClass, authorName, x$, y$, z$, z1$, z2$, z3$;
  dynamicCSS = context.dynamicCSS, outerDynamicCSS = context.outerDynamicCSS, parentDynamicCSS = context.parentDynamicCSS, info = context.info, author = context.author;
  if (!init) {
    outerInit(outerDynamicCSS);
  }
  authorClass = getAuthorClassName(author);
  authorSelector = `.authorColors span.${authorClass}`;
  if (info) {
    if (!(color = info.bgcolor)) {
      return 1;
    }
    authorName = authorNameAndColorFromAuthorId(author).name;
    x$ = dynamicCSS.selectorStyle(`#innerdocbody.authorColors span.${authorClass}`);
    x$.borderBottom = `2px solid ${color}`;
    x$.paddingBottom = '1px';
    y$ = parentDynamicCSS.selectorStyle(authorSelector);
    y$.borderBottom = `2px solid ${color}`;
    y$.paddingBottom = '1px';
    z$ = dynamicCSS.selectorStyle(`#innerdocbody.authorColors .primary-${authorClass} span.${authorClass}`);
    z$.borderBottom = '0px';
    z1$ = outerDynamicCSS.selectorStyle(`#sidedivinner.authorColors > div.primary-${authorClass}`);
    z1$.borderRight = `solid 5px ${color}`;
    z2$ = outerDynamicCSS.selectorStyle(`#sidedivinner.authorColors > div.primary-${authorClass}::before`);
    z2$.content = `'${authorName}'`;
    z2$.paddingLeft = '5px';
    z2$.whiteSpace = 'nowrap';
    z3$ = outerDynamicCSS.selectorStyle(`.line-numbers-hidden #sidedivinner.authorColors > div.primary-${authorClass}::before`);
    z3$.paddingRight = '12px';
  } else {
    dynamicCSS.removeSelectorStyle(`#innerdocbody.authorColors span.${authorClass}`);
    parentDynamicCSS.removeSelectorStyle(authorSelector);
  }
  return 1;
}
authorNameAndColorFromAuthorId = function (authorId) {
  let myAuthorId, authorObj;
  myAuthorId = pad.myUserInfo.userId;
  if (myAuthorId === authorId) {
    return {
      name: 'Me',
      color: pad.myUserInfo.colorId,
    };
  }
  authorObj = {};
  $('#otheruserstable > tbody > tr').each(function () {
    let x$;
    if (authorId === $(this).data('authorid')) {
      x$ = $(this);
      x$.find('.usertdname').each(function () {
        return authorObj.name = $(this).text() || 'Unknown Author';
      });
      x$.find('.usertdswatch > div').each(function () {
        return authorObj.color = $(this).css('background-color');
      });
      return authorObj;
    }
  });
  if (!authorObj || !authorObj.name) {
    authorObj = clientVars.collab_client_vars.historicalAuthorData[authorId];
  }
  return authorObj || {
    name: 'Unknown Author',
    color: '#fff',
  };
};
out$.acePostWriteDomLineHTML = acePostWriteDomLineHTML;
function acePostWriteDomLineHTML(hook_name, args) {
  return setTimeout(() => updateDomline($(args.node)), 200);
}
out$.aceEditEvent = aceEditEvent;
function aceEditEvent(hook_name, context) {
  let callstack, x$;
  callstack = context.callstack;
  if (callstack.type !== 'setWraps') {
    return;
  }
  x$ = $('iframe[name="ace_outer"]').contents();
  x$.find('#sidediv').css({
    'padding-right': '0px',
  });
  x$.find('#sidedivinner').css({
    'max-width': '180px',
    'overflow': 'hidden',
  });
  return x$;
}
