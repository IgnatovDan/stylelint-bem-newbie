# bem-newbie/import-fonts

Disallow import 'fonts.css' from the 'blocks' folder.

```css
@import url(../vendor/fonts/fonts.css);
/**                         ↑
 * An example of the imported 'fonts.css' file */
```

The following patterns are considered problems:

```css
@import url(../blocks/fonts/fonts.css);
```

```css
@import url(../blocks/fonts.css);
```

The following patterns are *not* considered problems:

```css
@import url(../vendor/fonts/fonts.css);
```

```css
@import url(../vendor/fonts.css);
```
