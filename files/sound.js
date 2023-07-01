
function sound_load()
{
	for(let x=0; x<lista_som.length; x++)
	{
		if(esom[lista_som[x]]['file'] == undefined)
		{
			console.log("error sound_load(): som[lista_som["+x+"]]['file'] is undefined");
		}
		esom[lista_som[x]]['loaded'] = false;

		if(new window.Audio() === undefined)
		{
			console.log("Error window.Audio(): Indefinido");
			return false;
		}

		esom[lista_som[x]]['audio'] = new Audio();


		esom[lista_som[x]]['audio'].onerror = function()
		{
			console.log("error sound_load(): não foi possivel carregar o audio; ação: ignorando.");
		}


		esom[lista_som[x]]['audio'].onload = function()
		{
			som[lista_som[x]]['loaded'] = true;
		}

		esom[lista_som[x]]['audio'].src = som_pasta + esom[lista_som[x]]['file'];
		esom[lista_som[x]]['audio'].currentTime = 0;
	
	}
}

function som(sound, type)
{
	if(esom[sound] === undefined)
	{
		console.log('som('+sound+','+type+'): sound indefinido; Ação: cancelar.');
		return false;
	}
	
	if(type != 'pausar' && type != 'iniciar' && type != 'cancelar' && type != 'reiniciar')
	{
		console.log('som('+sound+','+type+'): type inválido; Ação: cancelar.');
		return false;
	}
	
	switch(type)
	{
		case 'pausar':
			esom[sound]['audio'].pause();
			
			break;
		case 'iniciar':
			esom[sound]['audio'].play();
			break;
		case 'cancelar':
			esom[sound]['audio'].pause();
			esom[sound]['audio'].currentTime = 0;
			break;
		case 'reiniciar':
			esom[sound]['audio'].currentTime = 0;
			esom[sound]['audio'].play();
			break;
		default:
			console.log('som('+sound+','+type+'): switch = type inválido');
	}
	
}



function alternarsom()
{
	estadosom = !estadosom;

	let s = undefined;
	s = (estadosom ? (images['soundon']) : (images['soundoff']));
	$("#imgsom").html();
	$("#imgsom").html(s['img']);

	document.getElementById("imgsom").appendChild(s['img']);

}

function somdefundo(ultimosom)
{
	
}


