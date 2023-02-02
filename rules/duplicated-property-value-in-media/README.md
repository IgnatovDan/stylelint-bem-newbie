# bem-newbie/duplicated-property-value-in-media

Disallow duplicated property values in @media sections.

```css
.content {
  max-width: 100%;
/**          ↑
 * An example of a property value in several @media sections */
}

@media screen and (max-width: 480px) {
  .content {
    max-width: 200px;
/**            ↑
 * An example of a property value in several @media sections */
  }
}
```

The following patterns are considered problems:

```css
.content {
  max-width: 100%;
}

@media screen and (max-width: 480px) {
  .content {
    max-width: 100%;
  }
}
```

```css
.content {
  max-width: 100%;
}

@media screen and (max-width: 920px) {
  .content {
    max-width: 200px;
  }
}

@media screen and (max-width: 480px) {
  .content {
    max-width: 200px;
  }
}
```

```css
.content {
  max-width: 100%;
}

@media screen and (min-width: 480px) {
  .content {
    max-width: 200px;
  }
}

@media screen and (min-width: 920px) {
  .content {
    max-width: 200px;
  }
}
```

```css
.content {
  max-width: 100%;
}

@media screen and (min-width: 480px) and (max-width: 920px) {
  .content {
    max-width: 100%;
  }
}
```

The following patterns are *not* considered problems:

```css
.content {
  max-width: 100%;
}

@media screen and (max-width: 480px) {
  .content {
    max-width: 50%;
  }
}
```
