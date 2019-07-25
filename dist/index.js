'use strict';

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

document.addEventListener('click', function () {
    window.location.href = 'others/snake.html';
});

// console.log(bus);