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



function sound_load()
{
	for(let x=0; x<sound_list.length; x++)
	{
		if(sound_path[sound_list[x]]['file'] == undefined)
		{
			console.log("error sound_load(): sound_path[sound_list["+x+"]]['file'] is undefined");
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
		}

		sound_path[sound_list[x]]['audio'].onload = function()
		{
			sound_path[sound_list[x]]['loaded'] = true;
		}

		sound_path[sound_list[x]]['audio'].src = path + sound_path[sound_list[x]]['file'];
		sound_path[sound_list[x]]['audio'].currentTime = 0;
	
	}
}

function resetar()
{
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