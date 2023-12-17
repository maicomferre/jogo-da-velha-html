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
        this.sound_element.pause();
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

	public get gettime():number
	{
		return this.sound_element.currentTime;
	}
}


class ControladorSom{
    private sons:Sound[]=[];
	private sons_name:string[] = [];
	public estadosom:boolean = true;

    constructor(root_dir:string[]){
        root_dir.forEach((value,index)=>{
            this.sons[index] = new Sound(value);
			this.sons_name[index] = this.sons[index].name;
        });
    }

	public iniciar(audio_nome:string,PausarOutros:boolean=true,desativarLoop=false,doinicio:boolean=false):void{
		if(!this.estadosom)return;
        let index:number = this.getIdByName(audio_nome);
        if(index == -1){
            console.log(`[class][ControladorSom]iniciar(${audio_nome}): invalid sound name.`);
            return;
        }

		if(desativarLoop)
		{
			this.sons[index].disableloop();
		}

		if(PausarOutros === true){
			this.pausarTodos();
			console.log("pauisar todos");
		}

		this.sons[index].startOnInit();
	}

	public continuar(audio_nome:string):void{
		if(!this.estadosom)return;
        let index:number = this.getIdByName(audio_nome);
        if(index == -1){
            console.log(`[class][ControladorSom]continuar(${audio_nome}): invalid sound name.`);
            return;
        }
	}

	private getIdByName(sound_name:string):number{
		return this.sons_name.indexOf(sound_name);
	}

	public pausarTodos():void
	{
		this.sons.forEach(som => {
			if(!som.paused && som.started){
				som.pause();
			}
		});
	}

	public pausar(audio_nome:string)
	{
        let index:number = this.getIdByName(audio_nome);
        if(index == -1){
            console.log(`[class][ControladorSom]pausar(${audio_nome}): invalid sound name.`);
            return;
        }
		this.sons[index].pause();
	}

	public continuarTodos():void
	{
		this.sons.forEach(som => {
			if(som.paused && som.started && som.gettime != 0)
				som.resume();
		});
	}

	public desativarSom():void
	{
		this.estadosom = false;
		this.pausarTodos();
	}
	public ativarSom():void
	{
		if(!this.estadosom)
		{
			this.estadosom = true;
			this.continuarTodos();
		}
	}
};

