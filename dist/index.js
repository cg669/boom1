'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkBus = function (_BaseWorkBus) {
    _inherits(WorkBus, _BaseWorkBus);

    function WorkBus(props) {
        _classCallCheck(this, WorkBus);

        return _possibleConstructorReturn(this, (WorkBus.__proto__ || Object.getPrototypeOf(WorkBus)).call(this, props));
    }

    _createClass(WorkBus, [{
        key: 'playWork',
        value: function playWork() {
            var _this2 = this;

            this.isWorking = true;
            this.iTimer = requestAnimationFrame(function () {
                _this2.list.forEach(function (el) {
                    _this2.collection(el);
                    el.move();
                });
                if (!_this2.isWorking) {
                    return;
                };
                _this2.playWork();
            });
        }
    }]);

    return WorkBus;
}(BaseWorkBus);

var bus = new WorkBus();
bus.playWork();
var num = 200;

function addDot() {
    if (bus.list.length < num) {
        var r = winHeight > winWidth ? winWidth : winHeight;
        var rd = Math.random() * r / 2;
        var dot = new Dot({ left: winWidth / 2, top: winHeight / 2, radius: 10, speed: rd });
        bus.add(dot);
    }
    // console.log(bus.list.length);
    requestAnimationFrame(function () {
        addDot();
    });
}

addDot();

window.onclick = function () {
    window.location.href = 'others/snake.html';
};

// console.log(bus);