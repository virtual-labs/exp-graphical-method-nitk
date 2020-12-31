//gap between lines
var grid_size = 35;

//each line plot points
var xaxis_starting_point = {number : 100, suffix:" "};
var yaxis_starting_point = {number : 100, suffix:" "};

//main canvas to plot graph
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

//to be used for animations
var canvas2 = document.getElementById('mycanvas2');
var ctx2 = canvas2.getContext('2d');

//-------------paper for dotted line-----------
var paper = document.getElementById('paper');
var pctx = paper.getContext('2d');


//----------------paper for solid line-----------
var paper2 = document.getElementById('paper2');
var pctx2 = paper2.getContext('2d');

// //line plotting pencil within paper canvas
var imgTag = new Image();
var imgTag1 = new Image();
var rp = new Image();
var sp = new Image();
imgTag.src = "images/pencil1.png";
imgTag1.src = "images/xarrow.png";
rp.src = "images/rp.png";
sp.src = "images/sp.png";

//holding height and width of canvas
var canvas_width = canvas.width;
var canvas_height = canvas.height;

//no of vertical grid lines
var num_lines_x = Math.floor(canvas.height/grid_size);

//no of horizontal grid lines
var num_lines_y = Math.floor(canvas.width/grid_size);

//distance between lines
var xaxis_distance_gridlines = num_lines_x-1;

var yaxis_distance_gridlines = 1;
var t = 1,tx = 1,ty = 1,tpoint = 0,paperpointab=0,paperpointcd=0,lpoint=1,jpts=0,jpts1=0;

//animating drawing axis lines
var ptsx =[];
var ptsy =[];
var vertices = [];

//track span click operations
var spanclick=0;

//for solidline  and dotted line tables
var lin=0,tablesh=0;
var a1=0,b1=0,c1=0,d1=0,e1=0,f1=0,g1=0,h1=0,p=0,q=0,r=0,s=0,t=0,u=0;

// //---tooltip variable
var sp1=0;


//for calculation
var solidline=0,m=0,n=0;

//for animating hand symbol
var ids,myInt;


//---variables plotting line on paper stores line as pencil track points
var x;
var y;
var xx;
var yy;
var i,j;

//variables for tunnnel plot
var tun1x=0,tun1y=90,tun2x=0,tun2y=110;


//variables for drip
var speed =5;
var p1 = {x:270,y:-258};
var angle=135;
var radians = angle*Math.PI/180;
var xunits = Math.cos(radians)*speed;
var yunits = Math.sin(radians)*speed;
var point = new Array();
var ball ={x:p1.x,y:p1.y};
var drip=0;

//Vetical Thickness plot variables
var vtInt = 0;
var vtCount = 1;
var sX =0,sY =0,dY = 0,tP =0;


// Prompt questions during simulation
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.text = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}

//To set the questions division
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}

//-------------------------------------initial x and y axis plot points---------------------------------------
ptsx.push({
	x:0,
	y:grid_size*xaxis_distance_gridlines
});
ptsx.push({
	x:canvas_width,
	y:grid_size*xaxis_distance_gridlines
});
ptsy.push({
	x:grid_size*yaxis_distance_gridlines,
	y:0
});
ptsy.push({
	x:grid_size*yaxis_distance_gridlines,
	y:canvas_height
});



var xpoints = calcWaypoints(ptsx);
var ypoints = calcWaypoints(ptsy);

//jquery onload functions 
 
