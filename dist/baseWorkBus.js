"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;

var BaseWorkBus = function () {
    function BaseWorkBus() {
        _classCallCheck(this, BaseWorkBus);

        this.times = 0;
        this.list = [];
        this.iTimer = null;
        this.isWorking = false;
        this.change = false;
        this.changeList = [];
        this.changeNum = 10;

        this.callBackFunc = function (x) {
            return x;
        };
    }

    _createClass(BaseWorkBus, [{
        key: "addMethod",
        value: function addMethod(name, fn) {
            this[name] = fn;
        }
    }, {
        key: "add",
        value: function add(item) {
            this.list.push(item);
        }
    }, {
        key: "callFunc",
        value: function callFunc(func) {
            this.change = true;
            this.callBackFunc = func;
        }
        /**
         * 关闭运动s
         */

    }, {
        key: "stopWork",
        value: function stopWork() {
            cancelAnimationFrame(this.iTimer);
            this.iTimer = null;
            this.isWorking = false;
            // window.prompt('是否继续？');
        }
    }, {
        key: "delete",
        value: function _delete(key) {
            var list = this.list;
            this.list = list.filter(function (el) {
                return el.key !== key;
            });
        }
    }, {
        key: "collection",
        value: function collection(item) {
            var el = item.el;
            if (el) {
                if (el.offsetLeft < 0 || el.offsetTop < 0 || el.offsetLeft > winWidth || el.offsetTop > winHeight) {
                    item.destory();
                    this.delete(item.key);
                }
            }
        }
    }]);

    return BaseWorkBus;
}();