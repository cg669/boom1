
const winHeight = window.innerHeight;
const winWidth = window.innerWidth;
class WorkBus {
    list = [];
    iTimer = null;
    isWorking = false;

    change = false;
    changeList = [];
    changeNum = 10;

    callBackFunc = x => x;
    add(item) {
        this.list.push(item)
    }
    callFunc(func) {
        this.change = true;
        this.callBackFunc = func;
    }
    playWork() {
        this.isWorking = true;
        this.iTimer = requestAnimationFrame(() => {
            if (this.change) {
                this.list.reduce( (a,b) => {
                    if(a && a.left){
                        b.changePxy(a.left, a.top);
                    }else if(b){
                        this.callBackFunc(b);
                    }
                    return b;
                },null);
            }
            this.list.forEach( el => {
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
