var Player = [0,1];


//Config
canvas = undefined;
var canvas_velha = [
	[70,25],[160,25],[250,25],
	[70,60],[160,60],[250,60],
	[70,100],[160,100],[250,100],
];

var canvas_posicao_click = [
	[42,26,142,100],// 0x0
	[152,25,290,99],// 0x1
	[298,25,398,99],// 0x2
	[41,110,142,207],//1x0
	[151,109,289,209],//1x1
	[297,110,398,206],//1x2
	[40,221,140,308],//2x0
	[150,217,285,322],//2x1
	[297,217,391,320],//2x2

];

$(document).ready(function(){
	canvas = load_canvas();
	write_game(canvas);

	$('#game').on('mousedown', function(e) {
    	getCursorPosition(canvas, e);
	});
});

function comecar()
{
	var player1 = document.getElementById('player1').value;
	var player2 = document.getElementById('player2').value;

	if(player1.length < 3)
	{
		alert("Por favor, preencha pelo menos 3 caracteres no primeiro usuario.");
		return false;
	}
	if(player1.length < 3)
	{
		alert("Por favor, preencha pelo menos 3 caracteres no segundo usuario.");
		return false;
	}	

	if(player1.length > 15)
	{
		alert("Por favor, preencha no máximo 15 caracteres no primeiro usuario.");
		return false;
	}
	if(player1.length > 15)
	{
		alert("Por favor, preencha no máximo 15 caracteres no segundo usuario.");
		return false;
	}		

	Player[0]['nome'] = player1;
	Player[0]['score'] = 0;
	Player[0]['venceu'] = 0;
	Player[0]['perdeu'] = 0;

	Player[1]['nome'] = player2;
	Player[1]['score'] = 0;
	Player[1]['venceu'] = 0;
	Player[1]['perdeu'] = 0;

	$("#username1").text(player1)
	$("#username2").text(player2);

	$('#opt1').toggle('slow');
	$('#opt2').toggle('slow');
}

function voltar_ao_menu()
{
	$('#opt1').toggle('slow');
	$('#opt2').toggle('slow');	
}

function load_canvas()
{
	var canvas = document.getElementById('game');

	if(canvas.getContext == false)
	{
		alert("Falha ao iniciar o canvas! Navegador obseleto.");
		return undefined;
	}
	var ctx = canvas.getContext('2d');

	return {ctx,canvas};
}
function write_game(context)
{
	let cx = context.ctx;

	cx.lineWidth = 2;
	cx.beginPath();
	for (let y = 40; y < 120; y += 40) 
	{
		cx.moveTo(30, y);
		cx.lineTo(300, y);
	}
	cx.moveTo(220, 10);
	cx.lineTo(220, 120);

	cx.moveTo(110, 10);
	cx.lineTo(110, 120);


	cx.stroke();
	
}


function draw_option(type,cx,x,y)
{
	cx.beginPath();
	if(type)
	{
		cx.arc(x, y, 10, 0, 2*Math.PI);
	}
	else
	{
		cx.font = '30px arial';
		cx.fillText("X",x-5,y+10);
	}
	cx.stroke();
}

function getCursorPosition(canvas, event) {

    console.log("x: " + event.offsetX + " y: " + event.offsetY);
    checkClick(canvas.ctx,event.offsetX,event.offsetY);
}


function checkClick(canvas,x,y)
{
	console.log("Mouse: X="+x+"; Y="+y);
	for(let z=0; z<canvas_posicao_click.length; z++)
	{
		let xin = canvas_posicao_click[z][0];
		let yin = canvas_posicao_click[z][1];
		let xout = canvas_posicao_click[z][2];
		let yout = canvas_posicao_click[z][3];

		if (x>xin && y>yin && x < xout && y < yout)
		draw_option(true,canvas,canvas_velha[z][0],canvas_velha[z][1]);
	}
}