$(function()
{
	document.getElementById("select8-1").selectedIndex = 0;
	document.getElementById("select8-2").selectedIndex = 0;
	$('#select8-1').on('select', function() {
		$(this).next("span").remove();
	});
	$('#select8-2').on('select', function() {
		$(this).next("span").remove();
	});
	$('#select8-1').on('change', function() {
		$(this).next("span").remove();
		m=$(this).val();
		if(solidline == 0 && m ==200)
			$(this).prop('disabled',true);
		else if(solidline == 1 && m == 300)
			$(this).prop('disabled',true);
		else if(solidline == 2 && m == 300)
			$(this).prop('disabled',true);
		else if(solidline == 3 && m == 400)
			$(this).prop('disabled',true);
		else if(solidline == 4 && m == 500)
			$(this).prop('disabled',true);
		else if(solidline == 5 && m == 300)
			$(this).prop('disabled',true);
		else
			$('#select8-1').after("<span>&#10008;</span>");
		isDisabled();
	});
	$('#select8-2').on('change', function() {
		$(this).next("span").remove();
		n=$(this).val();
		if(solidline == 0 && n == 300)
			$(this).prop('disabled',true);
		else if(solidline == 1 && n == 400)
			$(this).prop('disabled',true);
		else if(solidline == 2 && n == 400)
			$(this).prop('disabled',true);
		else if(solidline == 3 && n == 500)
			$(this).prop('disabled',true);
		else if(solidline == 4 && n == 400)
			$(this).prop('disabled',true);
		else if(solidline == 5 && n == 200)
			$(this).prop('disabled',true);
		else
			$('#select8-2').after("<span>&#10008;</span>");
		isDisabled();
	});
	function isDisabled()
	{
		if($('#select8-1').prop('disabled')== true && $('#select8-2').prop('disabled') == true)
		{
			document.getElementById('calci').style.visibility="visible";
			//$('#calci').show();
		}
	}
	$('#calci').click(function()
	{
		document.getElementById('calci').style.visibility="hidden";
		if( solidline == 0 )
		{
			setTimeout(function()
			{
				document.getElementById('can8-2').style.visibility="visible";
				$('#can8-2').html("&alpha;=90");
				document.getElementById('can8-3').style.visibility="visible";
				$('#can8-3').html("&beta;=400");
				document.getElementById('can8-4').style.visibility="visible";
				$('#can8-4').html("&yen;=270");
			},1500);
			setTimeout(function()
			{
				$('#can8-5').html("<strong>&alpha;<&beta;</strong>");
				document.getElementById('can8-5').style.visibility="visible";
			},3500);
			setTimeout(function()
			{
				$('#can8-6').html("Index=(N*(¥- α )+M*( β-¥))/( β- α)");
				document.getElementById('can8-6').style.visibility="visible";
			},5500);
			setTimeout(function()
			{
				$('#can8-7').html("Index=(300*(270-90)+200*(400-270))/(400-90)");
				document.getElementById('can8-7').style.visibility="visible";
			},7500);
			setTimeout(function()
			{
				document.getElementById('can8-7').style.visibility="hidden";
				$('#can8-8').html("Index=258");
				document.getElementById('can8-8').style.visibility="visible";
				document.getElementById('nb').style.visibility="visible";
				$('#tp').html("258");
			},9500);
		}
		else if( solidline == 1 )
		{
			setTimeout(function()
			{
				document.getElementById('can8-2').style.visibility="visible";
				$('#can8-2').html("&alpha;=400");
				document.getElementById('can8-3').style.visibility="visible";
				$('#can8-3').html("&beta;=710");
				document.getElementById('can8-4').style.visibility="visible";
				$('#can8-4').html("&yen;=410");
			},1500);
			setTimeout(function()
			{
				$('#can8-5').html("<strong>&alpha;<&beta;</strong>");
				document.getElementById('can8-5').style.visibility="visible";
			},3500);
			setTimeout(function()
			{
				$('#can8-6').html("Index=(N*(¥- α )+M*( β-¥))/( β- α)");
				document.getElementById('can8-6').style.visibility="visible";
			},5500);
			setTimeout(function()
			{
				$('#can8-7').html("Index=(400*(410-400)+300*(710-410))/(710-400)");
				document.getElementById('can8-7').style.visibility="visible";
			},7500);
			setTimeout(function()
			{
				document.getElementById('can8-7').style.visibility="hidden";
				$('#can8-8').html("Index=303");
				document.getElementById('can8-8').style.visibility="visible";
				document.getElementById('nb').style.visibility="visible";
				$('#tq').html("303");
			},9500);
		}
		else if( solidline == 2 )
		{
			setTimeout(function()
			{
				document.getElementById('can8-2').style.visibility="visible";
				$('#can8-2').html("&alpha;=400");
				document.getElementById('can8-3').style.visibility="visible";
				$('#can8-3').html("&beta;=710");
				document.getElementById('can8-4').style.visibility="visible";
				$('#can8-4').html("&yen;=570");
			},1500);
			setTimeout(function()
			{
				$('#can8-5').html("<strong>&alpha;<&beta;</strong>");
				document.getElementById('can8-5').style.visibility="visible";
			},3500);
			setTimeout(function()
			{
				$('#can8-6').html("Index=(N*(¥-α)+M*(β-¥))/(β-α)");
				document.getElementById('can8-6').style.visibility="visible";
			},5500);
			setTimeout(function()
			{
				$('#can8-7').html("Index=(400*(570-400)+300*(710-570))/(710-400)");
				document.getElementById('can8-7').style.visibility="visible";
			},7500);
			setTimeout(function()
			{
				document.getElementById('can8-7').style.visibility="hidden";
				$('#can8-8').html("Index=354");
				document.getElementById('can8-8').style.visibility="visible";
				document.getElementById('nb').style.visibility="visible";
				$('#tr').html("354");
			},9500);
		}
		else if( solidline == 3 )
		{
			setTimeout(function()
			{
				document.getElementById('can8-2').style.visibility="visible";
				$('#can8-2').html("&alpha;=710");
				document.getElementById('can8-3').style.visibility="visible";
				$('#can8-3').html("&beta;=990");
				document.getElementById('can8-4').style.visibility="visible";
				$('#can8-4').html("&yen;=855");
			},1500);
			setTimeout(function()
			{
				$('#can8-5').html("<strong>&alpha;<&beta;</strong>");
				document.getElementById('can8-5').style.visibility="visible";
			},3500);
			setTimeout(function()
			{
				$('#can8-6').html("Index=(N*(¥- α )+M*( β-¥))/( β- α)");
				document.getElementById('can8-6').style.visibility="visible";
			},5500);
			setTimeout(function()
			{
				$('#can8-7').html("Index=(500*(855-710 )+400*(990-855))/(990-710)");
				document.getElementById('can8-7').style.visibility="visible";
			},7500);
			setTimeout(function()
			{
				document.getElementById('can8-7').style.visibility="hidden";
				$('#can8-8').html("Index=452");
				document.getElementById('can8-8').style.visibility="visible";
				document.getElementById('nb').style.visibility="visible";
				$('#ts').html("452");
			},9500);
		}
		else if( solidline == 4 )
		{
			setTimeout(function()
			{
				document.getElementById('can8-2').style.visibility="visible";
				$('#can8-2').html("&alpha;=1100");
				document.getElementById('can8-3').style.visibility="visible";
				$('#can8-3').html("&beta;=1210");
				document.getElementById('can8-4').style.visibility="visible";
				$('#can8-4').html("&yen;=1165");
			},1500);
			setTimeout(function()
			{
				$('#can8-5').html("<strong>&alpha;<&beta;</strong>");
				document.getElementById('can8-5').style.visibility="visible";
			},3500);
			setTimeout(function()
			{
				$('#can8-6').html("Index=(N*(¥- α )+M*( β-¥))/( β- α) ");
				document.getElementById('can8-6').style.visibility="visible";
			},5500);
			setTimeout(function()
			{
				$('#can8-7').html("Index=(400*(1165-1100)+500*(1210-1165))/(1210-1100)");
				document.getElementById('can8-7').style.visibility="visible";
			},7500);
			setTimeout(function()
			{
				document.getElementById('can8-7').style.visibility="hidden";
				$('#can8-8').html("Index=441");
				document.getElementById('can8-8').style.visibility="visible";
				document.getElementById('nb').style.visibility="visible";
				$('#tt').html("441");
			},9500);
		}
		else if( solidline == 5 )
		{
			setTimeout(function()
			{
				document.getElementById('can8-2').style.visibility="visible";
				$('#can8-2').html("&alpha;=1330");
				document.getElementById('can8-3').style.visibility="visible";
				$('#can8-3').html("&beta;=1420");
				document.getElementById('can8-4').style.visibility="visible";
				$('#can8-4').html("&yen;=1385");
			},1500);
			setTimeout(function()
			{
				$('#can8-5').html("<strong>&alpha;<&beta;</strong>");
				document.getElementById('can8-5').style.visibility="visible";
			},3500);
			setTimeout(function()
			{
				$('#can8-6').html("Index=(N*(¥- α )+M*( β-¥))/( β- α) ");
				document.getElementById('can8-6').style.visibility="visible";
			},5500);
			setTimeout(function()
			{
				$('#can8-7').html("Index=(200*(1385-1330)+300*(1420-1385))/(1420-1330)");
				document.getElementById('can8-7').style.visibility="visible";
			},7500);
			setTimeout(function()
			{
				document.getElementById('can8-7').style.visibility="hidden";
				$('#can8-8').html("Index=239");
				document.getElementById('can8-8').style.visibility="visible";
				$('#tu').html("239");
			},9500);
			setTimeout(function()
			{
				document.getElementById('select8-1').style.visibility="hidden";			
				document.getElementById('select8-2').style.visibility="hidden";			
				document.getElementById('can8-1').style.visibility="hidden";			
				document.getElementById('can8-2').style.visibility="hidden";			
				document.getElementById('can8-3').style.visibility="hidden";			
				document.getElementById('can8-4').style.visibility="hidden";			
				document.getElementById('can8-5').style.visibility="hidden";			
				document.getElementById('can8-6').style.visibility="hidden";			
				document.getElementById('can8-8').style.visibility="hidden";	
				document.getElementById('img8-1').style.visibility="hidden";	
				document.getElementById('table1').style.visibility="hidden";	
				$('label').css({'visibility':'hidden'});
				$('#table2').css({'left':'250px'});
				document.getElementById('nextButton').style.visibility="visible";	
			},11500);
		}
	});
	$('#nb').click(function()
	{ 	
		if(solidline == 0)
		{
			document.getElementById('img8-1').src="images/img8-2.png";
			$('#can8-1').html("&#10148;For the solid line <span>q</span>:");
		}
		if(solidline == 1)
		{
			document.getElementById('img8-1').src="images/img8-3.png";
			$('#can8-1').html("&#10148;For the solid line <span>r</span>:");
		}
		if(solidline == 2)
		{
			document.getElementById('img8-1').src="images/img8-4.png";
			$('#can8-1').html("&#10148;For the solid line <span>s</span>:");
		}
		if(solidline == 3)
		{
			document.getElementById('img8-1').src="images/img8-5.png";
			$('#can8-1').html("&#10148;For the solid line <span>t</span>:");
		}
		if(solidline == 4)
		{
			document.getElementById('img8-1').src="images/img8-6.png";	
			$('#can8-1').html("&#10148;For the solid line <span>u</span>:");
		}

		document.getElementById('nb').style.visibility="hidden";
		document.getElementById("select8-1").selectedIndex = 0;
		document.getElementById("select8-2").selectedIndex = 0;
		document.getElementById("select8-1").disabled = false;
		document.getElementById("select8-2").disabled = false;
		document.getElementById('can8-2').style.visibility="hidden";			
		document.getElementById('can8-3').style.visibility="hidden";			
		document.getElementById('can8-4').style.visibility="hidden";			
		document.getElementById('can8-5').style.visibility="hidden";			
		document.getElementById('can8-6').style.visibility="hidden";			
		document.getElementById('can8-8').style.visibility="hidden";	
		solidline++;
	});
	$('#pp').click(function()
	{
		myStopFunction(ids);
		$('#pp span').remove();
		if(drip == 0)
		{
			gameLoop();
			// drawppattern();
		}
	});
	$('#l').click(function()
	{
		myStopFunction(ids);
		$('#l span').remove();
		if(drip == 0)
		{
			drawppattern();
			drip++;
			chkdrip2();
		}
	});
	$('#qq').click(function()
	{
		myStopFunction(ids);
		$('#qq span').remove();
		if(drip==1)
		{
			p1={x:410,y:-303};
			ball ={x:p1.x,y:p1.y};
			gameLoop();
			// drawqpattern();
		}
	});
	$('#sh').click(function()
	{
		myStopFunction(ids);
		$('#sh span').remove();
		if(drip == 1)
		{
			drawqpattern();
			drip++;
			chkdrip2();
		}
	});
	$('#rr').click(function()
	{
		myStopFunction(ids);
		$('#rr span').remove();
		if(drip==2)
		{
			p1={x:570,y:-355};
			ball ={x:p1.x,y:p1.y};
			gameLoop();
			// i=140,j=30;
			// drawrpattern();
		}
	});
	$('#cs').click(function()
	{
		myStopFunction(ids);
		$('#cs span').remove();
		if(drip == 2)
		{
			i=140,j=30;
			drawrpattern();
			drip++;
			chkdrip2();
		}
	});
	$('#ss').click(function()
	{
		myStopFunction(ids);
		$('#ss span').remove();
		if(drip == 3)
		{
			p1={x:855,y:-452};
			ball ={x:p1.x,y:p1.y};
			gameLoop();
			// i=250,j=40;
			// drawspattern();
		}
	});
	$('#bs').click(function()
	{
		myStopFunction(ids);
		$('#bs span').remove();
		if(drip == 3)
		{
			i=250,j=40;
			drawspattern();
			drip++;
			chkdrip2();
		}
	});
	$('#ttt').click(function()
	{
		myStopFunction(ids);
		$('#ttt span').remove();
		if(drip == 4)
		{
			p1={x:1165,y:-441};
			ball ={x:p1.x,y:p1.y};
			gameLoop();
			// i=460,j=30;
			// drawtpattern();
		}
	});
	$('#rs').click(function()
	{
		myStopFunction(ids);
		$('#rs span').remove();
		if(drip == 4)
		{
			i=460,j=30;
			drawtpattern();
			drip++;
			chkdrip2();
		}
	});
	$('#uu').click(function()
	{
		myStopFunction(ids);
		$('#uu span').remove();
		if(drip == 5)
		{
			p1={x:1385,y:-239};
			ball ={x:p1.x,y:p1.y};
			gameLoop();
			// i=780,j=10;
			// drawupattern();
		}
	});
	$('#cgs').click(function()
	{
		myStopFunction(ids);
		$('#cgs span').remove();
		if(drip == 5)
		{
			i=780,j=10;
			drawupattern();
			drip++;
			chkdrip2();
		}
	});
	$('#c').click(function()
	{
		myStopFunction(ids);
		$('#c span').remove();
		if(drip == 6)
		{
			i=1200,j=10;
			drawopattern();
		}
	});
});
 
 
 
 
 // -------------To draw drip--------
