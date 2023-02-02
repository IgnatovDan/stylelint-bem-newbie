# bem-newbie/class-name-equal-to-file-name

Require CSS class names in a file to be equal to the file name.

```css

/* header.css */
.header { }
/**
 * An example of file name and CSS class name */
```

The following patterns are considered problems:

```css
/* header.css */
.header { }
.header__title { }
```

```css
/* header.css */
.header { }
.header_small { }
```

The following patterns are *not* considered problems:

```css
/* header.css */
.header { }
```
