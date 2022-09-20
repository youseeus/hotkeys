import { Pipe, PipeTransform } from '@angular/core';

import { hostPlatform } from './utils/platform';

const symbols = {
  shift: '&#8679;',
  backspace: '&#9003;',
  tab: '&#8677;',
  space: '&#9251;',
  left: '&#8592;',
  right: '&#8594;',
  up: '&#8593;',
  down: '&#8595;'
};

const appleSymbols = {
  meta: '&#8984;',
  altleft: '&#8997;',
  control: '&#8963;',
  escape: '&#9099;',
  enter: '&#8996;'
};

const pcSymbols = {
  control: 'Ctrl',
  altleft: 'Alt',
  escape: 'Esc',
  enter: 'Enter'
};

@Pipe({
  name: 'hotkeysShortcut'
})
export class HotkeysShortcutPipe implements PipeTransform {
  private readonly symbols;
  constructor() {
    const platform = hostPlatform();
    this.symbols = this.getPlatformSymbols(platform);
  }

  transform(value: string, dotSeparator = ' + ', thenSeparator = ' then '): any {
    if (!value) {
      return '';
    }
    return value
      .split('>')
      .map(s =>
        s
          .split('.')
          .map(c => c.toLowerCase())
          .map(c => this.symbols[c] || c)
          .join(dotSeparator)
      )
      .join(thenSeparator);
  }

  private getPlatformSymbols(platform): any {
    return platform === 'apple' ? { ...symbols, ...appleSymbols } : { ...symbols, ...pcSymbols };
  }
}
