# bem-newbie/animation-explicit-timing-function

Disallow missing timing function when `animation` or `animation-name` is used:

```css
.page { animation: rotation 5s infinite linear; }
/**                                     ↑
 * An example of explicit timing function */
```

The following patterns are considered problems:

```css
.page { animation: rotation 5s infinite; }
```
```css
.page { animation-name: rotation; }
```

The following patterns are *not* considered problems:

```css
.page { animation: rotation 5s infinite linear; }
```
```css
.page {
    animation-name: rotation;
    animation-timing-function: linear;
}
```