function drawScreen()
{
	ctx.strokeStyle="#000000";
	ball.x+= xunits;
	ball.y+= yunits;
	point.push({x:ball.x,y:ball.y});
	ctx.fillStyle = "#000000";	
	ctx.beginPath();
	ctx.arc(grid_size*ball.x/100,grid_size*ball.y/100,1,0,Math.PI*2,true);
	ctx.fill();
	ctx.closePath();
	if(grid_size*ball.y/100>0)
	{
		drip++;
		chkdrip();
		if(drip==6)
		{
			document.getElementById('nextButton').style.visibility="visible";
		}
	}
}

function gameLoop()
{
	window.setTimeout(gameLoop,20);
	if(grid_size*ball.y/100>=-40 && grid_size*ball.y/100<=-33)
	{
		ctx.closePath();
		ball.x+=xunits*1;
		ball.y+=yunits*1;
	}
	else if(grid_size*ball.y/100<0)
		drawScreen();
}




function animatearrow(ids)
{
    if(document.getElementById(ids).style.visibility=="visible")
        document.getElementById(ids).style.visibility="hidden";
    else
        document.getElementById(ids).style.visibility="visible";
}

//stop blinking arrow
function myStopFunction(ids) 
{
    clearInterval(myInt);
   // document.getElementById('ids').style.visibility="hidden";
}





	$('#scale').mouseover(function()
	{
		$('#scinff').show();
	});
	$('#scale').mouseout(function()
	{
		$('#scinff').hide();
	});
	$('#direct').mouseover(function()
	{
		$('#direction').show();
	});
	$('#direct').mouseout(function()
	{
		$('#direction').hide();
	});
	$('#legend').mouseover(function()
	{
		$('#legg').show();
	});
	$('#legend').mouseout(function()
	{
		$('#legg').hide();
	});
	$('#step16-1').click(function()
	{
		$('#resultContainer').empty();
		document.getElementById('scale').style.visibility="hidden";
		document.getElementById('direct').style.visibility="hidden";
		document.getElementById('legend').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('details').style.animation="";
		document.getElementById('details').style.visibility="hidden";
		$('#resultContainer').html('<img id="ctmap" style="position: absolute; left: 55px; top: 120px;" src="images/ctrmap1.png"/>');
	});
	$('#step16-2').click(function()
	{
		$('#resultContainer').empty();
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('scale').style.visibility="visible";
		document.getElementById('direct').style.visibility="visible";
		document.getElementById('legend').style.visibility="visible";
		document.getElementById('details').style.visibility="visible";
		document.getElementById('details').style.animation = "blink_effect 0.8s infinite"
		$('#mycanvas').css({'left':'125px','top':'160px'});
		$('#scale').css({'left':'590px','top':'170px'});
		$('#direct').css({'left':'590px','top':'210px'});
		$('#legend').css({'left':'590px','top':'250px'});
		$('#scinff').css({'left':'460px','top':'170px'});
		$('#direction').css({'left':'500px','top':'170px'});
		$('#legg').css({'left':'260px','top':'170px'});
		
	});
	
	 $('#mycanvas').mousemove(function(event){
		 var xx = event.pageX;
		 var yy = event.pageY;
		  // $('#tooltip-span').text(xx+" "+yy);
		  // $('#tooltip-span').css({
				  // position:'absolute',
				  // top:yy,
				  // left:xx+10,
				  // visibility:'visible'
				// });
		 if(sp1==1)
		 {
			 $('#tooltip-span').text(xx+" "+yy);    
			 if(xx>=191 && xx<=195 && yy>=440 && yy<=444)
			 {
				$('#tooltip-span').text("a(90,200)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			 else if(xx>=300 && xx<=304 && yy>=405&& yy<=409)
			 {
				$('#tooltip-span').text("b(400,300)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=408 && xx<=412 && yy>=370 && yy<=374)
			 {
				$('#tooltip-span').text("c(710,400)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=506&& xx<=510 && yy>=335&& yy<=339)
			 {
				$('#tooltip-span').text("d(990,500)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX-90,
				  visibility:'visible'
				});
			 }
			  else if(xx>=545&& xx<=549 && yy>=335 && yy<=339)
			 {
				$('#tooltip-span').text("e(1100,500)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=583 && xx<=587 && yy>=370 && yy<=374)
			 {
				$('#tooltip-span').text("f(1210,400)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=625 && xx<=629 && yy>=405 && yy<=409)
			 {
				$('#tooltip-span').text("g(1330,300)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=656 && xx<=660 && yy>=440 && yy<=444)
			 {
				$('#tooltip-span').text("h(1420,200)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=253 && xx<=258 && yy>=419&& yy<=424)
			 {
				$('#tooltip-span').text("p(270,258)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX-90,
				  visibility:'visible'
				});
			 }
			  else if(xx>=302 && xx<=307 && yy>=403&& yy<=408)
			 {
				$('#tooltip-span').text("q(410,303)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=358 && xx<=363 && yy>=385 && yy<=390)
			 {
				$('#tooltip-span').text("r(570,355)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=458 && xx<=463 && yy>=350 && yy<=355)
			 {
				$('#tooltip-span').text("s(855,452)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX-90,
				  visibility:'visible'
				});
			 }
			  else if(xx>=566 && xx<=571 && yy>=355 && yy<=360)
			 {
				$('#tooltip-span').text("t(1165,441)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=644 && xx<=649 && yy>=425 && yy<=430)
			 {
				$('#tooltip-span').text("u(1385,239)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX-90,
				  visibility:'visible'
				});
			 }
			 else
			 {
				 $('#tooltip-span').css({
					visibility:'hidden'
				});
			 }
		 }
    });
	
	
// // calc waypoints traveling along vertices(for line tracing)
function calcWaypoints(vertices) {
    var waypoints = [];
    for (var i = 1; i < vertices.length; i++) {
        var pt0 = vertices[i - 1];
        var pt1 = vertices[i];
		var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;
        for (var j = 0; j < 100; j++) {
            var x = pt0.x + dx * j / 100;
            var y = pt0.y + dy * j / 100;
            waypoints.push({
                x:x,
                y:y
            });
        }
    }
    return (waypoints);
}

// //-------function for array formation--------------
function formArray(x1,y1,x2,y2)
{
	var farray = [];
	farray.push({
		x:x1,
		y:y1
	});
	farray.push({
		x:x2,
		y:y2
	});
	return (farray);
}
//-------------function navnext------------
function navNext()
{

     for (temp = 0; temp <=15; temp++) 
     { 
         document.getElementById ('canvas'+temp).style.visibility="hidden";
     }
     simsubscreennum+=1;
     document.getElementById('canvas'+(simsubscreennum)).style.visibility="visible";

     document.getElementById('nextButton').style.visibility="hidden";
     magic();
}

//---------function magic starts here-----------
function magic()
{
	if(simsubscreennum == 1)
	{	
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('canvas-wrap-1').style.visibility="visible";
		setTimeout(function()
		{
			$('#cover').animate({
									left:'35px',
									top:'210px'
								},500,
								function(){
								document.getElementById('fullmap').style.visibility="hidden";
								document.getElementById('ctr1').style.visibility="visible";
								document.getElementById('line1').style.visibility="visible";
								});
		},1500);
		setTimeout(function()
		{
			document.getElementById('fullmap').style.visibility="visible";
			document.getElementById('ctr1').style.visibility="hidden";
			document.getElementById('cover').style.visibility="hidden";
			document.getElementById('nextButton').style.visibility="visible";
		},3000);
	}
	else if(simsubscreennum == 2)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('fullmap').style.visibility="hidden";
		document.getElementById('line').style.visibility="hidden";
		document.getElementById('line1').style.visibility="hidden";
		document.getElementById('cmap').style.visibility="visible";
		
	}
	else if(simsubscreennum == 3)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('dotplot').style.visibility="hidden";
		document.getElementById('map2').style.visibility="hidden";
		document.getElementById('dotpoints').style.visibility="hidden";	
		ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas		
		drawXaxis();
		drawYaxis();
		spanclick=3;
		document.getElementById('cmap').style.visibility="visible";
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('mycanvas').style.border="solid 2px";
		document.getElementById('cmap').innerHTML="Plot X-Axis";	
		
	}
	else if(simsubscreennum == 4)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('dotpic').style.visibility="visible";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Define<br>Co-ordinates";	
		ctx.beginPath();
		ctx.lineWidh = 4;
		ctx.font = '20px Verdana';
		ctx.fillText("Geographical Profile along XY",30,-295); 
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		
	}
	else if(simsubscreennum == 5)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('scale').style.visibility="hidden";
		document.getElementById('direct').style.visibility="hidden";
		document.getElementById('dottable').style.visibility="hidden";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Get Paper";
		lin=1;
		tablesh = 1;
		spanclick=0;
		
	}
	else if(simsubscreennum == 6)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('solidplot').style.visibility="hidden";
		document.getElementById('solidpoints').style.visibility="hidden";
		document.getElementById('solidpic').style.visibility="visible";
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Define X-Cordinates";
		spanclick=8;		
	}
	else if(simsubscreennum == 7)
	{
		document.getElementById('nextButton').style.visibility="hi";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('solidtable1').style.visibility="hidden";
		setTimeout(function()
		{
			document.getElementById('can7-1').style.visibility="visible";
			document.getElementById('img7-1').style.visibility="visible";
		},1500);
		setTimeout(function()
		{
			document.getElementById('img7-1').style.visibility="hidden";
			document.getElementById('can7-2').style.visibility="visible";
			document.getElementById('img7-2').style.visibility="visible";
			document.getElementById('img7-4').style.visibility="visible";
		},3500);
		setTimeout(function()
		{
			document.getElementById('can7-3').style.visibility="visible";
		},4500);
		setTimeout(function()
		{
			document.getElementById('can7-4').style.visibility="visible";
			document.getElementById('img7-3').style.visibility="visible";
		},6500);
		setTimeout(function()
		{
			document.getElementById('can7-5').style.visibility="visible";
		},7500);
		setTimeout(function()
		{
			document.getElementById('can7-6').style.visibility="visible";
		},8500);
		setTimeout(function()
		{
			document.getElementById('can7-7').style.visibility="visible";
			document.getElementById('nextButton').style.visibility="visible";
		},9500);
	}
	else if(simsubscreennum == 8)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('can7-1').style.visibility="hidden";
		document.getElementById('can7-2').style.visibility="hidden";
		document.getElementById('can7-3').style.visibility="hidden";
		document.getElementById('can7-4').style.visibility="hidden";
		document.getElementById('can7-5').style.visibility="hidden";
		document.getElementById('can7-6').style.visibility="hidden";
		document.getElementById('can7-7').style.visibility="hidden";
		document.getElementById('img7-2').style.visibility="hidden";
		document.getElementById('img7-3').style.visibility="hidden";
		document.getElementById('img7-4').style.visibility="hidden";
		
	}
	else if(simsubscreennum == 9)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('table2').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="visible";	
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Click on Points to plot";
		spanclick=9;		
	}
	else if(simsubscreennum == 10)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('solidtable').style.visibility="hidden";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Join Points";
		spanclick=11;	
	}
	else if(simsubscreennum == 11)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Draw Tunnel";
		spanclick=13;	
		
	}
	else if(simsubscreennum == 12)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('cmap').style.visibility="hidden";		
		document.getElementById('mycanvas2').style.visibility="visible";
		ctx2.clearRect(0, 0, 605, 400); 
		ctx2.beginPath();
		ctx2.lineWidh = 4;
		ctx2.strokeStyle="black";
		ctx2.fillStyle="red";
		setTimeout(function()
		{
			ctx2.arc(98,-260,5,0,Math.PI*2,true);
			ctx2.stroke();
			ctx2.fill();
			ctx.closePath();
		},1500);
		setTimeout(function()
		{
			ctx2.beginPath();
			ctx2.arc(134,-200,5,0,Math.PI*2,true);
			ctx2.stroke();
			ctx2.fill();
			ctx.closePath();
		},4000);
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Draw lines perpendicular to XY passing through points of intersection.";
			ctx2.beginPath();
			ctx2.strokeStyle="black";
			ctx2.moveTo(98,-270);
			ctx2.lineTo(98,75);
			// ctx2.moveTo(134,-210);
			// ctx2.lineTo(134,-70);
			ctx2.stroke();
			ctx.closePath();
		},6500);
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Take one  point  on each line  drawn  above consecutively - Let it be a1 and a2.";
			ctx2.beginPath();
			ctx2.font="12px Verdana";
			ctx2.fillStyle="blue";
			ctx2.fillText('a1',108,-250);
			ctx2.fillText('a2',142,-200);
			ctx2.fill();
			ctx.closePath();
		},9000);
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Let the index values of the dotted line be T1 and T2 (T1≠T2) which are at the point of intersection.(i.e., a1 and a2).";
			document.getElementById('can12-2').style.visibility="visible";
		},11500);
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Measure the distance between the above drawn lines along XY, let it be d1.";
			ctx2.beginPath();
			ctx2.strokeStyle="black";
			ctx2.moveTo(98,-200);
			ctx2.lineTo(134,-200);
			ctx2.fillText('d1',110,-180);
			ctx2.stroke();
			ctx2.fill();
			ctx.closePath();
			document.getElementById('can12-3').innerHTML="d1=100";
		},14000);
		setTimeout(function()
		{
			document.getElementById('can12-1').style.visibility="hidden";
			document.getElementById('can12-4').innerHTML="&#10148;For T1>T2: Angle of Dip = tan<sup>-1</sup>⁡( (T1-T2)/d1)";
			document.getElementById('can12-5').innerHTML="&#10148;For T2>T1: Angle of Dip =tan<sup>-1</sup>⁡( (T2-T1)/d1)";
			ctx2.beginPath();
			ctx.lineWidth="5";
			ctx2.strokeStyle="black";
			ctx2.arc(123,-205,4,Math.PI*0.5,0,false);
			ctx2.fillText('θ',110,-200);
			ctx2.stroke();
			ctx.closePath();
		},16500);
		setTimeout(function()
		{
			document.getElementById('can12-6').style.visibility="visible";	
		},17500);
		setTimeout(function()
		{
			document.getElementById('img12-2').style.visibility="visible";	
		},18500);
		setTimeout(function()
		{
			document.getElementById('can12-8').style.visibility="visible";	
			document.getElementById('nextButton').style.visibility="visible";	
		},19500);	
	}
	else if(simsubscreennum == 13)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('mycanvas2').style.visibility="hidden";
		document.getElementById('can12-2').style.visibility="hidden";
		document.getElementById('can12-2').style.visibility="hidden";
		document.getElementById('can12-4').style.visibility="hidden";
		document.getElementById('can12-5').style.visibility="hidden";
		document.getElementById('can12-6').style.visibility="hidden";
		document.getElementById('img12-1').style.visibility="hidden";
		document.getElementById('img12-2').style.visibility="hidden";
		document.getElementById('can12-8').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('scale').style.visibility="visible";	
		document.getElementById('direct').style.visibility="visible";
		ids=$('#s1').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);		
	}
	else if(simsubscreennum == 14)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('pp').style.visibility="hidden";
		document.getElementById('qq').style.visibility="hidden";
		document.getElementById('rr').style.visibility="hidden";
		document.getElementById('ss').style.visibility="hidden";
		document.getElementById('ttt').style.visibility="hidden";
		document.getElementById('uu').style.visibility="hidden";
		document.getElementById('c').style.visibility="hidden";
		ids=$('#s11').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);	
		drip=0;	
	}
	else if(simsubscreennum == 15)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('l').style.visibility="hidden";
		document.getElementById('sh').style.visibility="hidden";
		document.getElementById('cs').style.visibility="hidden";
		document.getElementById('bs').style.visibility="hidden";
		document.getElementById('rs').style.visibility="hidden";
		document.getElementById('cgs').style.visibility="hidden";
		document.getElementById('c').style.visibility="hidden";	
		document.getElementById('r1').style.backgroundColor = "white";	
		updateTable();
	}
	else if(simsubscreennum == 16)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('vttable').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('scale').style.visibility="hidden";
		document.getElementById('direct').style.visibility="hidden";	
		document.getElementById('legend').style.visibility="hidden";	
		sp1=1;		
	}
}






