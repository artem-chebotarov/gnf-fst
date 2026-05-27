/**
 * Class: Gnffst (Gianna Navigation Focus)
 * Author: Artem Chebotarov
 * GitHub: https://github.com/artem-chebotarov
 * Date: 24.05.2026
 * Lightweight focus manager for TV applications (Tizen OS optimized).
 */
class Gnffst {
    constructor() {
        this.focus = null;
        this.callbacks = new WeakMap();
    }
    /**
     * Binds a container to edge movement callbacks.
     * @param {string} container - CSS selector of the container.
     * @param {Object} callbacks - Object with handlers: {up, down, left, right}.
     */
    addCallbacks(container, callbacks) {
        let c = document.querySelector(container);
        if (!c) return;
        this.callbacks.set(c, callbacks);
    }
    setPos(x, y) {
        this.focus.setAttribute("data-string", x); this.focus.setAttribute("data-col", y);
    }
    /**
     * Switches the active navigation container.
     * @param {string} selector - Selector of the container to activate.
     * @param {number|null} [x] - Initial row index.
     * @param {number|null} [y] - Initial column index.
     */
    switch(selector, x = null, y = null) {
        this.focus = document.querySelector(selector);
        if (this.focus) {
            let dx = parseInt(this.focus.getAttribute("data-string")) || x || 0;
            let dy = parseInt(this.focus.getAttribute("data-col")) || y || 0;
            let children = this.focus.children;
            if (!children[dx]) return;
            let grand = children[dx].children;
            if (!grand[dy]) return;
            grand[dy].focus();
            this.setPos(dx, dy);
        }
    }
    /**
     * Initializes containers and sets up accessibility attributes.
     * @param {string} selector - CSS selector of containers to initialize.
     */
    init(selector) {
        let container = document.querySelectorAll(selector);
        for (let i = 0; i <= container.length - 1; i++) {
            this.container(container[i]);
        }
    }
    container(container) {
        let children = container.children;
        for (let i = 0; i <= children.length - 1; i++) {
            this.children(children[i]);
        }
    }
    children(ch) {
        let grand = ch.children;
        let l = grand.length;
        for (let i = 0; i <= grand.length - 1; i++) {
            grand[i].setAttribute("aria-label", grand[i].textContent);
            grand[i].setAttribute("tabindex", "0");
            grand[i].setAttribute("aria-posinset", i + 1);
            grand[i].setAttribute("aria-setsize", l);
        }
    }
    getFunction(direction) {
        let callback = this.callbacks.get(this.focus);
if (callback===undefined || callback[direction]===undefined || callback[direction]===null) return;
        if (typeof callback[direction] === "function") {
            callback[direction](this);
        }
    }
    /**
     * Handles focus movement inside the active container.
     * @param {string} direction - Direction of movement ('up', 'down', 'left', 'right').
     */
    go(direction) {
        let string = parseInt(this.focus.getAttribute("data-string")) || 0;
        let col = parseInt(this.focus.getAttribute("data-col")) || 0;
        let x = 0;
        let y = 0;
        if (direction === "down") {
            x = string + 1;
            y = col;
        } else if (direction === "up") {
            x = string - 1;
            y = col;
        } else if (direction === "left") {
            y = col - 1;
            x = string;
        } else if (direction === "right") {
            y = col + 1;
            x = string;
        }
        let children = this.focus.children;
        if (!children[x]) {
            this.getFunction(direction);
            return;
        }
        let grand = children[x].children;
        if (!grand[y]) {
            if (x == string) {
                this.getFunction(direction);
                return;
            } else {
                this.getFunction(direction);
                let l = grand.length - 1;
                grand[l].focus();
                this.setPos(x, l);
                return;
            }
        }
        grand[y].focus();
        this.setPos(x, y);
    }
}
window.gnf = new Gnffst();
