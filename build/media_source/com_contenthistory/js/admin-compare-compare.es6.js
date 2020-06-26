/**
 * @copyright  Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
(() => {
  'use strict';

  // This method is used to decode HTML entities
  const decodeHtml = (html) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  const compare = (original, changed) => {
    const display = changed.nextElementSibling;
    const diff = window.Diff.diffWords(original.innerHTML, changed.innerHTML);
    const fragment = document.createDocumentFragment();

    diff.forEach((part) => {
      let color = '';

      if (part.added) {
        color = '#a6f3a6';
      }

      if (part.removed) {
        color = '#f8cbcb';
      }

      // @todo use the tag MARK here not SPAN
      const span = document.createElement('span');
      span.style.backgroundColor = color;
      span.style.borderRadius = '.2rem';
      span.appendChild(document.createTextNode(decodeHtml(part.value)));
      fragment.appendChild(span);
    });

    display.appendChild(fragment);
  };

  const onBoot = () => {
    const diffs = [].slice.call(document.querySelectorAll('.original'));
    diffs.forEach((fragment) => {
      compare(fragment, fragment.nextElementSibling);
    });

    // Cleanup
    document.removeEventListener('DOMContentLoaded', onBoot);
  };

  document.addEventListener('DOMContentLoaded', onBoot);
})();
