# bem-newbie/import-bem-path

Require BEM folders/files to be in accordance with the [Nested](https://ru.bem.info/methodology/filestructure/#nested) BEM structure.

```css
/* blocks/header/__title/header__title.css */
/**       ↑      ↑       ↑
 * An example of the Nested BEM folders */
.header__title {}
```

The following patterns are considered problems:

```css
/* blocks/header/__title/header__title.css */
.header__tilte {}
```

```css
/* blocks/footer/__item/_small/foooter__item_small.css */
.footer__item_small {}
```

```css
/* blocks/footer/footer.css */
.footer {}
@media screen and (max-width: 480px) {
  .footer__item {}
}
```

The following patterns are *not* considered problems:

```css
/* blocks/footer/footer.css */
.footer {}
@media screen and (max-width: 480px) {
  .footer {}
}
```
