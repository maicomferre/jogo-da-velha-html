var Player = [0,1];


//Config
canvas = undefined;
var canvas_velha = [
	[70,25],[160,25],[250,25],
	[70,60],[160,60],[250,60],
	[70,100],[160,100],[250,100],
];

console.log(canvas_velha);
/*var canvas_posicao [];
var canvas_X = ;
var canvas_O = ;*/

$(document).ready(function(){
	canvas = load_canvas();
	write_game(canvas);
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

	draw_boll(context,canvas_velha[0][0],canvas_velha[0][1]);
	draw_boll(context,canvas_velha[1][0],canvas_velha[1][1]);
	draw_boll(context,canvas_velha[2][0],canvas_velha[2][1]);


	draw_boll(context,canvas_velha[3][0],canvas_velha[3][1]);
	draw_boll(context,canvas_velha[4][0],canvas_velha[4][1]);
	draw_boll(context,canvas_velha[5][0],canvas_velha[5][1]);


	draw_boll(context,canvas_velha[6][0],canvas_velha[6][1]);
	draw_boll(context,canvas_velha[7][0],canvas_velha[7][1]);
	draw_boll(context,canvas_velha[8][0],canvas_velha[8][1]);		
}


function draw_boll(cx,x,y)
{
	cx = cx.ctx;
	cx.beginPath();
	cx.arc(x, y, 10, 0, 2*Math.PI);
	cx.stroke();
}
