# bem-newbie/font-face-duplicate-src

Disallow @font-face { src } attribute value to be specified several times in a @font-face statement.

```css
@font-face {
  src: url("Inter-Regular.woff2?v=3.19") format("woff2");
/**    ↑
 * An example of a src value */
}
```

The following patterns are considered problems:

```css
@font-face {
  src: url("Inter-Regular.woff?v=3.19") format("woff");
  src: url("Inter-Regular.woff2?v=3.19") format("woff2");
}
```

The following patterns are *not* considered problems:

```css
@font-face {
  src: url("Inter-Regular.woff2?v=3.19") format("woff2"),
       url("Inter-Regular.woff?v=3.19") format("woff");
}
```
