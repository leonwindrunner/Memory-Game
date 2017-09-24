function creatBoxes() {
	function shuffle(array) {
	    var currentIndex=array.length, temporaryValue, randomIndex;

	    while (currentIndex!==0) {
	        randomIndex=Math.floor(Math.random() * currentIndex);
	        currentIndex-=1;
	        temporaryValue=array[currentIndex];
	        array[currentIndex]=array[randomIndex];
	        array[randomIndex]=temporaryValue;
	    }

	    return array;
	}

	var cardArry = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
	cardArry = shuffle(cardArry);

	function Card(className,symbol,id,status) {
		this.className=className;
		this.symbol=symbol;
		this.id=id;
		this.status=status;
	}

	//循环构造16个对象 如var card0=new Card("card",cardArry[0],"card0","open");

	for(let i=0;i<16;i++) {
		eval('card'+i+'=new Card("card",cardArry["'+i+'"],"card'+i+'","closed")');
	}


	//在html中插入16个<li>元素，每个<li>元素下有个i元素，并添加属性
	// <li class="card">
	//     <i class="fa fa-bicycle"></i>
	// </li>
	for(let i=0;i<16;i++) {
		var txt="<li class=\""+eval("card"+i).className+"\" id=\""+eval("card"+i).id+"\" status=\""+eval("card"+i).status+"\"><i class=\"fa "+eval("card"+i).symbol+"\"></i></li>";
		$(".deck").append(txt);
	}
}

creatBoxes();

var firstClick=null;
var secondClick=null;
var firstId;
var secondId;
var count=0;
$(".deck").on("click","li[status='closed']",function(e) {
	$(this).attr("class","card open show");
	count++;
	$(".moves").text(count);
	if(count>5) {
		$(".stars li").eq(2).children().attr("class","fa fa-star-o");
	}
	if(count>10) {
		$(".stars li").eq(1).children().attr("class","fa fa-star-o");
	}
	if(firstClick==null) {
		firstClick=eval(e.target.id).symbol;
		firstId=e.target.id;
		$(this).attr("status","open");
	}else {
		secondClick=eval(e.target.id).symbol;
		secondId=e.target.id;
		$(this).attr("status","open");
	}
  
    if(firstClick==secondClick&&firstClick!=null&&secondClick!=null) {
		$("#"+firstId).attr("class","card match");
		$("#"+secondId).attr("class","card match");
		firstClick=null;
    	secondClick=null;
    }else if(firstClick!=secondClick&&firstClick!=null&&secondClick!=null){
    	firstClick=null;
    	secondClick=null; 
    	$("#"+firstId).attr("status","closed");
		$("#"+secondId).attr("status","closed");	
    	setTimeout(function(){    	
			$("#"+firstId).attr("class","card");
			$("#"+secondId).attr("class","card");
		},700); 
    }  
});


$(".restart").on("click",function() {
	$(".deck").empty();
	count=0;
	$(".moves").text(count);
	$(".stars li").children().attr("class","fa fa-star");
	creatBoxes();
})


/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
