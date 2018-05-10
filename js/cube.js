$(function(){


// 数字 格式 加 ，的 如：3,456
function toThousands(num) {
    var result = '', counter = 0;
    num = (num).toString();
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) {
            result = ',' + result;
        }
    }
    return result;
}

var cube = ['专职教官', '兼职教官', '实战教材', '考试题库'];
var type = ['front', 'right', 'back', 'left'];
var cubeData = [];
for (var i = 0; i < cube.length; i++) {
    cubeData.push({
        "name": cube[i],
        "value": parseInt(Math.random(100, 999) * 1000),
        "type": type[i]
    });
}

drawDom(cubeData);
function drawDom(data) {
    // console.log(555555555555,data);
    var allData = [];
    var front = [];
    var right = [];
    var back = [];
    var left = [];
    // 根据需求把固定的传入各自的前后左右立方体面
    data.map(function (item, index) {
        if (item.type == 'front') {
            front.push(data[index]);
        } else if (item.type == 'right') {
            right.push(data[index]);
        } else if (item.type == 'back') {
            back.push(data[index]);
        } else if (item.type == 'left') {
            left.push(data[index]);
        }
    });

    //对应立方体旋转完成的  前、右、后、左
    allData.push(back, right, left, front);
    // 获取class为renderData的dom，上下两个面没有
    var renderData = $(".renderData");
    renderData.html(" ");
    allData.map(function (item, index) {
        renderData.eq(index).append(' <div class="bg"> <p class="cubeWordFirst"> <span class="cubeWord_title">' + item[0]["name"] + '</span> <span class="cubeWord_number">' + toThousands(item[0]["value"]) + '</span></p></div>');
    });

    createDom();
}


// 生成带背景的六个面（每个面各自的位置）
function createDom() {
    // div containing all the the boxes
    var trans3DBoxes1 = $("#trans3DBoxes1");
    // all the boxes
    var boxes1 = $("#trans3DBoxes1 .cube");
    TweenMax.set(trans3DBoxes1, {
        css: {
            transformPerspective: 5000,
            transformStyle: "preserve-3d",
            rotationY: -630,
        }
    });

    this.threeDTimeline = new TimelineMax({onComplete: rotateYAnimate, repeat: 0});
    // 把立方体的几个面通过旋转和位移拼成立方体
    this.threeDTimeline.set(boxes1[0], {rotationX: 0, rotationY: 0, x: 0, y: 0, z: 125, opacity: 1})
        .set(boxes1[1], {rotationX: 0, rotationY: -90, x: -125, y: 0, z: 0, opacity: 1})
        .set(boxes1[2], {rotationX: 0, rotationY: 90, x: 125, y: 0, z: 0, opacity: 1})
        .set(boxes1[3], {rotationX: 90, rotationY: 0, x: 0, y: -125, z: 0, opacity: 1})
        .set(boxes1[4], {rotationX: -90, rotationY: 0, x: 0, y: 125, z: 0, opacity: 1})
        .set(boxes1[5], {rotationX: 0, rotationY: 180, x: 0, y: 0, z: -125, opacity: 1})
        .set(trans3DBoxes1, {x: 81, y: 781, transformOrigin: "125px 100px 0px"});

    //调用默认动画
    defaultAnimate();
}


// 默认动画（盒子整体上下左右旋转）
function defaultAnimate() {
    this.threeDTimeline.to(trans3DBoxes1, 3, {
        css: {rotationY: 135, rotationX: -360, transformOrigin: "125px 125px 0px"},
        ease: Power0.easeNone
    });
}


// 平移动画（沿y轴旋转角度,现在是对角转动。）
function rotateYAnimate() {
    var num1 = 0, ndeg1 = 45;
    clearInterval(timer1);
    var timer1 = setInterval(function () {
        // console.log(22222222222,-(ndeg1 + num1*180));
        TweenMax.to(trans3DBoxes1, 2, {css: {rotationY: -(ndeg1 + num1 * 180)}});
        num1++;
    }, 5500)
}


// 清除定时器和盒子的rotationX
function clearAnimate() {
    clearInterval(this.state.timer1);
    this.threeDTimeline.set(trans3DBoxes1, {
        css: {rotationY: 180, rotationX: 0, transformOrigin: "125px 125px 0px"}
    });
}
})