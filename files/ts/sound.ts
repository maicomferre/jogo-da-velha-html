
var lista_som:string[] = [
	"error",
	"game_click",
	"back_sound",
	"inicio",
	"velha",
	"fimjogo",
];

var esom = {
	'error':      {'file':'wrong-buzzer-6268.mp3'},
	'game_click': {'file':'click-for-game-menu-131903.mp3'},
	'back_sound': {'file':'merx-market-song-33936.mp3'},
	'inicio':     {'file':'angelical-pad-143276.mp3'},
	'velha':      {'file':'game-over-arcade-6435.mp3'},
	"fimjogo":    {'file':'cinematic-intro-6097.mp3'},
};
var images = {
	'soundon':  { 'file': 'files/sondon.png' },
	'soundoff': { 'file': 'files/sondoff.png'},
};

//Efeitos Sonoros
var som_pasta = "files/sound/";
var estadosom = true;

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
			som[lista_som[x]]['loaded'].tocando = false;

		}

		esom[lista_som[x]]['audio'].src = som_pasta + esom[lista_som[x]]['file'];
		esom[lista_som[x]]['audio'].currentTime = 0;
	
	}
}

function som(sound:string, type:string,other?:any)
{
	if(soundoff)return false;
	if(sound == 'todos')
	{
		for(let x=0; x<lista_som.length; x++)
		{
			som(lista_som[x],type,other);
		}
		return false;
	}
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
			esom[sound]['audio'].tocando = false;			
			break;
		case 'iniciar':
			esom[sound]['audio'].play();
			esom[sound]['audio'].tocando = true;

			/*if(other !== 'loop')
				esom[sound]['audio'].on('ended', function(){
					esom[sound]['audio'].tocando = false;
				});*/

			break;
		case 'cancelar':
			esom[sound]['audio'].pause();
			esom[sound]['audio'].currentTime = 0;
			esom[sound]['audio'].tocando = false;			
			break;
		case 'reiniciar':
			esom[sound]['audio'].currentTime = 0;
			esom[sound]['audio'].play();
			esom[sound]['audio'].tocando = true;

			/*if(other !== 'loop')
				esom[sound]['audio'].on('ended', function(){
					esom[sound]['audio'].tocando = false;
				});
			*/
			break;
		default:
			console.log('som('+sound+','+type+'): switch = type inválido');
	}

	if(other == 'loop')
	{
		esom[sound]['audio'].loop = true;
	}

}

function som_gestor(acao:boolean)
{
	if(acao == false)
	{
		for(let x=0; x < lista_som.length; x++)
		{
			if(esom[lista_som[x]]['audio'].tocando === true)
			{
				tmp_gestor_som.push(lista_som[x]);
			}
		}
		som('todos','pausar');
		soundoff = true;

	}
	else if(acao == true)
	{
		soundoff = false;		
		for(let x=0; x < tmp_gestor_som.length; x++)
		{
			som(tmp_gestor_som[x],'iniciar');
		}
		tmp_gestor_som.splice(0);
	}
}

function alternarsom()
{
	let s = (soundoff ? (images['soundon']) : (images['soundoff']));
	$("#imgsom").html();
	$("#imgsom").html(s['file']);

	let t = $("#imgsom").append(s['file']);

	som_gestor(soundoff);
}

/*function somdefundo(ultimosom)
{
	
}*/


