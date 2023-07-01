/*
	Funções Secundárias. 

*/

var antidouble = false;
function showerror(msg,time=4000)
{
	if(antidouble)return;

	sound_path['error']['audio'].play();	
	$("#errormessage").html(msg);
	$("#errormessage").toggle('slow');
	antidouble = true;

	setTimeout(function(){
		$("#errormessage").toggle('slow');	
		antidouble=false;
		sound_path['error']['audio'].currentTime = 0;
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