//------------------spanclick------------------
$('#cmap').click('one', function() {
	if(spanclick == 0)
	{
		if(lin == 0)
		{
			document.getElementById('paper').style.visibility="visible";
			document.getElementById('cmap').style.visibility="hidden";
			$('#paper').animate(
								{
									height:'200'
								},
								800,
			
							function(){
				//$('#fullmap').css('clip', 'rect(0px, 600px, 180px, 0px)');
				document.getElementById('paper').width="518";
				document.getElementById('paper').height="200";
				document.getElementById('cmap').style.visibility="visible";
				$('#cmap').text("Mark Points");
				spanclick=1;
			  });
		}
		else if(lin == 1)
		{
			document.getElementById('paper2').style.visibility="visible";
			document.getElementById('cmap').style.visibility="hidden";
			$('#paper2').animate(
								{
									height:'200'
								},
								800,
			
							function(){
				//$('#fullmap').css('clip', 'rect(0px, 600px, 180px, 0px)');
				document.getElementById('paper2').width="518";
				document.getElementById('paper2').height="200";
				document.getElementById('cmap').style.visibility="visible";
				document.getElementById('mycanvas2').style.visibility="visible";
				$('#cmap').text("Mark Points");
				spanclick=1;
			  });
		}
		  
      
    }
	
	else if(spanclick == 1)
	{
		pctx.clearRect(0,0,paper.width,paper.height);
		if(lin == 0)
		{
			document.getElementById('dotpoints').style.visibility="visible";
			$('#dotpoints').show().find('tr').each(function (i,item){  
			var $row = $(item); 
			$row.hide();  
			$row.delay(i*500).fadeIn(500); 	
		});
			plotonpaperab();
		}
		else if(lin == 1)
		{
			document.getElementById('solidpoints').style.visibility="visible";
			$('#solidpoints').show().find('tr').each(function (i,item){  
			var $row = $(item); 
			$row.hide();  
			$row.delay(i*500).fadeIn(500); 	
		});
			plotonpapercd();
		}
		
		
		//document.getElementById('nextButton').style.visibility="visible";
	}
	else if(spanclick == 3)
	{
		document.getElementById('cmap').style.visibility="hidden";
		spanclick=4;
		plotXaxis(xpoints);
	}
	else if(spanclick == 4)
	{
		document.getElementById('cmap').style.visibility="hidden";
		plotYaxis(ypoints);
		setTimeout(function()
		{
			ctx.translate(yaxis_distance_gridlines*grid_size,xaxis_distance_gridlines*grid_size);
			drawtriangle();
			spanclick=5;
		},2600);
	}
	else if(spanclick == 5)
	{
		tickXaxis();
		origin();
		$('#cmap').text("Points on Y-Axis");
		spanclick=6;
	}
	else if(spanclick == 6)
	{
		tickYaxis();
		document.getElementById('cmap').style.visibility = "hidden";
		document.getElementById('nextButton').style.visibility = "visible";
		document.getElementById('scale').style.visibility = "visible";
		document.getElementById('direct').style.visibility = "visible";
		$('#cmap').css('height','35px');
		spanclick=8;
	}
	else if(spanclick == 7)
	{
		namescale();
		document.getElementById('cmap').style.visibility = "hidden";
		document.getElementById('nextButton').style.visibility = "visible";
		$('#cmap').css('height','35px');
		spanclick=8;
	}
	else if(spanclick == 8)
	{
		showtable();
		spanclick=9;
	}
	else if(spanclick == 10)
	{
		endLine();
		document.getElementById('cmap').style.visibility = "hidden";
		document.getElementById('nextButton').style.visibility = "visible";
	}
	else if(spanclick == 11)
	{
			ctx.beginPath();
			ctx.moveTo(0,-grid_size*(180/100));
			joinPoints();
			spanclick=12;
	}
	else if(spanclick == 13)
	{
		ctx.beginPath();
		drawTunnel90();
		ctx.beginPath();
		drawTunnel110();
		spanclick =14;
	}
});

