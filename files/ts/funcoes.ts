

//////////////////////////////////////////q
/*
	Funções Secundárias Não Relacionadas diretamente ao jogo.

*/

function showerror(msg:string,time=4000)
{
	if(antidouble)return;

	som.iniciar('error',false);
	$("#errormessage").html(msg);
	$("#errormessage").toggle('slow');
	antidouble = true;

	setTimeout(function(){
		$("#errormessage").toggle('slow');	
		antidouble=false;
		som.iniciar("error",false);
	},time);
}

/*
function resetar(novamente=false)
{
	for(let x=0; x<3; x++)
		for(let y=0; y<3; y++)
			velha_game[x][y] = ' ';

	canvas_context.ctx.clearRect(0, 0, canvas_context.canvas.width, canvas_context.canvas.height);

	for(let z=0; z<canvas_posicao_click.length; z++)
		velha_selecionado[z] = false;
	
	write_game(canvas_context);


	jogador[0]['jogadas'] = 0;
	jogador[1]['jogadas'] = 0;

	if(novamente)
	{
		som('todos',"pausar");
		som("back_sound",'reiniciar','loop');
		$('#opt3').hide('slow');
		$('#opt2').show('fast');
		$('#opt1').hide();		
	}
}

*/
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
		let tmp = jogador_atual ? 1 : 0;
		
		let usercolor = player_color[(interval_control ? 1: 0)];

		interval_control = !interval_control;

		$('#username'+tmp).css("background-color",usercolor);
	},400);	
}


function comecar()
{	
	let player1:any = $('#player1').val;
	let player2:any = $('#player2').val;

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
	som.pausar("inicio");	

	jogador[0].nome = player1;
	jogador[1].nome = player2;

	$("#username0").text(player1)
	$("#username1").text(player2);

	$('#opt1').toggle('slow');
	$('#opt2').toggle('slow');

	setTimeout(function(){
		som.iniciar('back_sound');
	},1000);
}


function image_load()
{
	images['soundon']['img'] = new Image();

	images['soundon']['img'].onerror = function()
	{
		console.log("error image_load(): não foi possível carregar imagem; ação: ignorar");
	}

	images['soundon']['img'].src = images['soundon']['file'];

	$("#imgsom").append(images['soundon']['img']);

	images['soundoff']['img'] = new Image();

	images['soundoff']['img'].onerror = function()
	{
		console.log("error image_load(): não foi possível carregar imagem; ação: ignorar");
	}

	images['soundoff']['img'].src = images['soundoff']['file'];
}

function vencedor_pagina()
{
	som.iniciar('fimjogo');
	$('#opt3').show('slow');
	$('#opt2').hide('fast');
	$('#opt1').hide('fast');

	let win = (jogador_atual) ? 1 : 0;
	let lost = (jogador_atual) ? 0 : 1;


	$('#playerwinname').html(jogador[win].nome);
	$('#playerwinname2').html(jogador[win].nome);
	$('#playerwinscore').val(jogador[win].score );
	$('#playerwin').val(jogador[win].venceu);
	$('#playerwinlost').val(jogador[win].perdeu );
	$("#playerwintimes").val(jogador[win].jogadas )

	$('#playerlostname').html(jogador[lost].nome);
	$('#playerlostscore').val(jogador[lost].score );
	$('#playerlostwin').val(jogador[lost].venceu );
	$('#playerlostlost').val(jogador[lost].perdeu );
	$("#playerlosttimes").val(jogador[lost].jogadas )

}
