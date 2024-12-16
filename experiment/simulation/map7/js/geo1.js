//gap between lines
var grid_size = 35;

//each line plot points
var xaxis_starting_point = { number: 100, suffix: " " };
var yaxis_starting_point = { number: 100, suffix: " " };

//main canvas to plot graph
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

//to be used for animations
var canvas2 = document.getElementById("mycanvas2");
var ctx2 = canvas2.getContext("2d");

//-------------paper for dotted line-----------
var paper = document.getElementById("paper");
var pctx = paper.getContext("2d");

//----------------paper for solid line-----------
var paper2 = document.getElementById("paper2");
var pctx2 = paper2.getContext("2d");

//line plotting pencil within paper canvas
var imgTag = new Image();
var imgTag1 = new Image();
var imgTag2 = new Image();
var imgTags1,
  imgTags2,
  imgTags3,
  imgTags4,
  imgTags5,
  imgTags6,
  imgTags7,
  imgTags8;
var rp = new Image();
var sp = new Image();
imgTag.src = "images/pencil1.png";
imgTag1.src = "images/xarrow.png";
imgTag2.src = "images/reg1.png";
rp.src = "images/rp.png";
sp.src = "images/sp.png";

//holding height and width of canvas
var canvas_width = canvas.width;
var canvas_height = canvas.height;

//no of vertical grid lines
var num_lines_x = Math.floor(canvas.height / grid_size);

//no of horizontal grid lines
var num_lines_y = Math.floor(canvas.width / grid_size);

//distance between lines
var xaxis_distance_gridlines = num_lines_x - 1;

var yaxis_distance_gridlines = 1;
var t = 1,
  tx = 1,
  ty = 1,
  tpoint = 0,
  paperpointab = 0,
  paperpointcd = 0,
  lpoint = 1,
  jpts = 0,
  jpts1 = 0;

//animating drawing axis lines
var ptsx = [];
var ptsy = [];
var vertices = [];

//track span click operations
var spanclick = 0;

//for solidline  and dotted line tables
var lin = 0,
  tablesh = 0;
var a1 = 0,
  b1 = 0,
  c1 = 0,
  d1 = 0,
  e1 = 0,
  f1 = 0,
  g1 = 0,
  h1 = 0,
  i1 = 0,
  j1 = 0,
  k1 = 0,
  p = 0,
  q = 0,
  r = 0,
  s = 0,
  t = 0,
  u = 0,
  v = 0,
  w = 0,
  x = 0;

// //---tooltip variable
var sp1 = 0;

//for calculation
var solidline = 0,
  m = 0,
  n = 0;

//for animating hand symbol
var ids, myInt;

//---variables plotting line on paper stores line as pencil track points
var x;
var y;
var xx;
var yy;
var i, j;

//variable for calculation
var fnd = 0;

//variables for tunnnel plot
var tun1x = 0,
  tun1y = 1190,
  tun2x = 0,
  tun2y = 1210;

//variables for drip
var speed = 5;
var p1 = { x: 50, y: -(1318 - 1000) };
var angle = 35.57;
var radians = (angle * Math.PI) / 180;
var xunits = Math.cos(radians) * speed;
var yunits = Math.sin(radians) * speed;
var point = new Array();
var ball = { x: p1.x, y: p1.y };
var drip = 0;
var stopPoint = 35;
var letter;
var nx,
  ny,
  drflag = 0;
var screensVal = 0;

//Line draw animation variables
var sX = 0;
var sY = 0;
var dX = 0;
var dY = 0;
var tempX = 0;
var tempY = 0;
var hInt = 0;
var vInt = 0;
var pInt = 0;
var arcrad = 0;
var hCount = 0;
var vCount = 0;
var pCount = 0;
var hColor;

