# bem-newbie/duplicated-property-value-in-modifier

Disallow duplicated property values in BEM modifier and in its BEM block/element.

```css
/*content.css*/
.content {
  max-width: 100%;
/**          ↑
 * An example of a property value in a BEM block */
}

/*content_small.css*/
.content_small {
  max-width: 60%;
/**          ↑
 * An example of a property value in a BEM modifier */
}
```

The following patterns are considered problems:

```css
/*content.css*/
.content {
  max-width: 100%;
}

/*content_small.css*/
.content_small {
  max-width: 100%;
}
```

The following patterns are *not* considered problems:

```css
/*content.css*/
.content {
  max-width: 100%;
}

/*content_small.css*/
.content_small {
  max-width: 60%;
}
```
