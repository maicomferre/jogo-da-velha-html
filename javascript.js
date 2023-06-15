var Player = [0,1];



//Efeitos Sonoros
var path = "files/sound/";
;
var sound_path = {
	'error':      {file:'wrong-buzzer-6268.mp3'},
	'game_click': {file:'click-for-game-menu-131903.mp3'},
	'back_sound': {file:'merx-market-song-33936.mp3'},
}

var sound_list = ['error','game_click','back_sound'];


var jogador_atual = Boolean(Math.random() < 0.5);

//Config
var canvas = undefined;
var playerinterval = null;
var player_color = "#EEAABB";
var interval_control = false;

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
	sound_load();
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
		showerror("Por favor, preencha pelo menos 3 caracteres no primeiro usuario.");
		return false;
	}
	if(player1.length < 3)
	{
		showerror("Por favor, preencha pelo menos 3 caracteres no segundo usuario.");
		return false;
	}	

	if(player1.length > 15)
	{
		showerror("Por favor, preencha no máximo 15 caracteres no primeiro usuario.");
		return false;
	}
	if(player1.length > 15)
	{
		showerror("Por favor, preencha no máximo 15 caracteres no segundo usuario.");
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

	$("#username0").text(player1)
	$("#username1").text(player2);

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
		showerror("Falha ao iniciar o canvas! Navegador obseleto.");
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

	init_playercolor()
}

function init_playercolor()
{
	if(playerinterval != null){
		clearInterval(playerinterval);
		let tmp = !jogador_atual ? "1" : "0";
		$('#username'+tmp).css("background-color",'transparent');
	}


	playerinterval = setInterval(function(){
		let tmp = jogador_atual ? "1" : "0";

		let usercolor = "#FFFFFF";
		
		if(interval_control)
			usercolor = player_color;

		interval_control = !interval_control;

		$('#username'+tmp).css("background-color",usercolor);
	},400);	
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
	sound_path['game_click']['audio'].currentTime = 0;
	sound_path['game_click']['audio'].play();	
	console.log("Mouse: X="+x+"; Y="+y);
	for(let z=0; z<canvas_posicao_click.length; z++)
	{
		let xin = canvas_posicao_click[z][0];
		let yin = canvas_posicao_click[z][1];
		let xout = canvas_posicao_click[z][2];
		let yout = canvas_posicao_click[z][3];

		if (x>xin && y>yin && x < xout && y < yout)
		{
			draw_option(jogador_atual,canvas,canvas_velha[z][0],canvas_velha[z][1]);
		}
	}
	jogador_atual = !jogador_atual;
	init_playercolor();
}

function sound_load()
{
	for(let x=0; x<sound_list.length; x++)
	{
		if(sound_path[sound_list[x]]['file'] == undefined)
		{
			console.log("error sound_load(): sound_path[sound_list["+x+"]]['file'] is undefined");
			//continue;
		}
		sound_path[sound_list[x]]['loaded'] = false;

		if(new window.Audio() === undefined)
		{
			console.log("Error window.Audio(): Indefinido");
			return false;
		}

		sound_path[sound_list[x]]['audio'] = new Audio();


		sound_path[sound_list[x]]['audio'].onerror = function()
		{
			console.log("error sound_load(): não foi possivel carregar o audio; ação: ignorando.");
			//continue;
		}


		sound_path[sound_list[x]]['audio'].onload = function()
		{
			sound_path[sound_list[x]]['loaded'] = false;
		}

		sound_path[sound_list[x]]['audio'].src = path + sound_path[sound_list[x]]['file'];
	
	}

}

function showerror(msg,time=4000)
{
	sound_path['error']['audio'].play();	
	$("#errormessage").html(msg);
	$("#errormessage").toggle('slow');

	setTimeout(function(){
	$("#errormessage").toggle('slow');		
	},time);
}