//--------------drawing tunnel()
function drawTunnel90()
{
	ctx.moveTo(grid_size*tun1x/100,-grid_size*tun1y/100);
	ctx.lineTo(grid_size*tun1x/100+10,-grid_size*tun1y/100);
	//pctx.font="12px verdana";
	ctx.lineWidh="1";
	ctx.strokeStyle="black";
	ctx.stroke();
	//pctx.fillText(dotmarkers[paperpointab],xx,190);
	//pctx.fill();
	tun1x += 10;
	if (tun1x<=1510) requestAnimationFrame(drawTunnel90) 
		if(tun1x>1510)
			ctx.closePath();
}
function drawTunnel110()
{
	ctx.moveTo(grid_size*tun2x/100,-grid_size*tun2y/100);
	ctx.lineTo(grid_size*tun2x/100+10,-grid_size*tun2y/100);
	//pctx.font="12px verdana";
	ctx.lineWidh="1";
	ctx.strokeStyle="black";
	ctx.stroke();
	//pctx.fillText(dotmarkers[paperpointab],xx,190);
	//pctx.fill();
	tun2x += 10;
	if (tun2x<=1510) requestAnimationFrame(drawTunnel110) 
		if(tun2x>1510)
		{
			ctx.closePath();
			document.getElementById('nextButton').style.visibility="visible";
			ctx.beginPath();
			ctx.font="10px verdana";
			ctx.fillStyle="black"
			ctx.fillText("Tunnel",grid_size*650/100,-grid_size*90/100);
			ctx.fill();
			ctx.closePath();
		}
}




//-----animating line draw on paper------------
function drawpp()
	{
		if(lin == 0)
		{
			pctx.moveTo(xx,yy);
			pctx.lineTo(xx,yy+2);
			//pctx.font="12px verdana";
			pctx.lineWidh="1";
			pctx.strokeStyle="blue";
			pctx.stroke();
			//pctx.fillText(dotmarkers[paperpointab],xx,190);
			//pctx.fill();
			yy += 1;
			if (yy<=15) requestAnimationFrame(drawpp) 
		}
		else if(lin == 1)
		{
			pctx2.moveTo(xx,yy);
			pctx2.lineTo(xx,yy+2);
			//pctx.font="12px verdana";
			pctx2.lineWidh="1";
			pctx2.strokeStyle="red";
			pctx2.stroke();
			//pctx.fillText(dotmarkers[paperpointab],xx,190);
			//pctx.fill();
			yy += 1;
			if (yy<=15) requestAnimationFrame(drawpp) 
		}
	}
	
	


//---marking animation with pencil---------
function animate() {
		if(lin == 0)
		{
			ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
			ctx.drawImage(imgTag, x, y);                       // draw image at current position
			y += 1;
			if (y <=190) requestAnimationFrame(animate) 			  // loop
		}	
		else if(lin == 1)
		{
			ctx2.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
			ctx2.drawImage(imgTag, x, y);                       // draw image at current position
			y += 1;
			if (y <=190) requestAnimationFrame(animate) 			  // loop
		}	
}
		
		
//-----------plot on paper for AB line-----------
function plotonpaperab()
{
	document.getElementById('cmap').style.visibility="hidden";
	if (paperpointab < 8) {
		setTimeout(function()
		{
			requestAnimationFrame(plotonpaperab);
		},500);
    }
	if(paperpointab==8)
		{
			spanclick=0;
			setTimeout(function()
			{
				document.getElementById('dotpoints').style.visibility="hidden";
				document.getElementById('paper').style.visibility="hidden";
				document.getElementById('dotplot').style.visibility="visible";
				document.getElementById('nextButton').style.visibility="visible";
				
			},1500);
			ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
		}
	pctx.beginPath();
	if(paperpointab == 0)
	{
			x =92+(paperpointab*35);
			y = 180;
			xx = 29+(paperpointab*35);
			yy = 0;
			pctx.font="12px verdana";
			pctx.fillText(dotmarkers[paperpointab],27+(paperpointab*35),30);
			pctx.fill();
			drawpp();
			animate(x,y);
	}
	else if(paperpointab == 1)
	{
		x = 163+(paperpointab*35);
		y = 180;
		xx = 100+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],105+(paperpointab*35),30);
		pctx.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointab == 2)
	{
		x = 235+(paperpointab*35);
		y = 180;
		xx = 172+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],170+(paperpointab*35),30);
		pctx.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointab == 3)
	{
		x = 293+(paperpointab*35);
		y = 180;
		xx = 230+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],230+(paperpointab*35),30);
		pctx.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointab == 4)
	{
		x =292+(paperpointab*35);
		y = 180;
		xx = 231+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],235+(paperpointab*35),30);
		pctx.fill();
		drawpp();
		animate(x,y);
	}
	else if(paperpointab == 5)
	{
		x = 298+(paperpointab*35);
		y = 180;
		xx = 237+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],239+(paperpointab*35),30);
		pctx.fill();
		drawpp();
		animate(x,y);
	}
	else if(paperpointab == 6)
	{
		x = 298+(paperpointab*35);
		y = 180;
		xx = 235+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],240+(paperpointab*35),30);
		pctx.fill();
		drawpp();
		animate(x,y);
	}
	else if(paperpointab == 7)
	{
		x = 296+(paperpointab*35);
		y = 180;
		xx = 233+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],241+(paperpointab*35),30);
		pctx.fill();
		drawpp();
		animate(x,y);
	}
	paperpointab++;
}




		
//-----------plot on paper for CD line-----------
function plotonpapercd()
{
	document.getElementById('cmap').style.visibility="hidden";
	if (paperpointcd < 6) {
		setTimeout(function()
		{
			requestAnimationFrame(plotonpapercd);
		},500);
    }
	if(paperpointcd==6)
		{
			spanclick=2;
			// lin=1;
			setTimeout(function()
			{
				document.getElementById('paper2').style.visibility="hidden";
				document.getElementById('solidplot').style.visibility="visible";
				document.getElementById('nextButton').style.visibility="visible";
			},1500);
			ctx2.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
		}
	pctx2.beginPath();
	if(paperpointcd == 0)
	{
			x = 148+(paperpointcd*35);
			y = 180;
			xx = 85+(paperpointcd*35);
			yy = 0;
			pctx2.font="12px verdana";
			pctx2.fillText(solidmarkers[paperpointcd],85+(paperpointcd*35),30);
			pctx2.fill();
			drawpp();
			animate(x,y);
	}
	else if(paperpointcd == 1)
	{
		x = 165+(paperpointcd*35);
		y = 180;
		xx = 102+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],102+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointcd == 2)
	{
		x = 182+(paperpointcd*35);
		y = 180;
		xx = 120+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],120+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointcd == 3)
	{
		x = 247+(paperpointcd*35);
		y = 180;
		xx = 185+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],185+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointcd == 4)
	{
		x =320+(paperpointcd*35);
		y = 180;
		xx = 258+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],258+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);
	}
	else if(paperpointcd == 5)
	{
		x = 357+(paperpointcd*35);
		y = 180;
		xx = 295+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],299+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);
	}
	paperpointcd++;
}



