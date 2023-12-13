

//////////////////////////////////////////q
/*
	Funções Secundárias Não Relacionadas diretamente ao jogo.

*/
/*
function showerror(msg:string,time=4000)
{
	if(antidouble)return;

	som('error','iniciar');
	$("#errormessage").html(msg);
	$("#errormessage").toggle('slow');
	antidouble = true;

	setTimeout(function(){
		$("#errormessage").toggle('slow');	
		antidouble=false;
		som("error",'reiniciar');
	},time);
}


function resetar(novamente=false)
{
	for(let x=0; x<3; x++)
		for(let y=0; y<3; y++)
			velha_game[x][y] = ' ';

	canvas_context.ctx.clearRect(0, 0, canvas_context.canvas.width, canvas_context.canvas.height);

	for(let z=0; z<canvas_posicao_click.length; z++)
		velha_selecionado[z] = false;
	
	write_game(canvas_context);


	Player[0]['jogadas'] = 0;
	Player[1]['jogadas'] = 0;

	if(novamente)
	{
		som('todos',"pausar");
		som("back_sound",'reiniciar','loop');
		$('#opt3').hide('slow');
		$('#opt2').show('fast');
		$('#opt1').hide();		
	}
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
	som("inicio","pausar");	

	Player[0] = {};
	Player[0]['nome'] = player1;
	Player[0]['score'] = 0;
	Player[0]['venceu'] = 0;
	Player[0]['perdeu'] = 0;
	Player[0]['jogadas'] = 0;

	Player[1] = {};
	Player[1]['nome'] = player2;
	Player[1]['score'] = 0;
	Player[1]['venceu'] = 0;
	Player[1]['perdeu'] = 0;
	Player[1]['jogadas'] = 0;


	$("#username0").text(player1)
	$("#username1").text(player2);

	$('#opt1').toggle('slow');
	$('#opt2').toggle('slow');

	setTimeout(function(){
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
	som('todos',"pausar");
	som('fimjogo',"reiniciar");
	$('#opt3').show('slow');
	$('#opt2').hide('fast');
	$('#opt1').hide('fast');

	let win = (jogador_atual) ? 1 : 0;
	let lost = (jogador_atual) ? 0 : 1;


	$('#playerwinname').html(Player[win]['nome']);
	$('#playerwinname2').html(Player[win]['nome']);
	$('#playerwinscore').html(Player[win]['score'] );
	$('#playerwin').html(Player[win]['venceu'] );
	$('#playerwinlost').html(Player[win]['perdeu'] );
	$("#playerwintimes").html(Player[win]['jogadas'] )

	$('#playerlostname').html(Player[lost]['nome']);
	$('#playerlostscore').html(Player[lost]['score'] );
	$('#playerlostwin').html(Player[lost]['venceu'] );
	$('#playerlostlost').html(Player[lost]['perdeu'] );
	$("#playerlosttimes").html(Player[lost]['jogadas'] )

}
*/