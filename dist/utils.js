"use strict";

function collText(obj, obj2) {
    var x1 = obj.offsetLeft;
    var y1 = obj.offsetTop;
    var w1 = obj.offsetWidth;
    var h1 = obj.offsetHeight;

    var x2 = obj2.offsetLeft;
    var y2 = obj2.offsetTop;
    var w2 = obj2.offsetWidth;
    var h2 = obj2.offsetHeight;
    // 矩形A位于矩形B的右侧
    if (x1 >= x2 && x1 >= x2 + w2) {
        return false;
        // 矩形A位于矩形B的左侧
    } else if (x1 <= x2 && x1 + w1 <= x2) {
        return false;
        // 矩形A位于矩形B的下侧
    } else if (y1 >= y2 && y1 >= y2 + h2) {
        return false;
        // 矩形A位于矩形B的上侧
    } else if (y1 <= y2 && y1 + h1 <= y2) {
        return false;
    }
    // 不相交都不满足，那就是相交了
    return true;
};