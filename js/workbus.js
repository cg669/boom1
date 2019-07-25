
const winHeight = window.innerHeight;
const winWidth = window.innerWidth;
class WorkBus {
    list = [];
    iTimer = null;
    isWorking = false;
    callBackFunc = x => x;
    add(item) {
        this.list.push(item)
    }
    callFunc(func){
        this.callBackFunc = func;
    }
    playWork() {
        this.isWorking = true;
        this.iTimer = requestAnimationFrame(() => {
            this.list.forEach(el => {
                this.collection(el);
                this.callBackFunc(el);
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
