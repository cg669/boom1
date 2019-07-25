class Biu {
    constructor({ left, top, radius, speed }) {
        this.left = left;
        this.top = top;
        this.radius = radius;
        this.speed = speed;
        this.el = null;
        this.key = UUIDjs.create().toString();
        this.dt = 0;
        this.dl = 0;
        this.new = true;
        this.rx = 1;
        this.ry = 1;
        this.init();
    }
    changeSpeed(rx, ry) {
        this.rx = rx;
        this.ry = ry;
    }
    init() {
        const el = document.createElement('div');
        el.className = 'dot';
        el.style.left = `${this.left - this.radius / 2}px`;
        el.style.top = `${this.top - this.radius / 2}px`;
        el.style.width = this.radius + 'px';
        el.style.height = this.radius + 'px';
        this.el = el;
        document.body.appendChild(el);
    }
    move() {
        this.el.style.left = this.left + this.rx + 'px';
        this.el.style.top = this.top + this.ry + 'px';
    }
    destory() {
        document.body.removeChild(this.el);
    }
}
