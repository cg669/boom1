
const winHeight = window.innerHeight;
const winWidth = window.innerWidth;
class WorkBus {
    list = [];
    iTimer = null;
    isWorking = false;
    add(item) {
        this.list.push(item)
    }
    playWork() {
        this.isWorking = true;
        this.iTimer = requestAnimationFrame(() => {
            this.list.forEach(el => {
                this.collection(el);
                el.move();
            });
            if (!this.isWorking) {
                return;
            };
            this.playWork();
        })
    }
    /**
     * 关闭运动s
     */
    stopWork() {
        cancelAnimationFrame(this.iTimer);
        this.iTimer = null;
        this.isWorking = false;
        // window.prompt('是否继续？');
    }
    delete(key) {
        const list = this.list;
        this.list = list.filter(el => el.key !== key);
    }
    collection(item) {
        const el = item.el;
        if (el) {
            if (el.offsetLeft < 0 || el.offsetTop < 0 || el.offsetLeft > winWidth || el.offsetTop > winHeight) {
                item.destory();
                this.delete(item.key);
            }
        }
    }
}

class Dot {
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
        this.init();
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
        if(this.new){
            this.new  = false;
            const r = Math.pow(-1,Math.ceil( Math.random() * 1000));
            // const c = Math.pow(-1,Math.ceil( Math.random() * 1000));
            this.dt = r > 0 ? Math.PI : 0;
            this.el.style.left = Number(this.el.offsetLeft) + r * this.speed  + 'px';
            // console.log(r);
        }else{
            this.dt += 0.03;
            this.speed += 1;
            this.el.style.left = this.left + Math.sin(this.dt)*this.speed  + 'px';
            this.el.style.top =this.top + Math.cos(this.dt)*this.speed  + 'px';
        }
    }
    destory() {
        // console.log(this.el);
        document.body.removeChild(this.el);
    }
}




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

document.body.onclick= function(){
    if(bus.isWorking){
        bus.stopWork();
    }else{
        bus.playWork();
    }
}

// console.log(bus);