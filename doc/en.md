# Gnf-fst — TV Navigation Library

**Gianna Navigation Focus for Samsung Tizen TV (gnf-fst)** is a lightweight JavaScript class smaller than 3 KB that helps you manage remote-control navigation inside TV applications.

The library has no dependencies and focuses only on navigation logic. It does not handle styles, borders, fonts, or animations.

The project was designed with accessibility in mind, especially for blind users. You do not need to manually add `aria-*` attributes because the library automatically generates them.

> ⚠️ Warning: this library was originally created for Samsung Tizen TV.  
> It may also work on LG TVs. Android TV is supported only in PWA applications.

---

# Markup Structure

Correct markup structure is extremely important for remote navigation.

The layout consists of:

- container
- rows
- columns

Even if you only need a vertical list, each row must still contain at least one column.

## HTML Example

```html
<div id="container">

    <div>
        <div>First column</div>
        <div>Second column</div>
    </div>

    <div>
        <div>First column</div>
        <div>Second column</div>
    </div>

</div>
```

You can use any HTML elements, not only `div`.

---

# Methods

## init()

Initializes a container and prepares navigation attributes.

### Example

```js
const gnf = new Gnffst();

gnf.init("#container");
```

You can initialize multiple containers at once.

```js
gnf.init("#container, #menu, #settings");
```

---

## switch()

Sets the active navigation container.

Usually called after `init()`.

### Example

```js
gnf.switch("#container");
```

---

## go()

Moves focus inside the active container.

Supported directions:

- `up`
- `down`
- `left`
- `right`

### Example

```js
gnf.go("down");
gnf.go("up");
gnf.go("left");
gnf.go("right");
```

It is recommended to use this method inside `keydown` or `keyup` event handlers.

---

## addCallbacks()

Adds edge callbacks for navigation boundaries.

Callbacks are triggered when the user tries to move outside the container.

### Example

```js
gnf.addCallbacks("#container", {
    left: () => console.log("left edge"),
    right: () => console.log("right edge"),
    up: () => console.log("top edge"),
    down: () => console.log("bottom edge"),
});
```

Each callback receives the current class instance.

### Example

```js
gnf.addCallbacks("#container", {
    up: (t) => console.log(t.focus.id)
});
```

---

# How It Works

The library is written in pure JavaScript without external dependencies.

Its only purpose is to provide simple and predictable TV interface navigation.

If a container is removed from the DOM, related callbacks are automatically removed thanks to `WeakMap`.

---

# Accessibility

The library automatically adds:

- `tabindex`
- `aria-label`
- `aria-posinset`
- `aria-setsize`

This improves compatibility with screen readers.

---

# Final Notes

Gnf-fst helps developers quickly build accessible TV interfaces with remote navigation support.

Best regards,  
Artem Chebotarov