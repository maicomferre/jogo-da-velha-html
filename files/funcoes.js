

//////////////////////////////////////////q
/*
	Funções Secundárias Não Relacionadas diretamente ao jogo.

*/

function showerror(msg,time=4000)
{
	if(antidouble)return;

	som('error','iniciar');
	$("#errormessage").html(msg);
	$("#errormessage").toggle('slow');
	antidouble = true;

	setTimeout(function(){
		$("#errormessage").toggle('slow');	
		antidouble=false;
		som['error']['audio'].currentTime = 0;
	},time);
}


function resetar()
{
	for(let x=0; x<3; x++)
		for(let y=0; y<3; y++)
			velha_game[x][y] = ' ';

	canvas_context.ctx.clearRect(0, 0, canvas_context.canvas.width, canvas_context.canvas.height);

	for(let z=0; z<canvas_posicao_click.length; z++)
		velha_selecionado[z] = false;
	
	write_game(canvas_context);
}




function voltar_ao_menu()
{
	$('#opt1').toggle('slow');
	$('#opt2').toggle('slow');	
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
		
		let usercolor = player_color[interval_control];

		interval_control = !interval_control;

		$('#username'+tmp).css("background-color",usercolor);
	},400);	
}


function comecar()
{	
	var player1 = document.getElementById('player1').value;
	var player2 = document.getElementById('player2').value;

	if(player1.length < 3)
	{
		showerror("Por favor, preencha pelo menos 3 caracteres no primeiro usuario.");
		return false;
	}
	if(player2.length < 3)
	{
		showerror("Por favor, preencha pelo menos 3 caracteres no segundo usuario.");
		return false;
	}	

	if(player1.length > 15)
	{
		showerror("Por favor, preencha no máximo 15 caracteres no primeiro usuario.");
		return false;
	}
	if(player2.length > 15)
	{
		showerror("Por favor, preencha no máximo 15 caracteres no segundo usuario.");
		return false;
	}		
	som("inicio","pausar");	

	Player[0] = {};
	Player[0]['nome'] = player1;
	Player[0]['score'] = 0;
	Player[0]['venceu'] = 0;
	Player[0]['perdeu'] = 0;

	Player[1] = {};
	Player[1]['nome'] = player2;
	Player[1]['score'] = 0;
	Player[1]['venceu'] = 0;
	Player[1]['perdeu'] = 0;

	$("#username0").text(player1)
	$("#username1").text(player2);

	$('#opt1').toggle('slow');
	$('#opt2').toggle('slow');

	/*for(let x=0; x<3; x++)
		for(let y=0; y<3; y++)
			velha_game[x,y] = ' ';*/

	setTimeout(function(){

		//som['back_sound']['audio'].play();
		som('back_sound','iniciar');

	},3000);
}



function image_load()
{
	images['soundon']['img'] = new Image();

	images['soundon']['img'].onerror = function()
	{
		console.log("error image_load(): não foi possível carregar imagem; ação: ignorar");
	}

	images['soundon']['img'].src = images['soundon']['file'];

	document.getElementById("imgsom").appendChild(images['soundon']['img']);

	images['soundoff']['img'] = new Image();

	images['soundoff']['img'].onerror = function()
	{
		console.log("error image_load(): não foi possível carregar imagem; ação: ignorar");
	}

	images['soundoff']['img'].src = images['soundoff']['file'];
}



function vencedor_pagina()
{
	som('todos',"pausar");
	som('fimjogo',"reiniciar");
	$('#opt3').show('slow');
	$('#opt2').hide('fast');
	$('#opt1').hide('fast');


	$('#playerwin').html(Player[((jogador_atual) ? 1 : 0)]['nome']);
	$('#playerlost').html(Player[(jogador_atual) ? 0 : 1]['nome']);

	$('#player1score').html(Player[0]['score'] );
	$('#player1win').html(Player[0]['venceu'] );
	$('#player1lost').html(Player[0]['perdeu'] );
	$('#player1name').html(Player[0]['nome'] );

	$('#player2score').html(Player[1]['score'] );
	$('#player2win').html(Player[1]['venceu'] );
	$('#player2lost').html(Player[1]['perdeu'] );
	$('#player2name').html(Player[1]['nome'] );
}
