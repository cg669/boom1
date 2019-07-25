"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventUtil = {
    addHandler: function addHandler(element, type, handler) {
        if (element.addEventListener) element.addEventListener(type, handler, false);else if (element.attachEvent) element.attachEvent("on" + type, handler);else element["on" + type] = handler;
    },
    removeHandler: function removeHandler(element, type, handler) {
        if (element.removeEventListener) element.removeEventListener(type, handler, false);else if (element.detachEvent) element.detachEvent("on" + type, handler);else element["on" + type] = handler;
    },
    /**
     * 监听触摸的方向
     * @param target            要绑定监听的目标元素
     * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function listenTouchDirection(target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;
        function handleTouchEvent(event) {
            switch (event.type) {
                case "touchstart":
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case "touchend":
                    var spanX = event.changedTouches[0].pageX - startX;
                    var spanY = event.changedTouches[0].pageY - startY;

                    if (Math.abs(spanX) > Math.abs(spanY)) {
                        //认定为水平方向滑动
                        if (spanX > 30) {
                            //向右
                            if (rightCallback) rightCallback();
                        } else if (spanX < -30) {
                            //向左
                            if (leftCallback) leftCallback();
                        }
                    } else {
                        //认定为垂直方向滑动
                        if (spanY > 30) {
                            //向下
                            if (downCallback) downCallback();
                        } else if (spanY < -30) {
                            //向上
                            if (upCallback) upCallback();
                        }
                    }

                    break;
                case "touchmove":
                    //阻止默认行为
                    if (isPreventDefault) event.preventDefault();
                    break;
            }
        }
    }
};

var WorkBus = function (_BaseWorkBus) {
    _inherits(WorkBus, _BaseWorkBus);

    function WorkBus(props) {
        _classCallCheck(this, WorkBus);

        var _this = _possibleConstructorReturn(this, (WorkBus.__proto__ || Object.getPrototypeOf(WorkBus)).call(this, props));

        _this.hatList = [];
        return _this;
    }

    _createClass(WorkBus, [{
        key: "addHat",
        value: function addHat(hat) {
            this.hatList.push(hat);
        }
    }, {
        key: "addBiu",
        value: function addBiu() {
            var lastOne = this.list[this.list.length - 1];
            var snake = new Biu({ left: lastOne.px, top: lastOne.py, radius: 10 });
            this.add(snake);
        }
    }, {
        key: "removeHat",
        value: function removeHat(key) {
            var list = this.hatList;
            this.hatList = list.filter(function (el) {
                return el.key !== key;
            });
        }
    }, {
        key: "playWork",
        value: function playWork() {
            var _this2 = this;

            if (this.times % 200 === 9) {
                var w = Math.random() * 20 + 10;
                var hat = new Hat({ width: w, height: w, left: Math.random() * winWidth, top: Math.random() * winHeight });
                this.addHat(hat);
            }
            this.times++;
            this.isWorking = true;
            this.iTimer = requestAnimationFrame(function () {
                if (_this2.change) {
                    _this2.list.reduce(function (a, b) {
                        if (a && a.left) {
                            b.changePxy(a.left, a.top);
                        } else if (b) {
                            _this2.callBackFunc(b);
                        }
                        return b;
                    }, null);
                }
                _this2.list.forEach(function (el, index) {
                    if (index === 0) {
                        _this2.hatList.forEach(function (hat) {
                            if (collText(el.el, hat.el)) {
                                hat.destory();
                                _this2.removeHat(hat.key);
                                _this2.addBiu();
                            }
                        });
                    }
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
var snakeNum = 10;
while (snakeNum > 0) {
    snakeNum--;
    var t = winHeight / 2 + 10 * snakeNum;
    var snake = new Biu({ left: winWidth / 2, top: t, radius: 10 });
    bus.add(snake);
}
function up() {
    // console.log("上");
    bus.callFunc(function (el) {
        return el.changeSpeed(0, -1);
    });
}
function right() {
    // console.log("右");
    bus.callFunc(function (el) {
        return el.changeSpeed(1, 0);
    });
}
function down() {
    // console.log("下");
    bus.callFunc(function (el) {
        return el.changeSpeed(0, 1);
    });
}
function left() {
    // console.log("左");
    bus.callFunc(function (el) {
        return el.changeSpeed(-1, 0);
    });
}
document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, { passive: false }); //passive 参数不能省略，用来兼容ios和android
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});
document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
});
EventUtil.listenTouchDirection(document.body, true, up, right, down, left);