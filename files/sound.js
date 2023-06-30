
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

function som(sound, type)
{
	if(sound_path[sound] === undefined)
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
			sound_path[sound]['audio'].pause();
			
			break;
		case 'iniciar':
			sound_path[sound]['audio'].play();
			break;
		case 'cancelar':
			sound_path[sound]['audio'].pause();
			sound_path[sound]['audio'].currentTime = 0;
			break;
		case 'reiniciar':
			sound_path[sound]['audio'].currentTime = 0;
			sound_path[sound]['audio'].play();
			break;
		default:
			console.log('som('+sound+','+type+'): switch = type inválido');
	}
	
}

function somdefundo(ultimosom)
{
	
}