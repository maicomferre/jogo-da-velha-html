"use strict";
const folder_sound_effects = [
    'files/sound/error.mp3',
    'files/sound/game_click.mp3',
    'files/sound/back_sound.mp3',
    'files/sound/inicio.mp3',
    'files/sound/velha.mp3',
    'files/sound/fimjogo.mp3',
];
class Sound {
    sound_element;
    loaded = false;
    paused = false;
    started = false;
    file_name;
    constructor(sound_path) {
        this.sound_element = new Audio();
        this.sound_element.src = sound_path;
        this.sound_element.onload = () => { this.loaded = true; };
        this.sound_element.onerror = () => { console.log(`[class Sound] Error loading audio ${sound_path}`); };
        this.sound_element.loop = true;
        this.file_name = sound_path.replace(/^.*[\\/]/, '');
        this.file_name = this.file_name.substr(0, this.file_name.lastIndexOf('.')) || this.file_name;
    }
    startOnInit() {
        this.sound_element.currentTime = 0;
        this.sound_element.play();
        this.paused = false;
        this.started = true;
    }
    disableloop() {
        this.sound_element.loop = false;
    }
    pause() {
        this.sound_element.play();
        this.paused = true;
    }
    reload() {
        this.sound_element.currentTime = 0;
        if (this.paused) {
            this.sound_element.play();
            this.paused = false;
        }
    }
    resume() {
        this.sound_element.play();
        this.paused = false;
    }
    set settime(time) {
        this.sound_element.currentTime = time;
    }
    get name() {
        return this.file_name;
    }
}
class ControladorSom {
    sons = [];
    sons_name = [];
    constructor(root_dir) {
        root_dir.forEach((value, index) => {
            this.sons[index] = new Sound(value);
            this.sons_name[index] = this.sons[index].name;
            console.log(this.sons_name[index]);
        });
    }
    iniciar(audio_nome, PausarOutros = false) {
        let index = this.sons_name.indexOf(audio_nome);
        if (index == -1) {
            console.log(`[class][ControladorSom]iniciar(${audio_nome}): invalid sound name.`);
            return;
        }
        if (PausarOutros) {
            this.sons.forEach(som => {
                if (!som.paused && som.started)
                    som.pause();
            });
        }
        this.sons[index].startOnInit();
    }
    pausar(audio_nome) {
        let index = this.sons_name.indexOf(audio_nome);
        if (index == -1) {
            console.log(`[class][ControladorSom]iniciar(${audio_nome}): invalid sound name.`);
            return;
        }
        this.sons[index].pause();
    }
}
;
const som = new ControladorSom(folder_sound_effects);
