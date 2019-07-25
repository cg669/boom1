'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hat = function () {
    function Hat(_ref) {
        var width = _ref.width,
            height = _ref.height,
            left = _ref.left,
            top = _ref.top;

        _classCallCheck(this, Hat);

        this.w = width;
        this.h = height;
        this.l = left;
        this.t = top;
        this.key = UUIDjs.create().toString();
        this.el = null;
        this.init();
    }

    _createClass(Hat, [{
        key: 'init',
        value: function init() {
            var el = document.createElement('div');
            el.className = 'hat';
            el.style.left = this.l + 'px';
            el.style.top = this.t + 'px';
            el.style.width = this.w + 'px';
            el.style.height = this.h + 'px';
            this.el = el;
            document.body.appendChild(el);
        }
    }, {
        key: 'destory',
        value: function destory() {
            document.body.removeChild(this.el);
        }
    }]);

    return Hat;
}();