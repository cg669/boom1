
const bus = new WorkBus();
bus.playWork();
var num = 200;

function addDot(){
    if(bus.list.length < num){
        const r = winHeight > winWidth ? winWidth : winHeight;
        const rd = Math.random() * r / 2;
        const dot = new Dot({ left: winWidth /2 , top: winHeight / 2, radius: 10, speed: rd });
        bus.add(dot);
    }
    // console.log(bus.list.length);
    requestAnimationFrame( () => {
        addDot();
    })
}

addDot();

window.onclick = function(){
    window.location.href = 'others/snake.html';
}

// console.log(bus);