//flow of drawing profile view graph
function drawXaxis()
{
	//drawing X-axis and horizontal grid lines
	for(var i=0;i<=num_lines_x;i++)
	{
		ctx.beginPath();
		ctx.lineWidth = 1;
		// if(i == xaxis_distance_gridlines)
		// {             
			// ctx.lineWidth = 2;
			// ctx.strokeStyle = "#000000";
		// }		else
			ctx.strokeStyle ='pink';	
		if(i == num_lines_x){
			ctx.moveTo(0,grid_size*i);
			ctx.lineTo(canvas_width,grid_size*i);
		}
		else{
			ctx.moveTo(0, grid_size*i+0.5);
        	ctx.lineTo(canvas_width, grid_size*i+0.5);
   		}
   	 	ctx.stroke();
	}
}
function drawYaxis()
{
	for(i=0; i<=num_lines_y; i++) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		
		// If line represents Y-axis draw in different color
		// if(i == yaxis_distance_gridlines)
		// { 
			// ctx.lineWidth = 2;
			// ctx.strokeStyle = "#000000";
		// }
		// else
			ctx.strokeStyle = "pink";
		
		if(i == num_lines_y) { 
			ctx.moveTo(grid_size*i, 0);
			ctx.lineTo(grid_size*i, canvas_height);
		}
		else {
			ctx.moveTo(grid_size*i+0.5, 0);
			ctx.lineTo(grid_size*i+0.5, canvas_height);
		}
	ctx.stroke();
	}
	
}
//plotting x axis animation
function plotXaxis()
{
	
 if (tx < xpoints.length - 1) {
        requestAnimationFrame(plotXaxis);
    }
    // draw a line segment from the last waypoint
    // to the current waypoint
	 if (tx == xpoints.length-1) {
		document.getElementById('cmap').style.visibility="visible"  
		document.getElementById('cmap').innerHTML="Plot Y-Axis";	
		}
    ctx.beginPath();
	ctx.lineWidth=2;
	ctx.strokeStyle="black";
    ctx.moveTo(xpoints[tx - 1].x, xpoints[tx - 1].y);
    ctx.lineTo(xpoints[tx].x, xpoints[tx].y);
    ctx.stroke();
	ctx.closePath();
    tx++;
}
//plotting y axis animation
function plotYaxis()
{
	
 if (ty < ypoints.length - 1) {
        requestAnimationFrame(plotYaxis);
    }
    // draw a line segment from the last waypoint
    // to the current waypoint
    ctx.beginPath();
	ctx.lineWidth=2;
	ctx.strokeStyle="black";
    ctx.moveTo(ypoints[ty - 1].x, ypoints[ty - 1].y);
    ctx.lineTo(ypoints[ty].x, ypoints[ty].y);
    ctx.stroke();
	ctx.closePath();
    ty++;
}
function origin()
{
	//Name origin as 0 for AB line
	ctx.beginPath();
	ctx.font = '10px Verdana';
	ctx.fillText("0",-10,15); 
	ctx.fill();
	ctx.closePath();
	
}
function tickXaxis()
{
	
	//----for AB line----------
	for(i=1; i<(num_lines_x+5); i++) {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";

		// Draw a tick mark 6px long (-3 to 3)
		ctx.moveTo(grid_size*i+0.5, -3);
		ctx.lineTo(grid_size*i+0.5, 3);
		ctx.stroke();
		
		// Text value at that point
		ctx.font = '10px Verdana';
		ctx.textAlign = 'start';
		ctx.fillText(yaxis_starting_point.number*i + xaxis_starting_point.suffix, grid_size*i, 15);
		ctx.stroke();
		ctx.closePath();
	}	
	
}
function tickYaxis()
{
	//Positive Y-axis of graph is negative Y-axis of the canvas
	//------------for AB line----------
	for(i=1; i<(num_lines_y); i++) {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";

		// Draw a tick mark 6px long (-3 to 3)
		ctx.moveTo(-3, -grid_size*i+0.5);
		ctx.lineTo(3, -grid_size*i+0.5);
		ctx.stroke();

		// Text value at that point
		ctx.font = '10px Verdana';
		ctx.textAlign = 'start';
		ctx.fillText(xaxis_starting_point.number*i + xaxis_starting_point.suffix, -30,-grid_size*i);
		ctx.stroke();
		ctx.closePath();
	}
	
	
}
function drawtriangle()
{
	//-----------for AB line ------------
	ctx.beginPath();
	ctx.strokeStyle="black";
	ctx.fillStyle="black";
	ctx.font = "20px Verdana Bold";
	ctx.fillText("Y",-(grid_size*(50/100)),-(grid_size*(960/100)));
	ctx.moveTo(0,-(grid_size*(1000/100)));
	ctx.lineTo(-(grid_size*(20/100)),-(grid_size*(970/100)));
	ctx.lineTo((grid_size*(20/100)),-(grid_size*(970/100)));
	ctx.lineTo(0,-(grid_size*(1000/100)));
	ctx.fillText("X",grid_size*(1580/100),-(grid_size*(-50/100)));
	ctx.moveTo(grid_size*(1620/100),-(grid_size*(0/100)));
	ctx.lineTo(grid_size*(1580/100),-(grid_size*(20/100)));
	ctx.lineTo((grid_size*(1580/100)),-(grid_size*(-20/100)));
	ctx.lineTo(grid_size*(1620/100),-(grid_size*(0/100)));
	ctx.fill();
	ctx.closePath();
	document.getElementById('cmap').style.visibility ="visible";
	document.getElementById('cmap').innerHTML ="Points on X-Axis";
}
function namescale()
{
	//Name origin as 0
	ctx.beginPath();
	ctx.font = '14px Verdana';
	ctx.fillText("Scale",350,-300); 
	ctx.fillText("X-Axis:1cm=100m",350,-280); 
	ctx.fillText("Y-Axis:1cm=100m",350,-260); 
	ctx.fill();
	ctx.closePath();
}
function setcanvas()
{
	ctx2.translate(yaxis_distance_gridlines*grid_size,xaxis_distance_gridlines*grid_size);
	setTimeout(function()
	{
		showarrow();
	},500);
}
function showarrow()
{
	document.getElementById('mycanvas2').style.visibility="visible";
	setTimeout(function()
	{
		ctx2.clearRect(0, 0, 605, 400); 		
		ctx2.drawImage(imgTag1,grid_size*(250/100), -grid_size*(662/100));
		document.getElementById('x1').innerHTML="270";
	},2500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(250/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(392/100), -grid_size*(662/100));
		document.getElementById('x2').innerHTML="410";
	},3500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(392/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(552/100), -grid_size*(662/100));
		document.getElementById('x3').innerHTML="570";
	},4500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(552/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(837/100), -grid_size*(662/100));
		document.getElementById('x4').innerHTML="855";
	},5500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(837/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(1147/100), -grid_size*(662/100));
		document.getElementById('x5').innerHTML="1165";
	},6500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(1147/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(1367/100), -grid_size*(662/100));
		document.getElementById('x6').innerHTML="1385";
	},7500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(1367/100),-grid_size*(662/100), 15,234); 
		document.getElementById('mycanvas2').style.visibility="hidden";
		document.getElementById('solidpic').style.visibility="hidden";
		document.getElementById('nextButton').style.visibility="visible";
	},8500);
}
// table show()
function showtable()
{
	if( tablesh == 0 )
	{
		document.getElementById('dottable').style.visibility="visible";		
		$('#dottable').show().find('tr').each(function (i,item){  
		  var $row = $(item); 
			$row.hide();  
			$row.delay(i*200).fadeIn(200); 	
		});
		document.getElementById('cmap').innerHTML="Click on Points<br> to plot";
	}
	else if( tablesh == 1 )
	{
		document.getElementById('solidtable1').style.visibility="visible";		
		// $('#solidtable1').show().find('tr').each(function (i,item){  
		  // var $row = $(item); 
			// $row.hide();  
			// $row.delay(i*200).fadeIn(200); 	
		// });
		document.getElementById('cmap').style.visibility="hidden"
		setcanvas();
	}
	   
}

