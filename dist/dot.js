'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dot = function () {
    function Dot(_ref) {
        var left = _ref.left,
            top = _ref.top,
            radius = _ref.radius,
            speed = _ref.speed;

        _classCallCheck(this, Dot);

        this.left = left;
        this.top = top;
        this.radius = radius;
        this.speed = speed;
        this.el = null;
        this.key = UUIDjs.create().toString();
        this.dt = 0;
        this.dl = 0;
        this.new = true;
        this.init();
    }

    _createClass(Dot, [{
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
            if (this.new) {
                this.new = false;
                var r = Math.pow(-1, Math.ceil(Math.random() * 1000));
                // const c = Math.pow(-1,Math.ceil( Math.random() * 1000));
                this.dt = r > 0 ? Math.PI : 0;
                this.el.style.left = Number(this.el.offsetLeft) + r * this.speed + 'px';
                // console.log(r);
            } else {
                this.dt += 0.03;
                this.speed += 1;
                this.el.style.left = this.left + Math.sin(this.dt) * this.speed + 'px';
                this.el.style.top = this.top + Math.cos(this.dt) * this.speed + 'px';
            }
        }
    }, {
        key: 'destory',
        value: function destory() {
            // console.log(this.el);
            document.body.removeChild(this.el);
        }
    }]);

    return Dot;
}();