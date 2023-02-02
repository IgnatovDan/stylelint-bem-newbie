# bem-newbie/import-normalize

Disallow 'normalize' CSS file to be imported after BEM files.

```css
@import url(../vendor/normalize.css);
/**                   ↑
 * An example of the imported 'normalize.css' file */
```

The following patterns are considered problems:

```css
@import url(../blocks/page/page.css);
@import url(../vendor/normalize.css);
```

The following patterns are *not* considered problems:

```css
@import url(../vendor/normalize.css);
@import url(../blocks/page/page.css);
```
