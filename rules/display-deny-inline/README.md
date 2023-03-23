# bem-newbie/display-deny-inline

Deny 'inline-...' values for the 'display' CSS property.

```css

.header { display: inline-flex; }
/**                ↑
 * An example of 'inline-...' value */
```

The following patterns are considered problems:

```css
.header { display: inline-flex; }
.header { display: inline flex; }
.header { display: inline-grid; }
.header { display: inline grid; }
.header { display: inline-block; }
```

The following patterns are *not* considered problems:

```css
.header { display: none; }
.header { display: block; }
.header { display: flex; }
.header { display: grid; }
```
