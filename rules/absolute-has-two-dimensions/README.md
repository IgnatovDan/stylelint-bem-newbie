# bem-newbie/absolute-has-two-dimensions

Disallow a missing dimensions to declare position when `position: absolute` is used:

```css
a { position: absolute; top: 0; left: 0;}
/**                     ↑       ↑
 * An example of explicit dimensions */
```

The following patterns are considered problems:

```css
a { position: absolute; }

a {
    position: absolute;
    top: 0;
}
```

The following patterns are *not* considered problems:

```css
a {
    position: absolute;
    top: 0;
    left: 0;
}
```
