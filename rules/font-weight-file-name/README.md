# bem-newbie/font-weight-file-name

Force a file name from the @font-face { src } to be synchronized with the font-weight value.

```css
@font-face {
  font-weight: 400;
  src: url(./Inter-Regular.woff2) format(woff2);
/**                ↑
 * '400' means 'regular' */
}
```

The following patterns are considered problems:

```css
@font-face {
  font-weight: 400;
  src: url(./Inter-Bold.woff2) format(woff2);
}
@font-face {
  font-weight: normal;
  src: url(./Inter-Bold.woff2) format(woff2);
}
@font-face {
  font-weight: 700;
  src: url(./Inter-Medium.woff2) format(woff2);
}
```

The following patterns are *not* considered problems:

```css
@font-face {
  font-weight: 400;
  src: url(./Inter-Normal.woff2) format(woff2);
}
```
```css
@font-face {
  font-weight: 400;
  src: url(./Inter-Regular.woff2) format(woff2);
}
```
```css
@font-face {
  font-weight: normal;
  src: url(./Inter-Regular.woff2) format(woff2);
}
```
