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
	canvas_context.ctx.clearRect(0, 0, canvas_context.canvas.width, canvas_context.canvas.height);

	for(let z=0; z<canvas_posicao_click.length; z++)
		velha_selecionado[z] = false;
	
	write_game(canvas_context);
}


