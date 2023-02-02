# bem-newbie/font-face-declaration-in-fonts-file-only

Disallow @font-face statements in CSS files in the 'blocks' folder.

```css
/*/styles/fonts.css*/
/**       ↑
 * An example of a CSS file with @font-face statement */
@font-face {}
}
```

The following patterns are considered problems:

```css
/*/blocks/fonts.css*/
@font-face {}
}
```

```css
/*/blocks/root/root.css*/
@font-face {}
}
```

The following patterns are *not* considered problems:

```css
/*/fonts/fonts.css*/
@font-face {}
}
```

```css
/*/vendor/inter.css*/
@font-face {}
}
```
