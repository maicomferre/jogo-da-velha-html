/*
var Player = {
	0:{},
	1:{}
};

var jogador_atual = Boolean(Math.random() < 0.5);

const player_color = [
	"#EEAABB",
	"#FFFFFF",
];

//Config
var canvas_context:any;
var canvas:any;
var playerinterval:number;
var interval_control = false;
var velha_selecionado:boolean[];
var velha_game = {};
var antidouble = false;
var soundoff = false;
var tmp_gestor_som:string[];

velha_game = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' '],
];

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
	image_load();
	canvas = load_canvas();
	write_game(canvas);
	canvas_context = canvas;

	$('#game').on('mousedown', function(e) {
    	getCursorPosition(canvas, e);
	});

	$('#imgsom').on('click', function(){ alternarsom() });

	som("inicio",'iniciar','loop');	

});



function load_canvas()
{
	canvas = document.getElementById('game');

	if(canvas.getContext == false)
	{
		showerror("Falha ao iniciar o canvas! Navegador obseleto.");
		return undefined;
	}
	var ctx = canvas.getContext('2d');

	return {ctx,canvas};
}
function write_game(context:any)
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

function draw_option(type:boolean,cx:any,x:number,y:number)
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


function getCursorPosition(canvas:any, event:any) {
    checkClick(canvas.ctx,event.offsetX,event.offsetY);
}


function checkClick(canvas:HTMLObjectElement,x:number,y:number)
{
	for(let z=0; z<canvas_posicao_click.length; z++)
	{
		let xin = canvas_posicao_click[z][0];
		let yin = canvas_posicao_click[z][1];
		let xout = canvas_posicao_click[z][2];
		let yout = canvas_posicao_click[z][3];

		if (x>xin && y>yin && x < xout && y < yout)
		{
			if(!velha_selecionado[z])
			{
				let jat = jogador_atual_int(jogador_atual);
				let outroj = jogador_atual_int(!jogador_atual);

				Player[jat]['jogadas']++;

				som('game_click','reiniciar');
				
				draw_option(jogador_atual,canvas,canvas_velha[z][0],canvas_velha[z][1]);
				velha_selecionado[z] = true;


				let w = obterPosicaoEmArray(z);

				velha_game[w.a][w.b] = obterSimboloJogaodor(jogador_atual);
				//console.log("x = "+w.a+'  |  y='+w.b);

				if(verificar(velha_game) == true)
				{
					Player[jat]['venceu']++;
					Player[jat]['score'] += calcular_score('ganhou',jat);

					Player[outroj]['perdeu']++;
					Player[outroj]['score'] += calcular_score('perdeu',outroj);

					vencedor_pagina();
				}

				jogador_atual = !jogador_atual;
				init_playercolor();
			}
		}
	}
}

function verificar(vg:any)
{
	//var vg = velha_game;

	for(var x=0; x < 3; x++)
	{
		//console.log("x=" + x + ' ' +  velha_game[x][0] + '   |   '+velha_game[x][1]+'   |   '+velha_game[x][2]);
		if(vg[0][x] != " ")
		{
			if(vg[0][x] === vg[1][x] && vg[1][x] === vg[2][x])return true;
		}
		if(vg[x][0] != " ")
		{
			if(vg[x][0] === vg[x][1] && vg[x][1] === vg[x][2])return true;
		}

		if(vg[1][1] != " ")
		{
			//if(vg[0][1] === vg[1][1] && vg[1][1] === vg[2][1])return true;//No meio

			if(vg[0][0] === vg[1][1] && vg[1][1] === vg[2][2])return true;//Cruzado \

			if(vg[2][0] === vg[1][1] && vg[1][1] === vg[0][2])return true;//Cruzado /
		}
	}


	return false;
}


function obterPosicaoEmArray(x:number)
{			
	// ---- 0     1     2 <<  
	// 0  | 0  |  1 |  2 |
	// 1  | 3  |  4 |  5 |
	// 2  | 6  |  7 |  8 |

	let a:number=-1, b:number=-1;

	if(x <= 2)
		a = 0;
	else if(x <= 5)
		a = 1;
	else if(x <= 8)
		a = 2;
	else
		console.log("getpos(x="+x+"): Erro x invalido");

	b=x;

	if(a == 1)
		b = b -3;
	if(a == 2)
		b = b - 6;

	return {a,b};
}

function jogador_atual_int(ejogador_atual:boolean)
{
	return (ejogador_atual ? 1 : 0);
}

function obterSimboloJogaodor(player:boolean)
{
	return player ? ("O") : ("X");
}

function calcular_score(tipo:string,num:number)
{
	let scored = 0;
	let jogadaspossiveis = -5;
	if(tipo == 'perdeu')
	{
		scored = parseInt(Player[num]['jogadas']) + jogadaspossiveis;		
	}
	else
	{
		scored = parseInt(Player[num]['jogadas']) - jogadaspossiveis;
	}

	return scored;
}
*/