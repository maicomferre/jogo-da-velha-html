/*
	@Arquivo: Responsável por Carregar e Gerenciar os Efeitos Sonoros;
	@Descrição: Ao adicionar o caminho do arquivo em folder_sound_effects
		torna possível executar o audio chamando-o pelo nome do arquivo;
*/


const folder_sound_effects:string[] = [
	'files/sound/error.mp3',
	'files/sound/game_click.mp3',
	'files/sound/back_sound.mp3',
	'files/sound/inicio.mp3',
	'files/sound/velha.mp3',
	'files/sound/fimjogo.mp3',
];

class Sound{
    private sound_element:HTMLAudioElement;
    public loaded:boolean = false;
    public paused:boolean = false;
	public started:boolean = false;
    public file_name:string;

    constructor(sound_path:string)
    {
        this.sound_element = new Audio();
        this.sound_element.src = sound_path;

        this.sound_element.onload = ()=>{ this.loaded=true; };
        this.sound_element.onerror = ()=>{ console.log(`[class Sound] Error loading audio ${sound_path}`); }
		this.sound_element.loop = true;

        this.file_name = sound_path.replace(/^.*[\\/]/, '');
		this.file_name = this.file_name.substr(0, this.file_name.lastIndexOf('.')) || this.file_name;
    }

    public startOnInit():void{
        this.sound_element.currentTime = 0;
        this.sound_element.play();
        this.paused = false;
		this.started = true;
    }

	public disableloop():void{
		this.sound_element.loop = false;
	}

    public pause():void{
        this.sound_element.play();
        this.paused = true;
    }
    
    public reload():void{
        this.sound_element.currentTime = 0;
        if(this.paused)
        {
            this.sound_element.play();
            this.paused = false;
        }
    }

    public resume():void{
        this.sound_element.play();
        this.paused = false;
    }

    public set settime(time:number)
    {
        this.sound_element.currentTime = time;
    }

	public get name():string
	{
		return this.file_name;
	}
}


class ControladorSom{
    private sons:Sound[]=[];
	private sons_name:string[] = [];

    constructor(root_dir:string[]){
        root_dir.forEach((value,index)=>{
            this.sons[index] = new Sound(value);
			this.sons_name[index] = this.sons[index].name;
			console.log(this.sons_name[index]);
        });
    }

	public iniciar(audio_nome:string,PausarOutros:boolean=false):void
	{
        let index:number = this.sons_name.indexOf(audio_nome);
        if(index == -1){
            console.log(`[class][ControladorSom]iniciar(${audio_nome}): invalid sound name.`);
            return;
        }

		if(PausarOutros){
			this.sons.forEach(som => {
				if(!som.paused && som.started)
					som.pause();
			});
		}

		this.sons[index].startOnInit();
	}

	public pausar(audio_nome:string)
	{
		let index:number = this.sons_name.indexOf(audio_nome);
        if(index == -1){
            console.log(`[class][ControladorSom]iniciar(${audio_nome}): invalid sound name.`);
            return;
        }
		this.sons[index].pause();
	}
};

const som = new ControladorSom(folder_sound_effects);


/*
const esom = {
	'error':      'wrong-buzzer-6268.mp3',
	'game_click': 'click-for-game-menu-131903.mp3',
	'back_sound': 'merx-market-song-33936.mp3',
	'inicio':     'angelical-pad-143276.mp3',
	'velha':      'game-over-arcade-6435.mp3',
	"fimjogo":    'cinematic-intro-6097.mp3',
};

interface sound{
	path:string,
	played:Boolean,
	stopped:Boolean,
	DOM:HTMLElement,
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
	esom.forEach(element => {
		
	});


	for(let x=0; x<lista_som.length; x++)
	{

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
				});

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


*/