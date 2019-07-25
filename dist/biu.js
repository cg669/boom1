'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Biu = function () {
    function Biu(_ref) {
        var left = _ref.left,
            top = _ref.top,
            radius = _ref.radius,
            speed = _ref.speed;

        _classCallCheck(this, Biu);

        this.left = left;
        this.top = top;
        this.radius = radius;
        this.speed = speed;
        this.el = null;
        this.key = UUIDjs.create().toString();
        this.dt = 0;
        this.dl = 0;
        this.new = true;
        this.rx = 0;
        this.ry = 1;

        this.next = false;
        this.px = left;
        this.py = top;
        this.changeNum = 10;
        this.init();
    }

    _createClass(Biu, [{
        key: 'changeSpeed',
        value: function changeSpeed(rx, ry) {
            this.rx = rx;
            this.ry = ry;
        }
    }, {
        key: 'changePxy',
        value: function changePxy(x, y) {
            this.next = true;
            this.px = x;
            this.py = y;
        }
    }, {
        key: 'init',
        value: function init() {
            var el = document.createElement('div');
            el.className = 'dot';
            el.style.left = this.left - this.radius / 2 + 'px';
            el.style.top = this.top - this.radius / 2 + 'px';
            el.style.width = this.radius + 'px';
            el.style.height = this.radius + 'px';
            this.el = el;
            document.body.appendChild(el);
        }
    }, {
        key: 'move',
        value: function move() {
            if (this.next && this.changeNum) {
                this.changeNum--;
                this.el.style.left = this.px + 'px';
                this.el.style.top = this.py + 'px';
            } else {
                this.changeNum = 10;
                this.next = false;
                this.left = Number(this.el.offsetLeft) + this.rx;
                this.top = Number(this.el.offsetTop) + this.ry;
                this.el.style.left = this.left + 'px';
                this.el.style.top = this.top + 'px';
            }
        }
    }, {
        key: 'destory',
        value: function destory() {
            document.body.removeChild(this.el);
        }
    }]);

    return Biu;
}();