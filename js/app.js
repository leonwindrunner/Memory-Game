//函数:生成格子
function creatBoxes() {
    //函数：将一个数组里的值随机排序，并返回数组
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    //随机排序格子的图案
    var cardArry = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
    cardArry = shuffle(cardArry);

    //构造函数Card
    function Card(className, symbol, id, status) {
        this.className = className;
        this.symbol = symbol;
        this.id = id;
        this.status = status;
    }

    //循环构造16个对象 如var card0=new Card("card",cardArry[0],"card0","open");
    for (let i = 0; i < 16; i++) {
        eval('card' + i + '=new Card("card",cardArry["' + i + '"],"card' + i + '","closed")');
    }


    //在html中插入16个<li>元素，每个<li>元素下有个i元素，并添加属性
    // <li class="card">
    //     <i class="fa fa-bicycle"></i>
    // </li>
    for (let i = 0; i < 16; i++) {
        var txt = "<li class=\"" + eval("card" + i).className + "\" id=\"" + eval("card" + i).id + "\" status=\"" + eval("card" + i).status + "\"><i class=\"fa " + eval("card" + i).symbol + "\"></i></li>";
        $(".deck").append(txt);
    }
}

creatBoxes();

//游戏的逻辑实现，建立变量，firstClick和secondClick记录每次点击是格子的符号，
//firstId和secondId记录每次点击时格子的id
//count用来记录总共的点击次数，starCount用来记录星级评分，canClick记录能否进行下一次点击
var firstClick = null;
var secondClick = null;
var firstId;
var secondId;
var count = 0;
var starCount = 3;
var canClick = true;

//对还没有翻面的格子添加添加监听事件
$(".deck").on("click", "li[status='closed']", function(e) {
    if (canClick) {
        $(this).attr("class", "card open show");
        //记录总共的点击数，并影响星级评分
        
        if (count > 20) {
            $(".stars li").eq(2).children().attr("class", "fa fa-star-o");
            starCount = 2;
        }
        if (count > 30) {
            $(".stars li").eq(1).children().attr("class", "fa fa-star-o");
            starCount = 1;
        }
        //将第一次点击和第二次点击的值记录下来，通过status属性标记格子打开与否
        if (firstClick == null) {
            firstClick = eval(e.target.id).symbol;
            firstId = e.target.id;
            $(this).attr("status", "open");
        } else {
            secondClick = eval(e.target.id).symbol;
            secondId = e.target.id;
            $(this).attr("status", "open");
            count++;
            $(".moves").text(count);
            canClick = false;  //当连续点击了两个格子后，设置为不可点击的状态，
            									 //直到所有的动画效果都结束后才能继续点击
        }

        //判断两次点击是否是相同的图案，并作出相应的反应
        if (firstClick == secondClick && firstClick != null && secondClick != null) {
            $("#" + firstId).attr("class", "card match animated bounce");
            $("#" + secondId).attr("class", "card match animated bounce");
            firstClick = null; //以判断完毕，将值设为null，下次使用
            secondClick = null;
            canClick = true;
        } else if (firstClick != secondClick && firstClick != null && secondClick != null) {
            //匹配失败的话将一切还原
            firstClick = null;
            secondClick = null;
            $("#" + firstId).attr("status", "closed");
            $("#" + secondId).attr("status", "closed");
            //添加一点翻转回去的动画效果
            setTimeout(function() {
                $("#" + firstId).attr("class", "card open show animated flash");
                $("#" + secondId).attr("class", "card open show animated flash");
            }, 400);
            setTimeout(function() {
                $("#" + firstId).attr("class", "card");
                $("#" + secondId).attr("class", "card");
                canClick = true;
            }, 1300);
        }

        //检查游戏是否结束
        checkFinish();
    }
});

//函数：检查游戏是否结束，结束时显示恭喜页面
function checkFinish() {
    if ($("#card0").attr("status") == "open" && $("#card1").attr("status") == "open" && $("#card2").attr("status") == "open" && $("#card3").attr("status") == "open" && $("#card4").attr("status") == "open" && $("#card5").attr("status") == "open" && $("#card6").attr("status") == "open" && $("#card7").attr("status") == "open" && $("#card8").attr("status") == "open" && $("#card9").attr("status") == "open" && $("#card10").attr("status") == "open" && $("#card11").attr("status") == "open" && $("#card12").attr("status") == "open" && $("#card13").attr("status") == "open" && $("#card14").attr("status") == "open" && $("#card15").attr("status") == "open") {
        $(".moveNum").text(count);
        $(".starNum").text(starCount);
        $(".timerNum").text(timerCount);
        $(".finishPage").css("display", "block");
    }
}

//restart按钮，绑定重新开始
$(".restart").on("click", function() {
    location.reload();
});

//playagain按钮，绑定重新开始
$(".playAgain").on("click", function() {
    location.reload();
});

//计时器，当点击了格子后，计时器开始计时
var startTimer = true;
var timerCount = 0;

function timer() {
    timerCount++;
    $(".timer").text(timerCount);
}

$(".card").on("click", function() {
		//因为这个函数会为每一个.card绑定监听事件，设置一个Boolean变量，使得只有第一次点击有效
    if (startTimer) {  
        startTimer = false;
        setInterval(timer, 1000);
    }
});