//plot points using abtable td
$('#dottable td').on('click',function()
{
	var rowid = $(this).attr('id');
	ctx.beginPath();
	ctx.fillStyle="#035c22";
	ctx.strokeStyle="black"
	switch(rowid)
	{
		case 'a1' : ctx.arc(grid_size*(dotpoints[0][0]/100), -grid_size*(dotpoints[0][1]/100),2,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();	
					ctx.closePath();
					$('#a1').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					a1=1;
					break;
		case 'b1' :	ctx.arc(grid_size*(dotpoints[1][0]/100), -grid_size*(dotpoints[1][1]/100),2,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#b1').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					b1=1;
					break;
					
		case 'c1' :	ctx.arc(grid_size*(dotpoints[2][0]/100), -grid_size*(dotpoints[2][1]/100),2,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();	
					ctx.closePath();
					$('#c1').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					c1=1;
					break;
				   
		case 'd1' :	
					ctx.arc(grid_size*(dotpoints[3][0]/100), -grid_size*(dotpoints[3][1]/100),2,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#d1').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					d1=1;
					break;
					
		case 'e1' :	ctx.arc(grid_size*(dotpoints[4][0]/100), -grid_size*(dotpoints[4][1]/100),2,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#e1').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					e1=1;
					break;
					
		case 'f1' :	ctx.arc(grid_size*(dotpoints[5][0]/100), -grid_size*(dotpoints[5][1]/100),2,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#f1').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');					
					f1=1;
					break;
					
		case 'g1' :	ctx.arc(grid_size*(dotpoints[6][0]/100), -grid_size*(dotpoints[6][1]/100),2,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#g1').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');					
					g1=1;
					break;
					
		case 'h1' :	ctx.arc(grid_size*(dotpoints[7][0]/100), -grid_size*(dotpoints[7][1]/100),2,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#h1').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					h1=1;
					break;
					
	}
	if(a1 == 1 && b1 == 1 && c1 == 1 && d1 == 1 && e1 == 1 && f1 == 1 && g1 == 1 && h1 == 1)
	{
		document.getElementById('dotpic').style.visibility = "hidden"
		document.getElementById('cmap').innerHTML = "Plot Y'<br>&lt;X:1535 Y:0&gt;";
		spanclick=10;
	}
		
});

//plot points using abtable td
$('#solidtable td').on('click',function()
{
	var rowidd = $(this).attr('id');
	ctx.beginPath();
	ctx.fillStyle="red";
	ctx.strokeStyle="black";
	switch(rowidd)
	{
		case 'p' : 	ctx.arc(grid_size*(solidpoints[0][0]/100), -grid_size*(solidpoints[0][1]/100),3,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();	
					ctx.closePath();
					$('#p').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					p=1;
					break;
		case 'q' :	ctx.arc(grid_size*(solidpoints[1][0]/100), -grid_size*(solidpoints[1][1]/100),3,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#q').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					q=1;
					break;
					
		case 'r' :	ctx.arc(grid_size*(solidpoints[2][0]/100), -grid_size*(solidpoints[2][1]/100),3,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();	
					ctx.closePath();
					$('#r').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					r=1;
					break;
				   
		case 's' :	
					ctx.arc(grid_size*(solidpoints[3][0]/100), -grid_size*(solidpoints[3][1]/100),3,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#s').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					s=1;
					break;
					
		case 't' :	ctx.arc(grid_size*(solidpoints[4][0]/100), -grid_size*(solidpoints[4][1]/100),3,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#t').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');
					t=1;
					break;
					
		case 'u' :	ctx.arc(grid_size*(solidpoints[5][0]/100), -grid_size*(solidpoints[5][1]/100),3,0,2*Math.PI,false);
					ctx.stroke();	
					ctx.fill();		
					ctx.closePath();
					$('#u').off('click');
					$(this).css('background','#fff');
					$(this).css('cursor','auto');					
					u=1;
					break;
					
	}
	if(p == 1 && q == 1 && r == 1 && s == 1 && t == 1 && u == 1)
	{
		document.getElementById('solidpic').style.visibility="hidden";
		document.getElementById('nextButton').style.visibility="visible";
	}
		
});



function endLine()
{
	//Endline Y';
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.font = "20px Verdana Bold";
	ctx.strokeStyle="#000000";
	ctx.fillStyle="#000000";
	ctx.moveTo(grid_size*(1535/100),-canvas_height);
	ctx.lineTo(grid_size*(1535/100),-(grid_size*(0/100)-(grid_size+15)));
	ctx.moveTo(grid_size*(1535/100),-(grid_size*(1000/100)));
	ctx.lineTo(grid_size*(1515/100),-(grid_size*(970/100)));
	ctx.lineTo((grid_size*(1555/100)),-(grid_size*(970/100)));
	ctx.lineTo(grid_size*(1535/100),-(grid_size*(1000/100)));
	ctx.fillText("Y'",grid_size*(1575/100),-(grid_size*(960/100)));
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function jpoints(x,y)
{
	ctx.lineTo(x,y);
	ctx.stroke();
}

function joinPoints()
{
	if (jpts < dotpoints.length) {
		setTimeout(function()
		{
			requestAnimationFrame(joinPoints);
		},500);
    }
	if(jpts==dotpoints.length)
		{
			jpoints(grid_size*(1535/100),-grid_size*(110/100));
			ctx.closePath();
			document.getElementById('nextButton').style.visibility="visible";
		}
	//Join Points
	ctx.strokeStyle="maroon";
	ctx.lineWidth=1;
		if(jpts==4)
		{
			ctx.quadraticCurveTo(grid_size*((dotpoints[jpts][0]/100)-0.35),-grid_size*((dotpoints[jpts][1]/100)+0.35),grid_size*(dotpoints[jpts][0]/100),-grid_size*(dotpoints[jpts][1]/100));
		}
		if(jpts == 0 || jpts == 1|| jpts == 2 || jpts == 3 || jpts == 5 || jpts == 6 || jpts == 7)
		{	
			jpoints(grid_size*(dotpoints[jpts][0]/100),-grid_size*(dotpoints[jpts ][1]/100));
		}
	jpts++;
}

function chkdrip()
{
	if(drip==1)
	{
		document.getElementById('qq').style.visibility="visible";
		ids=$('#s2').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==2)
	{
		document.getElementById('rr').style.visibility="visible";
		ids=$('#s3').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==3)
	{
		document.getElementById('ss').style.visibility="visible";
		ids=$('#s4').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==4)
	{
		document.getElementById('ttt').style.visibility="visible";
		ids=$('#s5').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==5)
	{
		document.getElementById('uu').style.visibility="visible";
		ids=$('#s6').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
}
function chkdrip2()
{
	if(drip==1)
	{
		document.getElementById('sh').style.visibility="visible";
		ids=$('#s22').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==2)
	{
		document.getElementById('cs').style.visibility="visible";
		ids=$('#s33').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==3)
	{
		document.getElementById('bs').style.visibility="visible";
		ids=$('#s44').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==4)
	{
		document.getElementById('rs').style.visibility="visible";
		ids=$('#s55').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==5)
	{
		document.getElementById('cgs').style.visibility="visible";
		ids=$('#s66').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==6)
	{
		document.getElementById('c').style.visibility="visible";
		ids=$('#s77').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
}
function drawppattern()
{
	ctx.beginPath();
	ctx.fillStyle="red";
	ctx.font="12px Verdana";
	ctx.lineWidh=2;
	ctx.fillText("+",grid_size*(10/100),-(grid_size*(10/100)));
	ctx.fillText("+",grid_size*(9/100),-(grid_size*(45/100)));
	ctx.fillText("+",grid_size*(45/100),-(grid_size*(45/100)));
	ctx.fillText("+",grid_size*(15/100),-(grid_size*(125/100)));
	ctx.fillText("+",grid_size*(55/100),-(grid_size*(125/100)));
	ctx.fillText("+",grid_size*(85/100),-(grid_size*(125/100)));
	ctx.fillText("+",grid_size*(25/100),-(grid_size*(170/100)));
	ctx.fillText("+",grid_size*(60/100),-(grid_size*(170/100)));
	ctx.fillText("+",grid_size*(100/100),-(grid_size*(170/100)));
	ctx.fillText("+",grid_size*(135/100),-(grid_size*(170/100)));
	ctx.fillText("+",grid_size*(137/100),-(grid_size*(200/100)));
	ctx.fillText("+",grid_size*(190/100),-(grid_size*(210/100)));
	ctx.fill();
	ctx.closePath();
	ctx.fillStyle="#743A8F";
	ctx.fillText("Lst/Sh",grid_size*(130/100),-(grid_size*(253/100)));
	ctx.fill();
	ctx.closePath();
}
function drawqpattern()
{
	ctx.fillStyle="brown";
	ctx.lineWidh=2;
	for(i=50;i<130;i+=50)
	{
		ctx.beginPath();
		ctx.arc(grid_size*(i/100),-grid_size*(20/100),3,0,2*Math.PI,false);
		ctx.fill();
	}
	for(i=80;i<155;i+=50)
	{
		ctx.beginPath();
		ctx.arc(grid_size*(i/100),-grid_size*(40/100),3,0,2*Math.PI,false);
		ctx.fill();
	}
	for(i=100;i<170;i+=50)
	{
		ctx.beginPath();
		ctx.arc(grid_size*(i/100),-grid_size*(60/100),3,0,2*Math.PI,false);
		ctx.fill();
	}
	ctx.beginPath();
	ctx.arc(grid_size*(130/100),-grid_size*(80/100),3,0,2*Math.PI,false);
	ctx.fill();
	for(i=170;i<230;i+=50)
	{
		ctx.beginPath();
		ctx.arc(grid_size*(i/100),-grid_size*(130/100),3,0,2*Math.PI,false);
		ctx.fill();
	}
	// for(i=190;i<250;i+=50)
	// {
		ctx.beginPath();
		ctx.arc(grid_size*(210/100),-grid_size*(150/100),3,0,2*Math.PI,false);
		ctx.fill();
	// }
	for(i=200;i<260;i+=50)
	{
		ctx.beginPath();
		ctx.arc(grid_size*(i/100),-grid_size*(170/100),3,0,2*Math.PI,false);
		ctx.fill();
	}
	// for(i=230;i<290;i+=50)
	// {
		ctx.beginPath();
		ctx.arc(grid_size*(240/100),-grid_size*(190/100),3,0,2*Math.PI,false);
		ctx.fill();
	// }
	for(i=250;i<310;i+=50)
	{
		ctx.beginPath();
		ctx.arc(grid_size*(i/100),-grid_size*(210/100),3,0,2*Math.PI,false);
		ctx.fill();
	}
	ctx.beginPath();
	ctx.arc(grid_size*(290/100),-grid_size*(230/100),3,0,2*Math.PI,false);
	ctx.fill();
	for(i=290;i<350;i+=50)
	{
		ctx.beginPath();
		ctx.arc(grid_size*(i/100),-grid_size*(250/100),3,0,2*Math.PI,false);
		ctx.fill();
	}
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle="#743A8F";
	ctx.fillText("Sh/CalSh",grid_size*(220/100),-(grid_size*(298/100)));
	ctx.fill();
	ctx.closePath();
}

 function drawrpattern()
 {
	 ctx.fillStyle="blue";
	while(j<=grid_size*(290/100))
	{
		ctx.drawImage(rp,grid_size*(i/100), -grid_size*(j/100));
		ctx.drawImage(rp,grid_size*((i+50)/100), -grid_size*(j/100));
		i=i+20;
		j=j+20;
	}
	i=250;j=150;
	while(j<=300)
	{
		ctx.drawImage(rp,grid_size*(i/100), -grid_size*(j/100));
		ctx.drawImage(rp,grid_size*((i+50)/100), -grid_size*(j/100));
		i=i+20;
		j=j+20;
	}
	ctx.drawImage(rp,grid_size*(450/100), -grid_size*(320/100));
	ctx.drawImage(rp,grid_size*(490/100), -grid_size*(320/100));
	ctx.drawImage(rp,grid_size*(500/100), -grid_size*(340/100));
	ctx.closePath();
	ctx.fillStyle="#743A8F"
	ctx.fillText("CalSh/BandSh",grid_size*(290/100),-(grid_size*(350/100)));
	ctx.fill();
	ctx.closePath();
 }
 function drawspattern()
 {
	 ctx.fillStyle="green";
	while(j<=grid_size*(290/100))
	{
		ctx.drawImage(sp,grid_size*(i/100), -grid_size*(j/100));
		ctx.drawImage(sp,grid_size*((i+50)/100), -grid_size*(j/100));
		ctx.drawImage(sp,grid_size*((i+100)/100), -grid_size*(j/100));
		i=i+40;
		j=j+40;
	}
	i=370;j=150;
	while(j<=350)
	{
		ctx.drawImage(sp,grid_size*(i/100), -grid_size*(j/100));
		ctx.drawImage(sp,grid_size*((i+50)/100), -grid_size*(j/100));
		ctx.drawImage(sp,grid_size*((i+100)/100), -grid_size*(j/100));
		i=i+40;
		j=j+40;
	}
	ctx.drawImage(sp,grid_size*(670/100), -grid_size*(390/100));
	ctx.drawImage(sp,grid_size*(720/100), -grid_size*(390/100));
	ctx.drawImage(sp,grid_size*(760/100), -grid_size*(420/100));
	ctx.closePath();
	ctx.fillStyle="#743A8F";
	ctx.fillText("BandSh/RedSst",grid_size*(575/100),-(grid_size*(447/100)));
	ctx.fill();
	ctx.closePath();
 }
 function drawtpattern()
 {
	ctx.strokeStyle="#ff00ff";
	ctx.lineWidth=2;
	while(j<=grid_size*(290/100))
	{ 
		var k=i;
		for(k=i;k<=(i+250);k+=50)
		{
			ctx.beginPath();
			ctx.arc(grid_size*(k/100),-grid_size*(j/100),2,0,2*Math.PI,false);
			ctx.stroke();
			ctx.closePath();
		}
		i=i+40;
		j=j+40;
	}
	i=580;j=150;
	while(j<=450)
	{ 
		var k=i;
		for(k=i;k<=(i+250);k+=50)
		{
			ctx.beginPath();
			ctx.arc(grid_size*(k/100),-grid_size*(j/100),2,0,2*Math.PI,false);
			ctx.stroke();
			ctx.closePath();
		}
		i=i+40;
		j=j+40;
	}
	i=960;j=470;
	while(j<=470)
	{ 
		var k=i;
		for(k=i;k<=(i+150);k+=50)
		{
			ctx.beginPath();
			ctx.arc(grid_size*(k/100),-grid_size*(j/100),2,0,2*Math.PI,false);
			ctx.stroke();
			ctx.closePath();
		}
		i=i+40;
		j=j+40;
	}
	ctx.beginPath();
	ctx.arc(grid_size*(1050/100),-grid_size*(500/100),2,0,2*Math.PI,false);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle="#743A8F";
	ctx.fillText("RedSst/CGSst",grid_size*(1170/100),-(grid_size*(436/100)));
	ctx.fill();
	ctx.closePath();
 }
 function drawupattern()
 {
	ctx.fillStyle="goldenrod";
	ctx.lineWidth=2;
	while(j<90)
	{ 
		var k=i;
		for(k=i;k<=(i+350);k+=50)
		{
			ctx.beginPath();
			ctx.fillText('*',grid_size*(k/100),-grid_size*(j/100));
			ctx.fill();
			ctx.closePath();
		}
		i=i+40;
		j=j+40;
	}
	i=900;j=120;
	while(j<240)
	{ 
		var k=i;
		for(k=i;k<=(i+350);k+=50)
		{
			ctx.beginPath();
			ctx.fillText('*',grid_size*(k/100),-grid_size*(j/100));
			ctx.fill();
			ctx.closePath();
		}
		i=i+40;
		j=j+40;
	}
	i=1020;j=250;
	k=i;
	for(k=i;k<=(i+300);k+=50)
	{
		ctx.beginPath();
		ctx.fillText('*',grid_size*(k/100),-grid_size*(j/100));
		ctx.fill();
		ctx.closePath();
	}
	i=1070;j=305;
	k=i;
	for(k=i;k<=(i+200);k+=50)
	{
		ctx.beginPath();
		ctx.fillText('*',grid_size*(k/100),-grid_size*(j/100));
		ctx.fill();
		ctx.closePath();
	}
	i=1105;j=360;
	k=i;
	for(k=i;k<(i+150);k+=50)
	{
		ctx.beginPath();
		ctx.fillText('*',grid_size*(k/100),-grid_size*(j/100));
		ctx.fill();
		ctx.closePath();
	}
	ctx.closePath();
	ctx.fillStyle="#743A8F";
	ctx.fillText("CGSst/Cong",grid_size*(1388/100),-(grid_size*(234/100)));
	ctx.fill();
	ctx.closePath();

 }
 function drawopattern()
 {
	ctx.fillStyle="#3A898F";
	ctx.lineWidth=2;
	while(j<90)
	{ 
		var k=i;
		for(k=i;k<(i+300);k+=50)
		{
			ctx.beginPath();
			ctx.fillText('#',grid_size*(k/100),-grid_size*(j/100));
			ctx.fill();
			ctx.closePath();
		}
		i=i+40;
		j=j+40;
	}
	i=1300;j=120;
	k=i;
	for(k=i;k<=(i+150);k+=50)
	{
		ctx.beginPath();
		ctx.fillText('#',grid_size*(k/100),-grid_size*(j/100));
		ctx.fill();
		ctx.closePath();
	}
	i=1350;j=170;
	k=i;
	for(k=i;k<(i+100);k+=50)
	{
		ctx.beginPath();
		ctx.fillText('#',grid_size*(k/100),-grid_size*(j/100));
		ctx.fill();
		ctx.closePath();
	}
	sp1=1;
	var q1 = Object.create(questions);												
	generateQuestion(q1,"Identify the region with this pattern <span style = 'color:red'>+ + +</span> ","","Conglomerate","Limestone","Redstone","Banded Shale",2,nextButtonProceed,100,150,300,120);
 }
 
 //To update vertical thickness table
 function updateTable()
 {
	 vtCount++;
	var tb1 = document.getElementById("vttable");
	var row = tb1.insertRow();
	for (i = 0; i <= 1; i++)
	{
		var cell = row.insertCell();
		if(i == 0)
		{
			cell.innerHTML = vtArray[vtCount - 2][0];
			cell.id="r"+vtCount;
			cell.onclick = function(){
				
				drawVerticalThickness(vtArray[vtCount - 2][1],vtArray[vtCount - 2][2],vtArray[vtCount - 2][3]);
			}
		}
		if(i == 1)
		{
			cell.id="v"+vtCount;
		}
	}
	
 }
 //To draw vertical thickness line
 function drawVerticalThickness(sourceX,sourceY,destY)
 {
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth =2;
	document.getElementById("r"+vtCount).style.backgroundColor = "white";
	document.getElementById("r"+vtCount).onclick = "";
	ctx.moveTo(grid_size*(sourceX/100),-grid_size*(sourceY/100));
	sX = sourceX;
	sY = sourceY;
	dY = destY;
	if(vtCount == 2)
		tP = 200;
	if(vtCount == 3)
		tP = 250;
	if(vtCount == 4)
		tP = 250;
	if(vtCount == 5)
		tP = 300;
	if(vtCount == 6)
		tP = 250;
	vtInt=setInterval(function(){drawThicknessLine();},10);
 }
 function drawThicknessLine()
 {
	ctx.lineTo(grid_size*(sX/100),-grid_size*(sY/100));
	ctx.stroke();
	sY -= 1;
	if (sY==dY) 
	{
		ctx.lineTo(grid_size*((sX-10)/100),-grid_size*((sY+10)/100));
		ctx.lineTo(grid_size*((sX+10)/100),-grid_size*((sY+10)/100));
		ctx.lineTo(grid_size*((sX)/100),-grid_size*((sY)/100));
		ctx.fillStyle = "black";
		ctx.font="bold 12px verdana";
		ctx.fillText(vtArray[vtCount - 2][4]+"m",grid_size*(sX/100),-grid_size*((tP)/100));
		ctx.stroke();
		clearInterval(vtInt);
		document.getElementById("v"+vtCount).innerHTML =vtArray[vtCount - 2][4];
		ctx.closePath();
		if(vtCount == 6)
		{
			var tb1 = document.getElementById("vttable");
			var row = tb1.insertRow();
			for (i = 0; i <= 1; i++)
			{
				var cell = row.insertCell();
				if(i == 0)
				{
					cell.style.backgroundColor = "white";
					cell.onclick ="";
					cell.innerHTML = "Cong";
					cell.innerHTML = "Cong";
				}
				if(i == 1)
					cell.innerHTML = "x";
			}
			document.getElementById('legend').style.visibility="visible";
			var q2 = Object.create(questions);												
			generateQuestion(q2,"Vertical Thickness of Redsandstone region is ______: ","","420m","110m","180m","310m",4,nextButtonProceed,100,150,300,120);		}
		else
			updateTable();
	}
 }
 
 
function nextButtonProceed()
{
	document.getElementById('nextButton').style.visibility="visible";
}