// Prompt questions during simulation
var questions = {
  ans1: 0,
  options: [],
  nextFunction: function () {},
  // setOptions:function(d1,d2,d3,d4){
  // questions.options = new Array(d1,d2,d3,d4);
  // },
  setOptions: function (d1, d2, d3, d4, d5) {
    if (d5 == 0 && d4 != 0) questions.options = new Array(d1, d2, d3, d4);
    else if (d4 == 0 && d5 == 0) {
      questions.options = new Array(d1, d2, d3);
    } else {
      questions.options = new Array(d1, d2, d3, d4, d5);
    }
  },
  setAns: function (ans) {
    questions.ans1 = ans;
  },
  frameQuestions: function (qun) {
    var myDiv = document.getElementById("question-div");
    var myDiv1 = document.getElementById("divq");
    myDiv.style.visibility = "visible";
    document.getElementById("divq").innerHTML = qun;
    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    selectList.setAttribute("autocomplete", "off");
    // selectList.setAttribute("onchange", "questions.setAnswer()");

    var button1 = document.createElement("input");
    button1.setAttribute("onclick", "questions.setAnswer(this)");
    button1.setAttribute("type", "button");
    button1.setAttribute("value", "OK");

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
  setAnswer: function (ev) {
    var x = document.getElementById("mySelect");
    var i = x.selectedIndex;
    if (i == 0) {
      var dispAns = document.createElement("p");
      dispAns.innerHTML = "You have not selected any value";
      document.getElementById("divq").appendChild(dispAns);
      setTimeout(function () {
        dispAns.innerHTML = "";
      }, 200);
    } else if (i == questions.ans1) {
      ev.onclick = "";
      var dispAns = document.createElement("p");
      dispAns.innerHTML =
        "You are right<span class='boldClass'>&#128077;</span> ";
      document.getElementById("divq").appendChild(dispAns);
      questions.callNextFunction();
    } else {
      ev.onclick = "";
      var dispAns = document.createElement("p");
      dispAns.innerHTML =
        "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: " +
        x.options[questions.ans1].text;
      document.getElementById("divq").appendChild(dispAns);
      questions.callNextFunction();
    }
  },
  setCallBack: function (cb) {
    nextFunction = cb;
  },
  callNextFunction: function () {
    setTimeout(function () {
      // document.getElementById("question-div").innerHTML = "";
      document.getElementById("question-div").style.visibility = "hidden";
      nextFunction();
    }, 800);
  },
};

//To set the questions division
function generateQuestion(
  qObject,
  qn,
  op1,
  op2,
  op3,
  op4,
  op5,
  ansKey,
  fn,
  dleft,
  dright,
  dwidth,
  dheight
) {
  document.getElementById("question-div").style.left = dleft + "px";
  document.getElementById("question-div").style.top = dright + "px";
  document.getElementById("question-div").style.width = dwidth + "px";
  document.getElementById("question-div").style.height = dheight + "px";
  qObject.setOptions(op1, op2, op3, op4, op5);
  qObject.setAns(ansKey);
  qObject.frameQuestions(qn);
  qObject.setCallBack(fn);
}
//-------------------------------------initial x and y axis plot points---------------------------------------
ptsx.push({
  x: 0,
  y: grid_size * xaxis_distance_gridlines,
});
ptsx.push({
  x: canvas_width,
  y: grid_size * xaxis_distance_gridlines,
});
ptsy.push({
  x: grid_size * yaxis_distance_gridlines,
  y: 0,
});
ptsy.push({
  x: grid_size * yaxis_distance_gridlines,
  y: canvas_height,
});

//plotting x and y axis
var xpoints = calcWaypoints(ptsx);
var ypoints = calcWaypoints(ptsy);

//jquery onload functions

$(function () {
  document.getElementById("select8-1").selectedIndex = 0;
  document.getElementById("select8-2").selectedIndex = 0;
  document.getElementById("select8-1").disabled = false;
  document.getElementById("select8-2").disabled = false;
  $("#select8-1").on("select", function () {
    $(this).next("span").remove();
  });
  $("#select8-2").on("select", function () {
    $(this).next("span").remove();
  });
  $("#select8-1").on("change", function () {
    $(this).next("span").remove();
    m = $(this).val();
    if (solidline == 0 && m == 1300) $(this).prop("disabled", true);
    else if (solidline == 1 && m == 1400) $(this).prop("disabled", true);
    else if (solidline == 2 && m == 1500) $(this).prop("disabled", true);
    else if (solidline == 3 && m == 1600) $(this).prop("disabled", true);
    else if (solidline == 4 && m == 1500) $(this).prop("disabled", true);
    else if (solidline == 5 && m == 1400) $(this).prop("disabled", true);
    else if (solidline == 6 && m == 1300) $(this).prop("disabled", true);
    else if (solidline == 7 && m == 1400) $(this).prop("disabled", true);
    else if (solidline == 8 && m == 1500) $(this).prop("disabled", true);
    else $("#select8-1").after("<span>&#10008;</span>");
    isDisabled();
  });
  $("#select8-2").on("change", function () {
    $(this).next("span").remove();
    n = $(this).val();
    if (solidline == 0 && n == 1400) $(this).prop("disabled", true);
    else if (solidline == 1 && n == 1500) $(this).prop("disabled", true);
    else if (solidline == 2 && n == 1600) $(this).prop("disabled", true);
    else if (solidline == 3 && n == 1500) $(this).prop("disabled", true);
    else if (solidline == 4 && n == 1400) $(this).prop("disabled", true);
    else if (solidline == 5 && n == 1300) $(this).prop("disabled", true);
    else if (solidline == 6 && n == 1400) $(this).prop("disabled", true);
    else if (solidline == 7 && n == 1500) $(this).prop("disabled", true);
    else if (solidline == 8 && n == 1600) $(this).prop("disabled", true);
    else $("#select8-2").after("<span>&#10008;</span>");
    isDisabled();
  });
  function isDisabled() {
    if (
      $("#select8-1").prop("disabled") == true &&
      $("#select8-2").prop("disabled") == true
    ) {
      document.getElementById("calci").style.visibility = "visible";
      //$('#calci').show();
    }
  }
  $("#calci").click(function () {
    document.getElementById("calci").style.visibility = "hidden";
    if (solidline == 0) {
      printCalculation(
        solidline,
        "&alpha;=30",
        "&beta;=140",
        "&yen;=50",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1400*(50-30)+1300*(140-50))/(140-30)",
        solidpoints[solidline][1]
      );
    } else if (solidline == 1) {
      printCalculation(
        solidline,
        "&alpha;=140",
        "&beta;=290",
        "&yen;=190",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1500*(190-140)+1400*(290-190))/(290-140)",
        solidpoints[solidline][1]
      );
    } else if (solidline == 2) {
      printCalculation(
        solidline,
        "&alpha;=290",
        "&beta;=450",
        "&yen;=360",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1600*(360-290)+1500*(450-360))/(450-290)",
        solidpoints[solidline][1]
      );
    } else if (solidline == 3) {
      printCalculation(
        solidline,
        "&alpha;=550",
        "&beta;=690",
        "&yen;=650",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1500*(650-550)+1600*(690-650))/(690-550)",
        solidpoints[solidline][1]
      );
    } else if (solidline == 4) {
      printCalculation(
        solidline,
        "&alpha;=690",
        "&beta;=840",
        "&yen;=810",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1400*(810-690)+1500*(840-810))/(840-690)",
        solidpoints[solidline][1]
      );
    } else if (solidline == 5) {
      printCalculation(
        solidline,
        "&alpha;=840",
        "&beta;=960",
        "&yen;=940",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1300*(940-840)+1400*(960-940))/(960-840)",
        solidpoints[solidline][1]
      );
    } else if (solidline == 6) {
      printCalculation(
        solidline,
        "&alpha;=1050",
        "&beta;=1190",
        "&yen;=1095",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1400*(1095-1050)+1300*(1190-1095))/(1190-1050)",
        solidpoints[solidline][1]
      );
    } else if (solidline == 7) {
      printCalculation(
        solidline,
        "&alpha;=1190",
        "&beta;=1380",
        "&yen;=1250",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1500*(1250-1190)+1400*(1380-1250))/(1380-1190)",
        solidpoints[solidline][1]
      );
    } else if (solidline == 8) {
      printCalculation(
        solidline,
        "&alpha;=1380",
        "&beta;=1535",
        "&yen;=1410",
        "<strong>&alpha;<&beta;</strong>",
        "Index=(N*(¥- α )+M*( β-¥))/( β- α)",
        "Index=(1600*(1410-1380)+1500*(1535-1410))/(1535-1380)",
        solidpoints[solidline][1]
      );
    }
  });
  $("#nb").click(function () {
    if (solidline == 0) {
      document.getElementById("img8-1").src = "images/img8-2.png";
      $("#can8-1").html("&#10148;For the solid line <span>q</span>:");
    }
    if (solidline == 1) {
      document.getElementById("img8-1").src = "images/img8-3.png";
      $("#can8-1").html("&#10148;For the solid line <span>r</span>:");
    }
    if (solidline == 2) {
      document.getElementById("img8-1").src = "images/img8-4.png";
      $("#can8-1").html("&#10148;For the solid line <span>s</span>:");
    }
    if (solidline == 3) {
      document.getElementById("img8-1").src = "images/img8-5.png";
      $("#can8-1").html("&#10148;For the solid line <span>t</span>:");
    }
    if (solidline == 4) {
      document.getElementById("img8-1").src = "images/img8-6.png";
      $("#can8-1").html("&#10148;For the solid line <span>u</span>:");
    }
    if (solidline == 5) {
      document.getElementById("img8-1").src = "images/img8-7.png";
      $("#can8-1").html("&#10148;For the solid line <span>v</span>:");
    }
    if (solidline == 6) {
      document.getElementById("img8-1").src = "images/img8-8.png";
      $("#can8-1").html("&#10148;For the solid line <span>w</span>:");
    }
    if (solidline == 7) {
      document.getElementById("img8-1").src = "images/img8-9.png";
      $("#can8-1").html("&#10148;For the solid line <span>x</span>:");
    }

    document.getElementById("nb").style.visibility = "hidden";
    document.getElementById("select8-1").selectedIndex = 0;
    document.getElementById("select8-2").selectedIndex = 0;
    document.getElementById("select8-1").disabled = false;
    document.getElementById("select8-2").disabled = false;
    document.getElementById("can8-2").style.visibility = "hidden";
    document.getElementById("can8-3").style.visibility = "hidden";
    document.getElementById("can8-4").style.visibility = "hidden";
    document.getElementById("can8-5").style.visibility = "hidden";
    document.getElementById("can8-6").style.visibility = "hidden";
    document.getElementById("can8-8").style.visibility = "hidden";
    solidline++;
    removeColorTable(solidline);
    setColorTable(solidline);
  });
  //plot points using abtable td
  $("#dottable td").on("click", function () {
    var rowid = $(this).attr("id");
    ctx.beginPath();
    ctx.font = "10px Verdana";
    ctx.fillStyle = "#00BFFF";
    ctx.strokeStyle = "black";
    switch (rowid) {
      case "a1":
        ctx.arc(
          grid_size * (dotpoints[0][0] / 100),
          (-grid_size * (dotpoints[0][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#a1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        a1 = 1;
        break;
      case "b1":
        ctx.arc(
          grid_size * (dotpoints[1][0] / 100),
          (-grid_size * (dotpoints[1][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#b1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        b1 = 1;
        break;

      case "c1":
        ctx.arc(
          grid_size * (dotpoints[2][0] / 100),
          (-grid_size * (dotpoints[2][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#c1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        c1 = 1;
        break;

      case "d1":
        ctx.arc(
          grid_size * (dotpoints[3][0] / 100),
          (-grid_size * (dotpoints[3][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#d1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        d1 = 1;
        break;

      case "e1":
        ctx.arc(
          grid_size * (dotpoints[4][0] / 100),
          (-grid_size * (dotpoints[4][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#e1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        e1 = 1;
        break;

      case "f1":
        ctx.arc(
          grid_size * (dotpoints[5][0] / 100),
          (-grid_size * (dotpoints[5][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#f1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        f1 = 1;
        break;

      case "g1":
        ctx.arc(
          grid_size * (dotpoints[6][0] / 100),
          (-grid_size * (dotpoints[6][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#g1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        g1 = 1;
        break;

      case "h1":
        ctx.arc(
          grid_size * (dotpoints[7][0] / 100),
          (-grid_size * (dotpoints[7][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#h1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        h1 = 1;
        break;

      case "i1":
        ctx.arc(
          grid_size * (dotpoints[8][0] / 100),
          (-grid_size * (dotpoints[8][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#i1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        i1 = 1;

        break;
      case "j1":
        ctx.arc(
          grid_size * (dotpoints[9][0] / 100),
          (-grid_size * (dotpoints[9][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#j1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        j1 = 1;
        break;

      case "k1":
        ctx.arc(
          grid_size * (dotpoints[10][0] / 100),
          (-grid_size * (dotpoints[10][1] - 1000)) / 100,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#k1").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        k1 = 1;
        break;
    }
    if (
      a1 == 1 &&
      b1 == 1 &&
      c1 == 1 &&
      d1 == 1 &&
      e1 == 1 &&
      f1 == 1 &&
      g1 == 1 &&
      h1 == 1 &&
      i1 == 1 &&
      j1 == 1 &&
      k1 == 1
    ) {
      document.getElementById("dotpic").style.visibility = "hidden";
      document.getElementById("cmap").innerHTML =
        "Plot Y'<br>&lt;X:1535 Y:0&gt;";
      spanclick = 10;
    }
  });

  //plot points using abtable td
  $("#solidtable td").on("click", function () {
    var rowidd = $(this).attr("id");
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    switch (rowidd) {
      case "p":
        ctx.arc(
          grid_size * (solidpoints[0][0] / 100),
          -grid_size * ((solidpoints[0][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#p").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        p = 1;
        break;
      case "q":
        ctx.arc(
          grid_size * (solidpoints[1][0] / 100),
          -grid_size * ((solidpoints[1][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#q").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        q = 1;
        break;

      case "r":
        ctx.arc(
          grid_size * (solidpoints[2][0] / 100),
          -grid_size * ((solidpoints[2][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#r").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        r = 1;
        break;

      case "s":
        ctx.arc(
          grid_size * (solidpoints[3][0] / 100),
          -grid_size * ((solidpoints[3][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#s").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        s = 1;
        break;

      case "t":
        ctx.arc(
          grid_size * (solidpoints[4][0] / 100),
          -grid_size * ((solidpoints[4][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#t").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        t = 1;
        break;

      case "u":
        ctx.arc(
          grid_size * (solidpoints[5][0] / 100),
          -grid_size * ((solidpoints[5][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#u").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        u = 1;
        break;
      case "v":
        ctx.arc(
          grid_size * (solidpoints[6][0] / 100),
          -grid_size * ((solidpoints[6][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#v").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        v = 1;
        break;
      case "w":
        ctx.arc(
          grid_size * (solidpoints[7][0] / 100),
          -grid_size * ((solidpoints[7][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#w").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        w = 1;
        break;
      case "x":
        ctx.arc(
          grid_size * (solidpoints[8][0] / 100),
          -grid_size * ((solidpoints[8][1] - 1000) / 100),
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        $("#x").off("click");
        $(this).css("background", "#fff");
        $(this).css("cursor", "auto");
        x = 1;
        break;
    }
    if (
      p == 1 &&
      q == 1 &&
      r == 1 &&
      s == 1 &&
      t == 1 &&
      u == 1 &&
      v == 1 &&
      w == 1 &&
      x == 1
    ) {
      document.getElementById("solidpic").style.visibility = "hidden";
      document.getElementById("nextButton").style.visibility = "visible";
    }
  });
  $("#scale").mouseover(function () {
    $("#scinff").show();
  });
  $("#scale").mouseout(function () {
    $("#scinff").hide();
  });
  $("#direct").mouseover(function () {
    $("#direction").show();
  });
  $("#direct").mouseout(function () {
    $("#direction").hide();
  });
  $("#legend").mouseover(function () {
    $("#legg").show();
  });
  $("#legend").mouseout(function () {
    $("#legg").hide();
  });
  $("#mycanvas").mousemove(function (event) {
    var xx = event.pageX;
    var yy = event.pageY;
    if (sp1 == 1) {
      $("#tooltip-span").text(xx + " " + yy);
      if (xx >= 170 && xx <= 174 && yy >= 404 && yy <= 408) {
        $("#tooltip-span").text("a(30,1300)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 209 && xx <= 213 && yy >= 370 && yy <= 374) {
        $("#tooltip-span").text("b(140,1400)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 262 && xx <= 266 && yy >= 334 && yy <= 337) {
        $("#tooltip-span").text("c(290,1500)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 317 && xx <= 321 && yy >= 300 && yy <= 304) {
        $("#tooltip-span").text("d(450,1600)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX - 90,
          visibility: "visible",
        });
      } else if (xx >= 352 && xx <= 356 && yy >= 300 && yy <= 304) {
        $("#tooltip-span").text("e(550,1600)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 402 && xx <= 406 && yy >= 334 && yy <= 339) {
        $("#tooltip-span").text("f(690,1500)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 454 && xx <= 459 && yy >= 370 && yy <= 374) {
        $("#tooltip-span").text("g(840,1400)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 496 && xx <= 500 && yy >= 405 && yy <= 409) {
        $("#tooltip-span").text("h(960,1300)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 527 && xx <= 531 && yy >= 404 && yy <= 408) {
        $("#tooltip-span").text("i(1050,1300)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 576 && xx <= 580 && yy >= 369 && yy <= 373) {
        $("#tooltip-span").text("j(1190,1400)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 643 && xx <= 647 && yy >= 334 && yy <= 337) {
        $("#tooltip-span").text("k(1380,1500)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 178 && xx <= 182 && yy >= 398 && yy <= 402) {
        $("#tooltip-span").text("p(50,1318)");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX - 90,
          visibility: "visible",
        });
      } else if (xx >= 227 && xx <= 231 && yy >= 358 && yy <= 362) {
        $("#tooltip-span").text("q(190,1433):RedSst/Shale");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 286 && xx <= 290 && yy >= 319 && yy <= 323) {
        $("#tooltip-span").text("r(360,1544):Shale/Lst");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 388 && xx <= 392 && yy >= 324 && yy <= 328) {
        $("#tooltip-span").text("s(650,1529):Lst/Shale");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX - 90,
          visibility: "visible",
        });
      } else if (xx >= 444 && xx <= 448 && yy >= 362 && yy <= 366) {
        $("#tooltip-span").text("t(810,1420):Shale/RedSst");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX + 10,
          visibility: "visible",
        });
      } else if (xx >= 489 && xx <= 493 && yy >= 398 && yy <= 402) {
        $("#tooltip-span").text("u(940,1317):RedSst/Sst");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX - 90,
          visibility: "visible",
        });
      } else if (xx >= 542 && xx <= 546 && yy >= 393 && yy <= 397) {
        $("#tooltip-span").text("v(1095,1332):Sst/RedSst");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX - 90,
          visibility: "visible",
        });
      } else if (xx >= 598 && xx <= 602 && yy >= 358 && yy <= 362) {
        $("#tooltip-span").text("w(1250,1432):RedSst/Shale");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX - 90,
          visibility: "visible",
        });
      } else if (xx >= 653 && xx <= 657 && yy >= 328 && yy <= 332) {
        $("#tooltip-span").text("x(1410,1519):Shale/Limestone");
        $("#tooltip-span").css({
          position: "absolute",
          top: event.pageY - 10,
          left: event.pageX - 90,
          visibility: "visible",
        });
      } else {
        $("#tooltip-span").css({
          visibility: "hidden",
        });
      }
    }
  });
});

//To blink arrows
function animatearrow(ids) {
  if (document.getElementById(ids).style.visibility == "visible")
    document.getElementById(ids).style.visibility = "hidden";
  else document.getElementById(ids).style.visibility = "visible";
}

//stop blinking arrow
function myStopFunction(ids) {
  clearInterval(myInt);
  // document.getElementById('ids').style.visibility="hidden";
}

//-------------function navnext------------

function navNext() {
  for (temp = 0; temp <= 15; temp++) {
    document.getElementById("canvas" + temp).style.visibility = "hidden";
  }
  simsubscreennum += 1;
  document.getElementById("canvas" + simsubscreennum).style.visibility =
    "visible";

  document.getElementById("nextButton").style.visibility = "hidden";
  magic();
}

//---------function magic starts here-----------
function magic() {
  if (simsubscreennum == 1) {
    document.getElementById("nextButton").style.visibility = "hidden";
    setTimeout(function () {
      $("#cover").animate(
        {
          left: "35px",
          top: "210px",
        },
        500,
        function () {
          document.getElementById("fullmap").style.visibility = "hidden";
          document.getElementById("ctr1").style.visibility = "visible";
          document.getElementById("line1").style.visibility = "visible";
        }
      );
    }, 1500);
    setTimeout(function () {
      document.getElementById("fullmap").style.visibility = "visible";
      document.getElementById("ctr1").style.visibility = "hidden";
      document.getElementById("cover").style.visibility = "hidden";
      document.getElementById("nextButton").style.visibility = "visible";
    }, 3000);
  } else if (simsubscreennum == 2) {
    document.getElementById("canvas-wrap-1").style.visibility = "visible";
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("fullmap").style.visibility = "hidden";
    document.getElementById("line").style.visibility = "hidden";
    document.getElementById("line1").style.visibility = "hidden";
    document.getElementById("cmap").style.visibility = "visible";
  } else if (simsubscreennum == 3) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("dotplot").style.visibility = "hidden";
    document.getElementById("map2").style.visibility = "hidden";
    document.getElementById("dotpoints").style.visibility = "hidden";
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    drawXaxis();
    drawYaxis();
    spanclick = 3;
    document.getElementById("cmap").style.visibility = "visible";
    document.getElementById("mycanvas").style.visibility = "visible";
    document.getElementById("mycanvas").style.border = "solid 2px";
    document.getElementById("cmap").innerHTML = "Plot X-Axis";
  } else if (simsubscreennum == 4) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("dotpic").style.visibility = "visible";
    document.getElementById("cmap").style.visibility = "visible";
    document.getElementById("cmap").innerHTML = "Define<br>Co-ordinates";
    ctx.beginPath();
    ctx.lineWidh = 4;
    ctx.font = "20px Verdana";
    ctx.fillText("Geographical Profile along XY", 30, -295);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  } else if (simsubscreennum == 5) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("mycanvas").style.visibility = "hidden";
    document.getElementById("scale").style.visibility = "hidden";
    document.getElementById("direct").style.visibility = "hidden";
    document.getElementById("dottable").style.visibility = "hidden";
    document.getElementById("cmap").style.visibility = "visible";
    document.getElementById("cmap").innerHTML = "Get Paper";
    lin = 1;
    tablesh = 1;
    spanclick = 0;
  } else if (simsubscreennum == 6) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("solidplot").style.visibility = "hidden";
    document.getElementById("solidpoints").style.visibility = "hidden";
    document.getElementById("solidpic").style.visibility = "visible";
    document.getElementById("mycanvas").style.visibility = "visible";
    document.getElementById("cmap").style.visibility = "visible";
    document.getElementById("cmap").innerHTML = "Define X-Cordinates";
    spanclick = 8;
  } else if (simsubscreennum == 7) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("mycanvas").style.visibility = "hidden";
    document.getElementById("solidtable1").style.visibility = "hidden";
  } else if (simsubscreennum == 8) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can7-1").style.visibility = "hidden";
    document.getElementById("f11").style.visibility = "hidden";
    document.getElementById("f2").style.visibility = "hidden";
    document.getElementById("found").style.visibility = "hidden";
    document.getElementById("notfound").style.visibility = "hidden";
    setColorTable(solidline);
  } else if (simsubscreennum == 9) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("table2").style.visibility = "hidden";
    document.getElementById("mycanvas").style.visibility = "visible";
    document.getElementById("solidpic").style.visibility = "visible";
    document.getElementById("cmap").style.visibility = "visible";
    document.getElementById("cmap").innerHTML = "Click on Points to plot";
    spanclick = 9;
  } else if (simsubscreennum == 10) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("solidtable").style.visibility = "hidden";
    document.getElementById("cmap").style.visibility = "visible";
    document.getElementById("cmap").innerHTML = "Join Points";
    spanclick = 11;
  }
  // else if(simsubscreennum == 11)
  // {
  // document.getElementById('nextButton').style.visibility="hidden";
  // document.getElementById('cmap').style.visibility="visible";
  // document.getElementById('cmap').innerHTML = "Draw Tunnel";
  // spanclick=13;

  // }
  else if (simsubscreennum == 11) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("mycanvas").style.visibility = "hidden";
    document.getElementById("cmap").style.visibility = "hidden";
    setTimeout(function () {
      document.getElementById("img12-1").src = "images/cal11.png";
    }, 1500);
    setTimeout(function () {
      document.getElementById("can12-1").innerHTML =
        "&#10148;Draw lines perpendicular to XY passing through points of intersection.";
      document.getElementById("img12-1").src = "images/cal2.png";
    }, 3000);
    setTimeout(function () {
      document.getElementById("can12-1").innerHTML =
        "&#10148;Take one  point  on each line  drawn  above consecutively - Let it be a1 and a2.";
      document.getElementById("img12-1").src = "images/cal1.png";
    }, 4500);
    setTimeout(function () {
      document.getElementById("can12-1").innerHTML =
        "&#10148;Let the index values of the dotted line be T1 and T2 (T1≠T2) which are at the point of intersection.(i.e a1 and a2).";
      document.getElementById("img12-1").src = "images/cal3.png";
    }, 6000);
    setTimeout(function () {
      document.getElementById("can12-1").innerHTML =
        "&#10148;Measure the distance between the above drawn lines along XY, let it be d1.";
      document.getElementById("img12-1").src = "images/cal4.png";
    }, 7500);
    setTimeout(function () {
      document.getElementById("can12-1").innerHTML =
        "&#10148;Angle of Dip calculated as:";
      document.getElementById("can12-4").innerHTML =
        "&#10148;For T1>T2: Angle of Dip (&theta;) = tan<sup>-1</sup>⁡( (T1-T2)/d1)";
      document.getElementById("can12-5").innerHTML =
        "&#10148;For T2>T1: Angle of Dip (&theta;) =tan<sup>-1</sup>⁡( (T2-T1)/d1)";
      document.getElementById("img12-1").src = "images/cal5.png";
      document.getElementById("nextButton").style.visibility = "visible";
    }, 9000);
  } else if (simsubscreennum == 12) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can12-4").style.visibility = "hidden";
    document.getElementById("can12-5").style.visibility = "hidden";
    document.getElementById("img12-1").style.visibility = "hidden";
    document.getElementById("cmap").style.visibility = "visible";
    $("#cmap").html("Click on Points for &theta;");
  } else if (simsubscreennum == 13) {
    document.getElementById("cmap").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("mycanvas").style.visibility = "visible";
    document.getElementById("scale").style.visibility = "visible";
    document.getElementById("direct").style.visibility = "visible";
    ids = $("#s1").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (simsubscreennum == 14) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("pp").style.visibility = "hidden";
    document.getElementById("qq").style.visibility = "hidden";
    document.getElementById("rr").style.visibility = "hidden";
    document.getElementById("ss").style.visibility = "hidden";
    document.getElementById("ttt").style.visibility = "hidden";
    document.getElementById("uu").style.visibility = "hidden";
    document.getElementById("vv").style.visibility = "hidden";
    document.getElementById("ww").style.visibility = "hidden";
    document.getElementById("xx").style.visibility = "hidden";
    document.getElementById("oo").style.visibility = "hidden";
    document.getElementById("mm").style.visibility = "hidden";
    document.getElementById("nn").style.visibility = "hidden";
    drip = 0;
    ids = $("#s111").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (simsubscreennum == 15) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("lime").style.visibility = "hidden";
    document.getElementById("shale").style.visibility = "hidden";
    document.getElementById("red").style.visibility = "hidden";
    document.getElementById("sand").style.visibility = "hidden";
    document.getElementById("congo").style.visibility = "hidden";
    setDialog("Draw horizontal line accross the point.", 100, 185, 100, 250);
  } else if (simsubscreennum == 16) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("result").style.visibility = "hidden";
    document.getElementById("info").style.visibility = "hidden";
    document.getElementById("legend").style.visibility = "visible";
    document.getElementById("mycanvas").style.visibility = "hidden";
    document.getElementById("scale").style.visibility = "hidden";
    document.getElementById("direct").style.visibility = "hidden";
    document.getElementById("legend").style.visibility = "hidden";
    sp1 = 1;
  }
}

//------------------spanclick------------------
$("#cmap").click("one", function () {
  if (spanclick == 0) {
    if (lin == 0) {
      document.getElementById("paper").style.visibility = "visible";
      document.getElementById("cmap").style.visibility = "hidden";
      $("#paper").animate(
        {
          height: "200",
        },
        800,

        function () {
          //$('#fullmap').css('clip', 'rect(0px, 600px, 180px, 0px)');
          document.getElementById("paper").width = "530";
          document.getElementById("paper").height = "200";
          document.getElementById("cmap").style.visibility = "visible";
          $("#cmap").text("Mark Points");
          spanclick = 1;
        }
      );
    } else if (lin == 1) {
      document.getElementById("paper2").style.visibility = "visible";
      document.getElementById("cmap").style.visibility = "hidden";
      $("#paper2").animate(
        {
          height: "200",
        },
        800,

        function () {
          //$('#fullmap').css('clip', 'rect(0px, 600px, 180px, 0px)');
          document.getElementById("paper2").width = "530";
          document.getElementById("paper2").height = "200";
          document.getElementById("cmap").style.visibility = "visible";
          document.getElementById("mycanvas2").style.visibility = "visible";
          $("#cmap").text("Mark Points");
          spanclick = 1;
        }
      );
    }
  } else if (spanclick == 1) {
    pctx.clearRect(0, 0, paper.width, paper.height);
    if (lin == 0) {
      document.getElementById("dotpoints").style.visibility = "visible";
      $("#dotpoints")
        .show()
        .find("tr")
        .each(function (i, item) {
          var $row = $(item);
          $row.hide();
          $row.delay(i * 500).fadeIn(500);
        });
      plotonpaperab();
    } else if (lin == 1) {
      document.getElementById("solidpoints").style.visibility = "visible";
      $("#solidpoints")
        .show()
        .find("tr")
        .each(function (i, item) {
          var $row = $(item);
          $row.hide();
          $row.delay(i * 500).fadeIn(500);
        });
      plotonpapercd();
    }

    //document.getElementById('nextButton').style.visibility="visible";
  } else if (spanclick == 3) {
    document.getElementById("cmap").style.visibility = "hidden";
    spanclick = 4;
    plotXaxis(xpoints);
  } else if (spanclick == 4) {
    document.getElementById("cmap").style.visibility = "hidden";
    plotYaxis(ypoints);
    setTimeout(function () {
      ctx.translate(
        yaxis_distance_gridlines * grid_size,
        xaxis_distance_gridlines * grid_size
      );
      drawtriangle();
      spanclick = 5;
    }, 2600);
  } else if (spanclick == 5) {
    tickXaxis();
    origin();
    $("#cmap").text("Points on Y-Axis");
    spanclick = 6;
  } else if (spanclick == 6) {
    tickYaxis();
    document.getElementById("cmap").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "visible";
    document.getElementById("scale").style.visibility = "visible";
    document.getElementById("direct").style.visibility = "visible";
    $("#cmap").css("height", "35px");
    spanclick = 8;
  } else if (spanclick == 7) {
    namescale();
    document.getElementById("cmap").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "visible";
    $("#cmap").css("height", "35px");
    spanclick = 8;
  } else if (spanclick == 8) {
    showtable();
    spanclick = 9;
  } else if (spanclick == 10) {
    endLine();
    document.getElementById("cmap").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "visible";
  } else if (spanclick == 11) {
    ctx.beginPath();
    ctx.moveTo(0, (-grid_size * (1280 - 1000)) / 100);
    joinPoints();
    spanclick = 12;
  }
});

// Calling dripDrawFunction
function toDrawDrip(elem) {
  var dripid = elem.id;
  myStopFunction(ids);
  document.getElementById(ids).style.visibility = "hidden";
  document.getElementById(dripid).onclick = " ";
  if (dripid == "pp") {
    if (drip == 0) {
      setText(
        "p",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "p'";
      gameLoop();
    }
  } else if (dripid == "qq") {
    if (drip == 1) {
      p1 = { x: 190, y: -(1433 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 100;
      angle = 30.54;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "q",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "q'";
      gameLoop();
    }
  } else if (dripid == "rr") {
    if (drip == 2) {
      p1 = { x: 360, y: -(1544 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 175;
      angle = 30.54;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "r",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "r'";
      gameLoop();
    }
  } else if (dripid == "ss") {
    if (drip == 3) {
      p1 = { x: 650, y: -(1529 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 175;
      angle = 149.46;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "s",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "s'";
      gameLoop();
    }
  } else if (dripid == "ttt") {
    if (drip == 4) {
      p1 = { x: 810, y: -(1420 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 100;
      angle = 149.46;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "t",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "t'";
      gameLoop();
    }
  } else if (dripid == "uu") {
    if (drip == 5) {
      p1 = { x: 940, y: -(1317 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 35;
      angle = 144.43;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "u",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "u'";
      gameLoop();
    }
  } else if (dripid == "vv") {
    if (drip == 6) {
      p1 = { x: 1095, y: -(1332 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 17;
      angle = 33.02;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "v",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "v'";
      gameLoop();
    }
  } else if (dripid == "ww") {
    if (drip == 7) {
      p1 = { x: 1250, y: -(1432 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 89;
      angle = 32.0;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "w",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "w'";
      gameLoop();
    }
  } else if (dripid == "xx") {
    if (drip == 8) {
      p1 = { x: 1410, y: -(1519 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 155;
      angle = 32.0;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "x",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "x'";
      gameLoop();
    }
  } else if (dripid == "oo") {
    if (drip == 9) {
      p1 = { x: 90, y: -(1100 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 0;
      angle = 42.3;
      nx = ball.x;
      ny = ball.y;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "o",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "o'";
      gameLoop();
    }
  } else if (dripid == "mm") {
    if (drip == 10) {
      p1 = { x: 940, y: -(1100 - 1000) };
      ball = { x: p1.x, y: p1.y };
      stopPoint = 0;
      angle = 137.7;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "m",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "m'";
      gameLoop();
    }
  } else if (dripid == "nn") {
    if (drip == 11) {
      p1 = { x: 1140, y: -(1100 - 1000) };
      ball = { x: p1.x, y: p1.y };
      nx = ball.x;
      ny = ball.y;
      stopPoint = 0;
      angle = 42.3;
      radians = (angle * Math.PI) / 180;
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      setText(
        "n",
        (grid_size * (p1.x - 15)) / 100,
        (grid_size * (p1.y - 20)) / 100
      );
      letter = "n'";
      gameLoop();
    }
  }
}

// -------------To draw drip--------
function drawScreen() {
  ctx.strokeStyle = "#000000";
  ball.x += xunits;
  ball.y += yunits;
  point.push({ x: ball.x, y: ball.y });
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(
    (grid_size * ball.x) / 100,
    (grid_size * ball.y) / 100,
    1,
    0,
    Math.PI * 2,
    true
  );
  ctx.fill();
  ctx.closePath();
  if ((grid_size * ball.y) / 100 > -stopPoint) {
    setText(
      letter,
      (grid_size * ball.x) / 100,
      (grid_size * (ball.y - 10)) / 100
    );
    if (drip == 3) {
      ctx.beginPath();
      ctx.moveTo((grid_size * ball.x) / 100, (grid_size * ball.y) / 100);
      ctx.quadraticCurveTo(
        (grid_size * (ball.x - 54)) / 100,
        (grid_size * (ball.y + 26)) / 100,
        (grid_size * (ball.x - 158)) / 100,
        (grid_size * ball.y) / 100
      );
      ctx.stroke();
    }
    if (drip == 4) {
      ctx.beginPath();
      ctx.moveTo((grid_size * ball.x) / 100, (grid_size * ball.y) / 100);
      ctx.quadraticCurveTo(
        (grid_size * (ball.x - 50)) / 100,
        (grid_size * (ball.y + 25)) / 100,
        (grid_size * (ball.x - 148)) / 100,
        (grid_size * ball.y) / 100
      );
      ctx.stroke();
    }
    if (drip == 5) {
      ctx.beginPath();
      ctx.moveTo((grid_size * ball.x) / 100, (grid_size * ball.y) / 100);
      ctx.quadraticCurveTo(
        (grid_size * (ball.x - 125)) / 100,
        (grid_size * (ball.y + 40)) / 100,
        (grid_size * (ball.x - 280)) / 100,
        (grid_size * ball.y) / 100
      );
      ctx.stroke();
    }
    if (drip == 9) {
      ctx.beginPath();
      ctx.moveTo((grid_size * (nx + 2)) / 100, (grid_size * (ny + 2)) / 100);
      ctx.lineTo((grid_size * 0) / 100, (-grid_size * (1188 - 1000)) / 100);
      ctx.stroke();
    }
    if (drip == 11) {
      ctx.beginPath();
      ctx.moveTo((grid_size * nx) / 100, (grid_size * ny) / 100);
      ctx.quadraticCurveTo(
        (grid_size * (nx - 125)) / 100,
        (grid_size * (ny - 80)) / 100,
        (grid_size * (nx - 204)) / 100,
        (grid_size * ny) / 100
      );
      ctx.stroke();
      document.getElementById("nextButton").style.visibility = "visible";
    }
    drip++;
    chkdrip();
  }
}

function gameLoop() {
  window.setTimeout(gameLoop, 20);
  // if(grid_size*ball.y/100>=-75 && grid_size*ball.y/100<=-67)
  // {
  // ctx.closePath();
  // ball.x+=xunits*1;
  // ball.y+=yunits*1;
  // }
  // else
  if ((grid_size * ball.y) / 100 < -stopPoint) drawScreen();
}

function setText(letter, xcoord, ycoord) {
  ctx.font = "14px verdana";
  ctx.fillStyle = "black";
  ctx.fillText(letter, xcoord, ycoord);
}

function fillPattterns(elem) {
  var regid = elem.id;
  myStopFunction(ids);
  document.getElementById(ids).style.visibility = "hidden";
  document.getElementById(regid).onclick = " ";
  if (regid == "lime") {
    if (drip == 0) {
      drawLimePatterns();
      drip++;
      chkdrip2();
    }
  } else if (regid == "shale") {
    if (drip == 1) {
      drawShalePatterns();
      drip++;
      chkdrip2();
    }
  } else if (regid == "red") {
    if (drip == 2) {
      drawRedPatterns();
      drip++;
      chkdrip2();
    }
  } else if (regid == "sand") {
    if (drip == 3) {
      drawSandPatterns();
      drip++;
      chkdrip2();
    }
  } else if (regid == "congo") {
    if (drip == 4) {
      drawCongoPatterns();
      drip++;
      chkdrip2();
    }
  }
}

//To fill Lime Stone Region
function drawLimePatterns() {
  ctx.beginPath();
  ctx.fillStyle = "brown";
  ctx.font = "12px Verdana";
  ctx.lineWidth = 2;
  i = 420;
  j = 1510;
  while (i <= 600) {
    ctx.fillText("+", (grid_size * i) / 100, (-grid_size * (j - 1000)) / 100);
    i = i + 50;
  }
  i = 400;
  j = j + 30;
  while (i <= 600) {
    ctx.fillText("+", (grid_size * i) / 100, (-grid_size * (j - 1000)) / 100);
    i = i + 50;
  }
  i = 420;
  j = j + 30;
  while (i <= 565) {
    ctx.fillText("+", (grid_size * i) / 100, (-grid_size * (j - 1000)) / 100);
    i = i + 50;
  }
  ctx.fillText(
    "+",
    (grid_size * 1500) / 100,
    (-grid_size * (1470 - 1000)) / 100
  );
  i = 1420;
  j = 1510;
  while (i <= 1500) {
    ctx.fillText("+", (grid_size * i) / 100, (-grid_size * (j - 1000)) / 100);
    i = i + 40;
  }
  ctx.fillText(
    "+",
    (grid_size * 1510) / 100,
    (-grid_size * (1550 - 1000)) / 100
  );
}
//To fill Shale Region
function drawShalePatterns() {
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.font = "12px Verdana";
  ctx.lineWidth = 2;
  i = 320;
  (j = 1500), (stopPoint = 400);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 270;
  (j = 1460), (stopPoint = 700);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 220;
  (j = 1420), (stopPoint = 760);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 280;
  (j = 1380), (stopPoint = 720);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 350;
  (j = 1340), (stopPoint = 660);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 410;
  (j = 1300), (stopPoint = 550);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 1380;
  (j = 1480), (stopPoint = 1450);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 1320;
  (j = 1440), (stopPoint = 1480);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 1280;
  (j = 1400), (stopPoint = 1520);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 1360;
  (j = 1360), (stopPoint = 1520);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 1420;
  (j = 1320), (stopPoint = 1500);
  fillTextPatterns("\u2729", i, j, stopPoint);
  i = 1500;
  (j = 1280), (stopPoint = 1520);
  fillTextPatterns("\u2729", i, j, stopPoint);
  ctx.closePath();
}
//To fill RedStone Region
function drawRedPatterns() {
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.font = "12px Verdana";
  ctx.lineWidth = 2;
  i = 180;
  (j = 1400), (stopPoint = 200);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 120;
  (j = 1360), (stopPoint = 250);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 80;
  (j = 1320), (stopPoint = 350);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 120;
  (j = 1280), (stopPoint = 400);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 200;
  (j = 1240), (stopPoint = 780);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 240;
  (j = 1200), (stopPoint = 750);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 260;
  (j = 1160), (stopPoint = 700);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 350;
  (j = 1120), (stopPoint = 600);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 420;
  (j = 1080), (stopPoint = 580);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 620;
  (j = 1280), (stopPoint = 900);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 650;
  (j = 1320), (stopPoint = 900);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 730;
  (j = 1360), (stopPoint = 850);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1250;
  (j = 1400), (stopPoint = 1250);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1170;
  (j = 1360), (stopPoint = 1350);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1150;
  (j = 1320), (stopPoint = 1380);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1180;
  (j = 1280), (stopPoint = 1460);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1260;
  (j = 1240), (stopPoint = 1490);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1320;
  (j = 1200), (stopPoint = 1490);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1380;
  (j = 1160), (stopPoint = 1500);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1410;
  (j = 1120), (stopPoint = 1500);
  fillTextPatterns("\u25B2", i, j, stopPoint);
  i = 1480;
  (j = 1080), (stopPoint = 1500);
  fillTextPatterns("\u25B2", i, j, stopPoint);
}
//To fill Sandstone Region
function drawSandPatterns() {
  ctx.beginPath();
  ctx.fillStyle = "#581845";
  ctx.font = "12px Verdana";
  ctx.lineWidth = 2;
  i = 20;
  (j = 1260), (stopPoint = 100);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 20;
  (j = 1220), (stopPoint = 150);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 50;
  (j = 1160), (stopPoint = 200);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 80;
  (j = 1120), (stopPoint = 230);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 110;
  (j = 1080), (stopPoint = 350);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 150;
  (j = 1040), (stopPoint = 850);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 250;
  (j = 1000), (stopPoint = 810);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 650;
  (j = 1040), (stopPoint = 880);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 640;
  (j = 1080), (stopPoint = 920);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 700;
  (j = 1120), (stopPoint = 950);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 730;
  (j = 1160), (stopPoint = 1300);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 1100;
  (j = 1120), (stopPoint = 1350);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 1180;
  (j = 1080), (stopPoint = 1420);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 1200;
  (j = 1040), (stopPoint = 1450);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 1250;
  (j = 1000), (stopPoint = 1500);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 850;
  (j = 1210), (stopPoint = 1200);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 880;
  (j = 1250), (stopPoint = 1150);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 920;
  (j = 1290), (stopPoint = 920);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  i = 1100;
  (j = 1290), (stopPoint = 1100);
  fillTextPatterns("\u25B0", i, j, stopPoint);
  ctx.closePath();
}
//To fill Conglomerite Region
function drawCongoPatterns() {
  ctx.beginPath();
  ctx.fillStyle = "#e1280b";
  ctx.font = "12px Verdana";
  ctx.lineWidth = 2;
  i = 5;
  (j = 1120), (stopPoint = 20);
  fillTextPatterns("\u25C9", i, j, stopPoint);
  i = 5;
  (j = 1080), (stopPoint = 80);
  fillTextPatterns("\u25C9", i, j, stopPoint);
  i = 5;
  (j = 1040), (stopPoint = 120);
  fillTextPatterns("\u25C9", i, j, stopPoint);
  i = 5;
  (j = 1000), (stopPoint = 200);
  fillTextPatterns("\u25C9", i, j, stopPoint);
  i = 940;
  (j = 1080), (stopPoint = 1100);
  fillTextPatterns("\u25C9", i, j, stopPoint);
  i = 890;
  (j = 1040), (stopPoint = 1150);
  fillTextPatterns("\u25C9", i, j, stopPoint);
  i = 860;
  (j = 1000), (stopPoint = 1220);
  fillTextPatterns("\u25C9", i, j, stopPoint);
  i = 1030;
  (j = 1110), (stopPoint = 1030);
  fillTextPatterns("\u25C9", i, j, stopPoint);
}
function fillTextPatterns(pattern, xcoord, ycoord, stopPoint) {
  while (i <= stopPoint) {
    ctx.fillText(
      pattern,
      (grid_size * i) / 100,
      (-grid_size * (j - 1000)) / 100
    );
    i = i + 50;
  }
}

function divshow1() {
  $("#resultContainer").empty();
  document.getElementById("scale").style.visibility = "hidden";
  document.getElementById("direct").style.visibility = "hidden";
  document.getElementById("legend").style.visibility = "hidden";
  document.getElementById("mycanvas").style.visibility = "hidden";
  document.getElementById("details").style.animation = "";
  document.getElementById("details").style.visibility = "hidden";
  $("#resultContainer").html(
    '<img id="ctmap" style="position: absolute; left: 55px; top: 120px;" src="images/ctrmap.png"/>'
  );
}
function divshow2() {
  $("#resultContainer").empty();
  document.getElementById("mycanvas").style.visibility = "visible";
  document.getElementById("scale").style.visibility = "visible";
  document.getElementById("direct").style.visibility = "visible";
  document.getElementById("legend").style.visibility = "visible";
  document.getElementById("details").style.visibility = "visible";
  document.getElementById("details").style.animation =
    "blink_effect 0.8s infinite";
  $("#mycanvas").css({ left: "125px", top: "160px" });
  $("#scale").css({ left: "590px", top: "170px" });
  $("#direct").css({ left: "590px", top: "210px" });
  $("#legend").css({ left: "590px", top: "250px" });
  $("#scinff").css({ left: "460px", top: "170px" });
  $("#direction").css({ left: "500px", top: "170px" });
  $("#legg").css({ left: "170px", top: "170px" });
}

// // calc waypoints traveling along vertices(for line tracing)
function calcWaypoints(vertices) {
  var waypoints = [];
  for (var i = 1; i < vertices.length; i++) {
    var pt0 = vertices[i - 1];
    var pt1 = vertices[i];
    var dx = pt1.x - pt0.x;
    var dy = pt1.y - pt0.y;
    for (var j = 0; j < 100; j++) {
      var x = pt0.x + (dx * j) / 100;
      var y = pt0.y + (dy * j) / 100;
      waypoints.push({
        x: x,
        y: y,
      });
    }
  }
  return waypoints;
}

// //-------function for array formation--------------
function formArray(x1, y1, x2, y2) {
  var farray = [];
  farray.push({
    x: x1,
    y: y1,
  });
  farray.push({
    x: x2,
    y: y2,
  });
  return farray;
}

//--------------drawing tunnel()
function drawTunnel90() {
  ctx.moveTo((grid_size * tun1x) / 100, (-grid_size * (tun1y - 1000)) / 100);
  ctx.lineTo(
    (grid_size * tun1x) / 100 + 10,
    (-grid_size * (tun1y - 1000)) / 100
  );
  //pctx.font="12px verdana";
  ctx.lineWidh = "1";
  ctx.strokeStyle = "black";
  ctx.stroke();
  //pctx.fillText(dotmarkers[paperpointab],xx,190);
  //pctx.fill();
  tun1x += 10;
  if (tun1x <= 1510) requestAnimationFrame(drawTunnel90);
  if (tun1x > 1510) ctx.closePath();
}
function drawTunnel110() {
  ctx.moveTo((grid_size * tun2x) / 100, (-grid_size * (tun2y - 1000)) / 100);
  ctx.lineTo(
    (grid_size * tun2x) / 100 + 10,
    (-grid_size * (tun2y - 1000)) / 100
  );
  //pctx.font="12px verdana";
  ctx.lineWidh = "1";
  ctx.strokeStyle = "black";
  ctx.stroke();
  //pctx.fillText(dotmarkers[paperpointab],xx,190);
  //pctx.fill();
  tun2x += 10;
  if (tun2x <= 1510) requestAnimationFrame(drawTunnel110);
  if (tun2x > 1510) {
    ctx.closePath();
    document.getElementById("nextButton").style.visibility = "visible";
    ctx.beginPath();
    ctx.font = "10px verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Tunnel", (grid_size * 650) / 100, (-grid_size * 1200) / 100);
    ctx.fill();
    ctx.closePath();
  }
}

//-----animating line draw on paper------------
function drawpp() {
  if (lin == 0) {
    pctx.moveTo(xx, yy);
    pctx.lineTo(xx, yy + 2);
    //pctx.font="12px verdana";
    pctx.lineWidh = "1";
    pctx.strokeStyle = "blue";
    pctx.stroke();
    //pctx.fillText(dotmarkers[paperpointab],xx,190);
    //pctx.fill();
    yy += 1;
    if (yy <= 15) requestAnimationFrame(drawpp);
  } else if (lin == 1) {
    pctx2.moveTo(xx, yy);
    pctx2.lineTo(xx, yy + 2);
    //pctx.font="12px verdana";
    pctx2.lineWidh = "1";
    pctx2.strokeStyle = "red";
    pctx2.stroke();
    //pctx.fillText(dotmarkers[paperpointab],xx,190);
    //pctx.fill();
    yy += 1;
    if (yy <= 15) requestAnimationFrame(drawpp);
  }
}

//---marking animation with pencil---------
function animate() {
  if (lin == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.drawImage(imgTag, x, y); // draw image at current position
    y += 1;
    if (y <= 185) requestAnimationFrame(animate); // loop
  } else if (lin == 1) {
    ctx2.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx2.drawImage(imgTag, x, y); // draw image at current position
    y += 1;
    if (y <= 185) requestAnimationFrame(animate); // loop
  }
}

let animationRunning = false;

//-----------plot on paper for dotted line-----------
function plotonpaperab() {
  if (animationRunning) return; // Exit if animation is already running
  animationRunning = true;
  document.getElementById("cmap").style.visibility = "hidden";
  if (paperpointab < 11) {
    setTimeout(function () {
      requestAnimationFrame(plotonpaperab);
    }, 500);
  }
  if (paperpointab == 11) {
    spanclick = 0;
    setTimeout(function () {
      document.getElementById("dotpoints").style.visibility = "hidden";
      document.getElementById("paper").style.visibility = "hidden";
      document.getElementById("dotplot").style.visibility = "visible";
      document.getElementById("nextButton").style.visibility = "visible";
    }, 1500);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  }
  pctx.beginPath();
  if (paperpointab == 0) {
    x = 75 + paperpointab * 35;
    y = 175;
    xx = 9 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 9 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 1) {
    x = 80 + paperpointab * 35;
    y = 175;
    xx = 14 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 14 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 2) {
    x = 93 + paperpointab * 35;
    y = 175;
    xx = 27 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 27 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 3) {
    x = 115 + paperpointab * 35;
    y = 175;
    xx = 49 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 49 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 4) {
    x = 116 + paperpointab * 35;
    y = 175;
    xx = 50 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 50 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 5) {
    x = 131 + paperpointab * 35;
    y = 175;
    xx = 65 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 65 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 6) {
    x = 147 + paperpointab * 35;
    y = 175;
    xx = 81 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 82 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 7) {
    x = 154 + paperpointab * 35;
    y = 175;
    xx = 88 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 88 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 8) {
    x = 147 + paperpointab * 35;
    y = 175;
    xx = 81 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 81 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 9) {
    x = 161 + paperpointab * 35;
    y = 175;
    xx = 95 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 90 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointab == 10) {
    x = 191 + paperpointab * 35;
    y = 175;
    xx = 125 + paperpointab * 35;
    yy = 0;
    pctx.font = "12px verdana";
    pctx.fillText(dotmarkers[paperpointab], 120 + paperpointab * 35, 30);
    pctx.fill();
    drawpp();
    animate(x, y);
  }
  paperpointab++;
  animationRunning = false; // Animation completed
}

//-----------plot on paper for solidline line-----------
function plotonpapercd() {
  if (animationRunning) return; // Exit if animation is already running
  animationRunning = true;
  document.getElementById("cmap").style.visibility = "hidden";
  if (paperpointcd < 9) {
    setTimeout(function () {
      requestAnimationFrame(plotonpapercd);
    }, 500);
  }
  if (paperpointcd == 9) {
    spanclick = 2;
    // lin=1;
    setTimeout(function () {
      document.getElementById("paper2").style.visibility = "hidden";
      document.getElementById("solidplot").style.visibility = "visible";
      document.getElementById("nextButton").style.visibility = "visible";
    }, 1500);
    ctx2.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  }
  pctx2.beginPath();
  if (paperpointcd == 0) {
    x = 87 + paperpointcd * 35;
    y = 175;
    xx = 21 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 21 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointcd == 1) {
    x = 97 + paperpointcd * 35;
    y = 175;
    xx = 31 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 31 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointcd == 2) {
    x = 119 + paperpointcd * 35;
    y = 175;
    xx = 53 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 53 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointcd == 3) {
    x = 186 + paperpointcd * 35;
    y = 175;
    xx = 120 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 120 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointcd == 4) {
    x = 204 + paperpointcd * 35;
    y = 175;
    xx = 138 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 138 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointcd == 5) {
    x = 214 + paperpointcd * 35;
    y = 175;
    xx = 148 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 148 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointcd == 6) {
    x = 230 + paperpointcd * 35;
    y = 175;
    xx = 164 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 164 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointcd == 7) {
    x = 251 + paperpointcd * 35;
    y = 175;
    xx = 185 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 185 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  } else if (paperpointcd == 8) {
    x = 271 + paperpointcd * 35;
    y = 175;
    xx = 205 + paperpointcd * 35;
    yy = 0;
    pctx2.font = "12px verdana";
    pctx2.fillText(solidmarkers[paperpointcd], 205 + paperpointcd * 35, 30);
    pctx2.fill();
    drawpp();
    animate(x, y);
  }
  paperpointcd++;
  animationRunning = false; // Animation completed
}

//flow of drawing profile view graph
function drawXaxis() {
  //drawing X-axis and horizontal grid lines
  for (var i = 0; i <= num_lines_x; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    // if(i == xaxis_distance_gridlines)
    // {
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = "#000000";
    // }		else
    ctx.strokeStyle = "pink";
    if (i == num_lines_x) {
      ctx.moveTo(0, grid_size * i);
      ctx.lineTo(canvas_width, grid_size * i);
    } else {
      ctx.moveTo(0, grid_size * i + 0.5);
      ctx.lineTo(canvas_width, grid_size * i + 0.5);
    }
    ctx.stroke();
  }
}
function drawYaxis() {
  for (i = 0; i <= num_lines_y; i++) {
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

    if (i == num_lines_y) {
      ctx.moveTo(grid_size * i, 0);
      ctx.lineTo(grid_size * i, canvas_height);
    } else {
      ctx.moveTo(grid_size * i + 0.5, 0);
      ctx.lineTo(grid_size * i + 0.5, canvas_height);
    }
    ctx.stroke();
  }
}
//plotting x axis animation
function plotXaxis() {
  if (tx < xpoints.length - 1) {
    requestAnimationFrame(plotXaxis);
  }

  // draw a line segment from the last waypoint
  // to the current waypoint
  if (tx == xpoints.length - 1) {
    document.getElementById("cmap").style.visibility = "visible";
    document.getElementById("cmap").innerHTML = "Plot Y-Axis";
  }
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.moveTo(xpoints[tx - 1].x, xpoints[tx - 1].y);
  ctx.lineTo(xpoints[tx].x, xpoints[tx].y);
  ctx.stroke();
  ctx.closePath();
  tx++;
}
//plotting y axis animation
function plotYaxis() {
  if (ty < ypoints.length - 1) {
    requestAnimationFrame(plotYaxis);
  }
  // draw a line segment from the last waypoint
  // to the current waypoint
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.moveTo(ypoints[ty - 1].x, ypoints[ty - 1].y);
  ctx.lineTo(ypoints[ty].x, ypoints[ty].y);
  ctx.stroke();
  ctx.closePath();
  ty++;
}
function origin() {
  //Name origin as 0 for AB line
  ctx.beginPath();
  ctx.font = "10px Verdana";
  ctx.fillText("(0,1000)", -40, 15);
  ctx.fill();
  ctx.closePath();
}
function tickXaxis() {
  //----for AB line----------
  for (i = 1; i < num_lines_x + 5; i++) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(grid_size * i + 0.5, -3);
    ctx.lineTo(grid_size * i + 0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = "10px Verdana";
    ctx.textAlign = "start";
    ctx.fillText(
      yaxis_starting_point.number * i + xaxis_starting_point.suffix,
      grid_size * i,
      15
    );
    ctx.stroke();
    ctx.closePath();
  }
}
function tickYaxis() {
  //Positive Y-axis of graph is negative Y-axis of the canvas
  //------------for AB line----------
  for (i = 1; i < num_lines_y; i++) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, -grid_size * i + 0.5);
    ctx.lineTo(3, -grid_size * i + 0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = "10px Verdana";
    ctx.textAlign = "start";
    ctx.fillText(
      xaxis_starting_point.number * i + 1000 + xaxis_starting_point.suffix,
      -30,
      -grid_size * i
    );
    ctx.stroke();
    ctx.closePath();
  }
}
function drawtriangle() {
  //-----------for AB line ------------
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.font = "20px Verdana Bold";
  ctx.fillText("Y", -(grid_size * (50 / 100)), -(grid_size * (960 / 100)));
  ctx.moveTo(0, -(grid_size * (1000 / 100)));
  ctx.lineTo(-(grid_size * (20 / 100)), -(grid_size * (970 / 100)));
  ctx.lineTo(grid_size * (20 / 100), -(grid_size * (970 / 100)));
  ctx.lineTo(0, -(grid_size * (1000 / 100)));
  ctx.fillText("X\u0027", grid_size * (1580 / 100), -(grid_size * (-50 / 100)));
  ctx.moveTo(grid_size * (1620 / 100), -(grid_size * (0 / 100)));
  ctx.lineTo(grid_size * (1580 / 100), -(grid_size * (20 / 100)));
  ctx.lineTo(grid_size * (1580 / 100), -(grid_size * (-20 / 100)));
  ctx.lineTo(grid_size * (1620 / 100), -(grid_size * (0 / 100)));
  ctx.fill();
  ctx.closePath();
  document.getElementById("cmap").style.visibility = "visible";
  document.getElementById("cmap").innerHTML = "Points on X-Axis";
}
function namescale() {
  //Name origin as 0
  ctx.beginPath();
  ctx.font = "14px Verdana";
  ctx.fillText("Scale", 350, -300);
  ctx.fillText("X-Axis:1cm=100m", 350, -280);
  ctx.fillText("Y-Axis:1cm=100m", 350, -260);
  ctx.fill();
  ctx.closePath();
}
function setcanvas() {
  ctx2.translate(
    yaxis_distance_gridlines * grid_size,
    xaxis_distance_gridlines * grid_size
  );
  setTimeout(function () {
    showarrow();
  }, 500);
}
function showarrow() {
  document.getElementById("mycanvas2").style.visibility = "visible";
  setTimeout(function () {
    ctx2.clearRect(0, 0, 605, 400);
    ctx2.drawImage(imgTag1, grid_size * (30 / 100), -grid_size * (662 / 100));
    document.getElementById("x1").innerHTML = "50";
  }, 2500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (30 / 100), -grid_size * (662 / 100), 15, 234);
    ctx2.drawImage(imgTag1, grid_size * (174 / 100), -grid_size * (662 / 100));
    document.getElementById("x2").innerHTML = "190";
  }, 3500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (174 / 100), -grid_size * (662 / 100), 15, 234);
    ctx2.drawImage(imgTag1, grid_size * (344 / 100), -grid_size * (662 / 100));
    document.getElementById("x3").innerHTML = "360";
  }, 4500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (344 / 100), -grid_size * (662 / 100), 15, 234);
    ctx2.drawImage(imgTag1, grid_size * (624 / 100), -grid_size * (662 / 100));
    document.getElementById("x4").innerHTML = "650";
  }, 5500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (624 / 100), -grid_size * (662 / 100), 15, 234);
    ctx2.drawImage(imgTag1, grid_size * (794 / 100), -grid_size * (662 / 100));
    document.getElementById("x5").innerHTML = "810";
  }, 6500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (794 / 100), -grid_size * (662 / 100), 15, 234);
    ctx2.drawImage(imgTag1, grid_size * (924 / 100), -grid_size * (662 / 100));
    document.getElementById("x6").innerHTML = "940";
  }, 7500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (924 / 100), -grid_size * (662 / 100), 15, 234);
    ctx2.drawImage(imgTag1, grid_size * (1079 / 100), -grid_size * (662 / 100));
    document.getElementById("x7").innerHTML = "1095";
  }, 8500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (1079 / 100), -grid_size * (662 / 100), 15, 234);
    ctx2.drawImage(imgTag1, grid_size * (1234 / 100), -grid_size * (662 / 100));
    document.getElementById("x8").innerHTML = "1250";
  }, 9500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (1234 / 100), -grid_size * (662 / 100), 15, 234);
    ctx2.drawImage(imgTag1, grid_size * (1395 / 100), -grid_size * (662 / 100));
    document.getElementById("x9").innerHTML = "1410";
  }, 10500);
  setTimeout(function () {
    ctx2.clearRect(grid_size * (1395 / 100), -grid_size * (662 / 100), 15, 234);
    document.getElementById("mycanvas2").style.visibility = "hidden";
    document.getElementById("solidpic").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "visible";
  }, 11500);
}
// table show()
function showtable() {
  if (tablesh == 0) {
    document.getElementById("dottable").style.visibility = "visible";
    $("#dottable")
      .show()
      .find("tr")
      .each(function (i, item) {
        var $row = $(item);
        $row.hide();
        $row.delay(i * 200).fadeIn(200);
      });
    document.getElementById("cmap").innerHTML = "Click on Points<br> to plot";
  } else if (tablesh == 1) {
    document.getElementById("solidtable1").style.visibility = "visible";
    // $('#solidtable1').show().find('tr').each(function (i,item){
    // var $row = $(item);
    // $row.hide();
    // $row.delay(i*200).fadeIn(200);
    // });
    document.getElementById("cmap").style.visibility = "hidden";
    setcanvas();
  }
}

function endLine() {
  //Endline Y';
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.font = "20px Verdana Bold";
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.moveTo(grid_size * (1535 / 100), -canvas_height);
  ctx.lineTo(
    grid_size * (1535 / 100),
    -(grid_size * (0 / 100) - (grid_size + 15))
  );
  ctx.moveTo(grid_size * (1535 / 100), -(grid_size * (1000 / 100)));
  ctx.lineTo(grid_size * (1515 / 100), -(grid_size * (970 / 100)));
  ctx.lineTo(grid_size * (1555 / 100), -(grid_size * (970 / 100)));
  ctx.lineTo(grid_size * (1535 / 100), -(grid_size * (1000 / 100)));
  ctx.fillText("Y'", grid_size * (1575 / 100), -(grid_size * (960 / 100)));
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function showCalculationMethod(elem) {
  var fid = elem.id;
  if (fid == "found") {
    document.getElementById("f11").style.visibility = "visible";
    document.getElementById("f2").style.visibility = "hidden";
    document.getElementById("found").style.visibility = "visible";
    document.getElementById("can7-1").style.visibility = "visible";
    document.getElementById("can7-1").src = "images/tt.PNG";
  } else if (fid == "notfound") {
    document.getElementById("f11").style.visibility = "hidden";
    document.getElementById("f2").style.visibility = "visible";
    document.getElementById("notfound").style.visibility = "visible";
    document.getElementById("can7-1").style.visibility = "visible";
    document.getElementById("can7-1").src = "images/tt2.png";
    document.getElementById("nextButton").style.visibility = "visible";
  }
}

function jpoints(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

function joinPoints() {
  if (jpts < dotpoints.length) {
    setTimeout(function () {
      requestAnimationFrame(joinPoints);
    }, 500);
  }
  if (jpts == dotpoints.length) {
    jpoints(grid_size * (1535 / 100), (-grid_size * (1600 - 1000)) / 100);
    ctx.closePath();
    document.getElementById("nextButton").style.visibility = "visible";
  }
  //Join Points
  ctx.strokeStyle = "maroon";
  ctx.lineWidth = 1;
  if (jpts == 4) {
    ctx.quadraticCurveTo(
      grid_size * (dotpoints[jpts][0] / 100 - 0.35),
      -grid_size * ((dotpoints[jpts][1] - 1000) / 100 + 0.35),
      grid_size * (dotpoints[jpts][0] / 100),
      -grid_size * ((dotpoints[jpts][1] - 1000) / 100)
    );
  }
  if (jpts == 8) {
    ctx.quadraticCurveTo(
      grid_size * (dotpoints[jpts][0] / 100 - 0.35),
      -grid_size * ((dotpoints[jpts][1] - 1000) / 100 - 0.35),
      grid_size * (dotpoints[jpts][0] / 100),
      -grid_size * ((dotpoints[jpts][1] - 1000) / 100)
    );
  }
  if (
    jpts == 0 ||
    jpts == 1 ||
    jpts == 2 ||
    jpts == 3 ||
    jpts == 5 ||
    jpts == 6 ||
    jpts == 7 ||
    jpts == 9 ||
    jpts == 10
  ) {
    jpoints(
      grid_size * (dotpoints[jpts][0] / 100),
      (-grid_size * (dotpoints[jpts][1] - 1000)) / 100
    );
  }
  jpts++;
}

function chkdrip() {
  if (drip == 1) {
    document.getElementById("qq").style.visibility = "visible";
    ids = $("#s2").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 2) {
    document.getElementById("rr").style.visibility = "visible";
    ids = $("#s3").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 3) {
    document.getElementById("ss").style.visibility = "visible";
    ids = $("#s4").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 4) {
    document.getElementById("ttt").style.visibility = "visible";
    ids = $("#s5").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 5) {
    document.getElementById("uu").style.visibility = "visible";
    ids = $("#s6").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 6) {
    document.getElementById("vv").style.visibility = "visible";
    ids = $("#s7").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 7) {
    document.getElementById("ww").style.visibility = "visible";
    ids = $("#s8").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 8) {
    document.getElementById("xx").style.visibility = "visible";
    ids = $("#s9").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 9) {
    document.getElementById("oo").style.visibility = "visible";
    ids = $("#s10").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 10) {
    document.getElementById("mm").style.visibility = "visible";
    ids = $("#s11").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 11) {
    document.getElementById("nn").style.visibility = "visible";
    ids = $("#s12").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  }
}
function chkdrip2() {
  if (drip == 1) {
    document.getElementById("shale").style.visibility = "visible";
    ids = $("#s22").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 2) {
    document.getElementById("red").style.visibility = "visible";
    ids = $("#s33").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 3) {
    document.getElementById("sand").style.visibility = "visible";
    ids = $("#s44").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 4) {
    document.getElementById("congo").style.visibility = "visible";
    ids = $("#s55").attr("id");
    myInt = setInterval(function () {
      animatearrow(ids);
    }, 500);
  } else if (drip == 5) {
    var q1 = Object.create(questions);
    generateQuestion(
      q1,
      "Identify the region with this pattern <span style = 'color:blue'>\u2729 \u2729 \u2729</span> ",
      "",
      "Conglomerate",
      "Shale",
      "Redstone",
      "Banded Shale",
      2,
      nextButtonProceed,
      100,
      150,
      300,
      120
    );
  }
}

function printCalculation(sline, cn82, cn83, cn84, cn85, cn86, cn87, tval) {
  setTimeout(function () {
    document.getElementById("can8-2").style.visibility = "visible";
    $("#can8-2").html(cn82);
    document.getElementById("can8-3").style.visibility = "visible";
    $("#can8-3").html(cn83);
    document.getElementById("can8-4").style.visibility = "visible";
    $("#can8-4").html(cn84);
  }, 1500);
  setTimeout(function () {
    $("#can8-5").html(cn85);
    document.getElementById("can8-5").style.visibility = "visible";
  }, 3500);
  setTimeout(function () {
    $("#can8-6").html(cn86);
    document.getElementById("can8-6").style.visibility = "visible";
  }, 5500);
  setTimeout(function () {
    $("#can8-7").html(cn87);
    document.getElementById("can8-7").style.visibility = "visible";
  }, 7500);
  setTimeout(function () {
    document.getElementById("can8-7").style.visibility = "hidden";
    $("#can8-8").html("Index=" + tval);
    $("#yval" + (sline + 1)).html(tval);
    document.getElementById("can8-8").style.visibility = "visible";
    setTimeout(function () {
      resetTable(tval);
    }, 500);
  }, 9500);
}
function resetTable(tval) {
  if (solidline < 8) document.getElementById("nb").style.visibility = "visible";
  else if (solidline == 8) {
    setTimeout(function () {
      document.getElementById("select8-1").style.visibility = "hidden";
      document.getElementById("select8-2").style.visibility = "hidden";
      document.getElementById("can8-1").style.visibility = "hidden";
      document.getElementById("can8-2").style.visibility = "hidden";
      document.getElementById("can8-3").style.visibility = "hidden";
      document.getElementById("can8-4").style.visibility = "hidden";
      document.getElementById("can8-5").style.visibility = "hidden";
      document.getElementById("can8-6").style.visibility = "hidden";
      document.getElementById("can8-8").style.visibility = "hidden";
      document.getElementById("img8-1").style.visibility = "hidden";
      document.getElementById("table1").style.visibility = "hidden";
      document.getElementById("p9").style =
        "color:black;background-color:white";
      $("label").css({ visibility: "hidden" });
      $("#table2").css({ left: "250px", top: "50px" });
      document.getElementById("nextButton").style.visibility = "visible";
    }, 500);
  }
}
function setColorTable(sline) {
  if (sline == 0 || sline == 1 || sline == 2) {
    document.getElementById("p" + (sline + 1)).style =
      "color:white;background-color:blue";
    document.getElementById("mn" + (sline + 1)).style =
      "color:white;background-color:red";
    document.getElementById("mn" + (sline + 2)).style =
      "color:white;background-color:green";
  } else if (sline == 3 || sline == 4 || sline == 5) {
    document.getElementById("p" + (sline + 1)).style =
      "color:white;background-color:blue";
    document.getElementById("mn" + (sline + 2)).style =
      "color:white;background-color:red";
    document.getElementById("mn" + (sline + 3)).style =
      "color:white;background-color:green";
  } else if (sline == 6 || sline == 7 || sline == 8) {
    document.getElementById("p" + (sline + 1)).style =
      "color:white;background-color:blue";
    document.getElementById("mn" + (sline + 3)).style =
      "color:white;background-color:red";
    document.getElementById("mn" + (sline + 4)).style =
      "color:white;background-color:green";
  }
}
function removeColorTable(sline) {
  if (sline == 1 || sline == 2 || sline == 3 || sline == 4 || sline == 5) {
    document.getElementById("p" + sline).style =
      "color:black;background-color:white";
    document.getElementById("mn" + sline).style =
      "color:black;background-color:white";
    document.getElementById("mn" + (sline + 1)).style =
      "color:black;background-color:white";
  } else if (sline == 6 || sline == 7 || sline == 8) {
    document.getElementById("p" + sline).style =
      "color:black;background-color:white";
    document.getElementById("mn" + (sline + 1)).style =
      "color:black;background-color:white";
    document.getElementById("mn" + (sline + 2)).style =
      "color:black;background-color:white";
  }
}
function setTheta(eve) {
  var tid = eve.id;
  document.getElementById("img13-1").src = "images/" + tid + ".png";
  document.getElementById(tid + "1").innerHTML = theta[tid];
  document.getElementById("can13-1").innerHTML = "&#10148;" + theta1[tid + "1"];
  var tl = document.getElementById("thetatable").rows.length;
  for (var i = 0; i < tl; i++) {
    var tv = document.getElementById("thetatable").rows[i].cells;
    if (tv[1].innerHTML != "") {
      document.getElementById("nextButton").style.visibility = "visible";
    } else {
      document.getElementById("nextButton").style.visibility = "hidden";
    }
  }
}
function horizontalLine(fromX, toX, toY, arcrad) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "red";
  // ctx.setLineDash([2,1]);
  ctx.moveTo(grid_size * (fromX / 100), -(grid_size * ((toY - 1000) / 100)));
  ctx.lineTo(grid_size * (toX / 100), -(grid_size * ((toY - 1000) / 100)));
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "blue";
  ctx.arc(
    grid_size * ((fromX + 50) / 100),
    -grid_size * ((toY - 1000) / 100),
    arcrad,
    0,
    0.8 * Math.PI,
    false
  );
  ctx.fillText(
    "\u03B8",
    grid_size * ((fromX + 60) / 100),
    -grid_size * ((toY - 1050) / 100)
  );
  ctx.stroke();
  setTimeout(function () {
    setDialog(
      "Draw a vertical line between the upper and lower contact in a non horizontal unit.",
      100,
      185,
      120,
      250
    );
  }, 800);
}
function verticalLine(fromX, fromY, toY) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  // ctx.setLineDash([2,1]);
  ctx.moveTo(grid_size * (fromX / 100), -(grid_size * ((fromY - 1000) / 100)));
  ctx.lineTo(grid_size * (fromX / 100), -(grid_size * ((toY - 1000) / 100)));
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = "#900C3F";
  ctx.fillStyle = "#900C3F";
  ctx.moveTo(grid_size * (fromX / 100), -(grid_size * ((fromY - 1000) / 100)));
  ctx.lineTo(
    grid_size * ((fromX + 50) / 100),
    -(grid_size * ((fromY - 1000) / 100))
  );
  ctx.moveTo(grid_size * (fromX / 100), -(grid_size * ((toY - 1000) / 100)));
  ctx.lineTo(
    grid_size * ((fromX + 50) / 100),
    -(grid_size * ((toY - 1000) / 100))
  );
  ctx.moveTo(
    grid_size * ((fromX + 30) / 100),
    -(grid_size * ((fromY - 1000) / 100))
  );
  ctx.lineTo(
    grid_size * ((fromX + 30) / 100),
    -(grid_size * ((toY - 1000) / 100))
  );
  ctx.fillText(
    "VT",
    grid_size * ((fromX + 50) / 100),
    -(grid_size * ((toY - 950) / 100))
  );
  ctx.stroke();
  setTimeout(function () {
    setDialog(
      "Draw a perpendicular line from intersecting point.",
      100,
      185,
      100,
      250
    );
  }, 800);
}
function perpendicularLine(fX, fY, tX, tY) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "blue";
  // ctx.setLineDash([2,1]);
  ctx.moveTo(grid_size * (fX / 100), -(grid_size * ((fY - 1000) / 100)));
  ctx.lineTo(grid_size * (tX / 100), -(grid_size * ((tY - 1000) / 100)));
  ctx.stroke();
  ctx.closePath();
  // ctx.beginPath();
  // ctx.strokeStyle="blue";
  ctx.fillStyle = "blue";
  ctx.font = "14px";
  // ctx.moveTo(grid_size*((fX+20)/100),-(grid_size*((fY-1020)/100)));
  // ctx.lineTo(grid_size*((tX+35)/100),-(grid_size*((tY-1028)/100)));
  ctx.fillText(
    "TT",
    grid_size * ((fX + 10) / 100),
    -(grid_size * ((fY - 1058) / 100))
  );
  // ctx.stroke();
  ctx.closePath();
  var tb1 = document.getElementById("result");
  var row = tb1.insertRow();
  var cell = row.insertCell();
  if (screensVal == 3) {
    cell.innerHTML = "RS";
    cell = row.insertCell();
    cell.innerHTML = "170";
    cell = row.insertCell();
    cell.innerHTML = "150";
  } else if (screensVal == 4) {
    cell.innerHTML = "SH";
    cell = row.insertCell();
    cell.innerHTML = "220";
    cell = row.insertCell();
    cell.innerHTML = "180";
  }
  if (screensVal == 3) {
    setTimeout(function () {
      setDialog(
        "Determine vertical and true thickness for shale region.",
        100,
        185,
        100,
        250
      );
    }, 800);
  } else if (screensVal == 4) {
    setTimeout(function () {
      setDialog(
        "Determine vertical and true thickness for Sandstone region.",
        100,
        185,
        100,
        250
      );
    }, 800);
  }
}
function hvp(f1, t1, f2, t2, sf1, st1, sf2, st2) {
  //vertical line
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  // ctx.setLineDash([2,1]);
  ctx.moveTo(grid_size * (f1 / 100), -(grid_size * ((t1 - 1000) / 100)));
  ctx.lineTo(grid_size * (f2 / 100), -(grid_size * ((t2 - 1000) / 100)));
  ctx.stroke();
  ctx.closePath();

  //Length
  ctx.beginPath();
  ctx.strokeStyle = "#900C3F";
  ctx.fillStyle = "#900C3F";
  ctx.moveTo(grid_size * (f1 / 100), -(grid_size * ((t1 - 1000) / 100)));
  ctx.lineTo(grid_size * ((f1 - 50) / 100), -(grid_size * ((t1 - 1000) / 100)));
  ctx.moveTo(grid_size * (f2 / 100), -(grid_size * ((t2 - 1000) / 100)));
  ctx.lineTo(grid_size * ((f2 - 50) / 100), -(grid_size * ((t2 - 1000) / 100)));
  ctx.moveTo(grid_size * ((f1 - 30) / 100), -(grid_size * ((t1 - 1000) / 100)));
  ctx.lineTo(grid_size * ((f2 - 30) / 100), -(grid_size * ((t2 - 1000) / 100)));
  ctx.fillText(
    "VT",
    grid_size * ((f1 - 80) / 100),
    -(grid_size * ((t1 - 1150) / 100))
  );
  ctx.stroke();

  //perpendicular line
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "blue";
  ctx.moveTo(grid_size * (sf1 / 100), -(grid_size * ((st1 - 1000) / 100)));
  ctx.lineTo(grid_size * (sf2 / 100), -(grid_size * ((st2 - 1000) / 100)));
  ctx.fillStyle = "blue";
  ctx.font = "14px";
  ctx.fillText(
    "TT",
    grid_size * ((sf1 + 150) / 100),
    -(grid_size * ((st1 - 950) / 100))
  );
  ctx.stroke();
  ctx.closePath();

  //Table update
  var tb1 = document.getElementById("result");
  var row = tb1.insertRow();
  var cell = row.insertCell();
  cell.innerHTML = "SA";
  cell = row.insertCell();
  cell.innerHTML = "210";
  cell = row.insertCell();
  cell.innerHTML = "180";
}
function setDialog(textContent, leftPos, topPos, heightVal, widthVal) {
  document.getElementById("divp").innerHTML = textContent;
  document.getElementById("dialog-div").style.left = leftPos + "px";
  document.getElementById("dialog-div").style.top = topPos + "px";
  document.getElementById("dialog-div").style.height = heightVal + "px";
  document.getElementById("dialog-div").style.width = widthVal + "px";
  document.getElementById("dialog-div").style.visibility = "visible";
}
function hideDialog() {
  document.getElementById("dialog-div").style.visibility = "hidden";
  if (simsubscreennum == 15 && screensVal == 0) {
    screensVal = 1;
    sX = 1080;
    sY = 1332;
    dX = 1410;
    arcrad = 6;
    hColor = "grey";
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
    ctx.arc(
      grid_size * ((sX + 50) / 100),
      -grid_size * ((sY - 1000) / 100),
      arcrad,
      0,
      0.8 * Math.PI,
      false
    );
    ctx.fillText(
      "\u03B8",
      grid_size * ((sX + 60) / 100),
      -grid_size * ((sY - 1050) / 100)
    );
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
    hInt = setInterval(function () {
      drawHorizontalLineAnimation();
    }, 10);
    // horizontalLine(1080,1410,1332,6);
  } else if (simsubscreennum == 15 && screensVal == 1) {
    screensVal = 2;
    sX = 1250;
    sY = 1432;
    dY = 1224;
    tempY = 1432;
    hColor = "black";
    ctx.beginPath();
    ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
    hInt = setInterval(function () {
      drawVerticalLineAnimation();
    }, 10);
    // verticalLine(1250,1432,1224);
  } else if (simsubscreennum == 15 && screensVal == 2) {
    screensVal = 3;
    sX = 1304;
    sY = 1394;
    dX = 1180;
    dY = 1280;
    tempX = sX;
    tempY = sY;
    hColor = "blue";
    ctx.beginPath();
    ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
    hInt = setInterval(function () {
      drawPerpendicularLineAnimation();
    }, 10);
    // perpendicularLine(1324,1384,1180,1280);
  } else if (simsubscreennum == 15 && screensVal == 3) {
    screensVal = 4;
    sX = 1200;
    sY = 1432;
    dX = 1535;
    hColor = "grey";
    ctx.beginPath();
    ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
    hInt = setInterval(function () {
      drawHorizontalLineAnimation();
    }, 10);
  } else if (simsubscreennum == 15 && screensVal == 4) {
    screensVal = 5;
    sX = 1095;
    sY = 1332;
    dY = 1125;
    tempY = 1332;
    hColor = "black";
    ctx.beginPath();
    ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
    hInt = setInterval(function () {
      drawVerticalLineAnimation();
    }, 10);
    // hvp(1095,1332,1095,1125,1095,1125,1250,1235);
    // document.getElementById("nextButton").style.visibility = "visible";
  }
}
function drawHorizontalLineAnimation() {
  ctx.lineTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
  ctx.lineWidth = 2;
  ctx.strokeStyle = hColor;
  ctx.stroke();
  sX += 1;
  if (sX == dX) {
    ctx.closePath();
    clearInterval(hInt);
    if (hCount == 0) {
      hCount = 1;
      setDialog(
        "Draw a vertical line between the upper and lower contact in a non horizontal unit.",
        100,
        185,
        120,
        250
      );
    } else if (hCount == 1) {
      hCount = 2;
      sX = 1410;
      sY = 1519;
      dY = 1332;
      tempY = 1519;
      hColor = "black";
      ctx.beginPath();
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
      hInt = setInterval(function () {
        drawVerticalLineAnimation();
      }, 10);
    }
  }
}
function drawVerticalLineAnimation() {
  ctx.lineTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
  ctx.lineWidth = 2;
  ctx.strokeStyle = hColor;
  ctx.stroke();
  sY -= 1;
  if (sY == dY) {
    ctx.closePath();
    clearInterval(hInt);
    if (vCount == 0) {
      vCount = 1;
      ctx.beginPath();
      ctx.strokeStyle = "#900C3F";
      ctx.fillStyle = "#900C3F";
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((tempY - 1000) / 100)));
      ctx.lineTo(
        grid_size * ((sX + 50) / 100),
        -(grid_size * ((tempY - 1000) / 100))
      );
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((dY - 1000) / 100)));
      ctx.lineTo(
        grid_size * ((sX + 50) / 100),
        -(grid_size * ((dY - 1000) / 100))
      );
      ctx.moveTo(
        grid_size * ((sX + 30) / 100),
        -(grid_size * ((tempY - 1000) / 100))
      );
      ctx.lineTo(
        grid_size * ((sX + 30) / 100),
        -(grid_size * ((dY - 1000) / 100))
      );
      ctx.fillText(
        "VT",
        grid_size * ((sX + 50) / 100),
        -(grid_size * ((dY - 950) / 100))
      );
      ctx.stroke();
      setDialog(
        "Draw a perpendicular line from intersecting point.",
        100,
        185,
        100,
        250
      );
    } else if (vCount == 1) {
      vCount = 2;
      ctx.beginPath();
      ctx.strokeStyle = "#900C3F";
      ctx.fillStyle = "#900C3F";
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((tempY - 1000) / 100)));
      ctx.lineTo(
        grid_size * ((sX + 50) / 100),
        -(grid_size * ((tempY - 1000) / 100))
      );
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((dY - 1000) / 100)));
      ctx.lineTo(
        grid_size * ((sX + 50) / 100),
        -(grid_size * ((dY - 1000) / 100))
      );
      ctx.moveTo(
        grid_size * ((sX + 30) / 100),
        -(grid_size * ((tempY - 1000) / 100))
      );
      ctx.lineTo(
        grid_size * ((sX + 30) / 100),
        -(grid_size * ((dY - 1000) / 100))
      );
      ctx.fillText(
        "VT",
        grid_size * ((sX + 50) / 100),
        -(grid_size * ((dY - 950) / 100))
      );
      ctx.stroke();
      sX = 1460;
      sY = 1490;
      dX = 1338;
      dY = 1370;
      tempX = sX;
      tempY = sY;
      hColor = "blue";
      ctx.beginPath();
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
      hInt = setInterval(function () {
        drawPerpendicularLineAnimation();
      }, 10);
    } else if (vCount == 2) {
      vCount = 3;
      ctx.beginPath();
      ctx.strokeStyle = "#900C3F";
      ctx.fillStyle = "#900C3F";
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((tempY - 1000) / 100)));
      ctx.lineTo(
        grid_size * ((sX - 50) / 100),
        -(grid_size * ((tempY - 1000) / 100))
      );
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((dY - 1000) / 100)));
      ctx.lineTo(
        grid_size * ((sX - 50) / 100),
        -(grid_size * ((dY - 1000) / 100))
      );
      ctx.moveTo(
        grid_size * ((sX - 30) / 100),
        -(grid_size * ((tempY - 1000) / 100))
      );
      ctx.lineTo(
        grid_size * ((sX - 30) / 100),
        -(grid_size * ((dY - 1000) / 100))
      );
      ctx.fillText(
        "VT",
        grid_size * ((sX - 100) / 100),
        -(grid_size * ((dY - 950) / 100))
      );
      ctx.stroke();
      sX = 1220;
      sY = 1250;
      dX = 1095;
      dY = 1125;
      tempX = sX;
      tempY = sY;
      hColor = "blue";
      ctx.beginPath();
      ctx.moveTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
      hInt = setInterval(function () {
        drawPerpendicularLineAnimation();
      }, 10);
    }
  }
}
function drawPerpendicularLineAnimation() {
  ctx.lineTo(grid_size * (sX / 100), -(grid_size * ((sY - 1000) / 100)));
  ctx.lineWidth = 2;
  ctx.strokeStyle = hColor;
  ctx.stroke();
  sX -= 1;
  sY -= 1;
  if (sX == dX) {
    ctx.closePath();
    clearInterval(hInt);
    var tb1 = document.getElementById("result");
    var row = tb1.insertRow();
    var k = 0;
    if (pCount == 0) {
      pCount = 1;
      ctx.beginPath();
      ctx.fillStyle = hColor;
      ctx.fillText(
        "TT",
        grid_size * ((tempX + 10) / 100),
        -(grid_size * ((tempY - 1058) / 100))
      );
      ctx.closePath();
      for (k = 0; k <= 2; k++) {
        var cell = row.insertCell();
        cell.innerHTML = thicknessTable[0][k];
      }
      setDialog(
        "Determine vertical and true thickness for shale region.",
        100,
        185,
        100,
        250
      );
    } else if (pCount == 1) {
      pCount = 2;
      for (k = 0; k <= 2; k++) {
        var cell = row.insertCell();
        cell.innerHTML = thicknessTable[1][k];
      }
      setDialog(
        "Determine vertical and true thickness for Sandstone region.",
        100,
        185,
        100,
        250
      );
    } else if (pCount == 2) {
      for (k = 0; k <= 2; k++) {
        var cell = row.insertCell();
        cell.innerHTML = thicknessTable[2][k];
      }
      var q1 = Object.create(questions);
      generateQuestion(
        q1,
        "True Thickness of Shale region is ______: ",
        "",
        "150m",
        "170m",
        "220m",
        "180m",
        4,
        nextButtonProceed,
        100,
        150,
        300,
        120
      );
    }
  }
}

function nextButtonProceed() {
  document.getElementById("nextButton").style.visibility = "visible";
}
