"use strict";
function showerror(msg, time = 4000) {
    if (antidouble)
        return;
    som.iniciar('error', false, true);
    $("#errormessage").html(msg);
    $("#errormessage").toggle('slow');
    antidouble = true;
    setTimeout(function () {
        $("#errormessage").toggle('slow');
        antidouble = false;
    }, time);
}
function resetar(novamente = false) {
    for (let x = 0; x < 3; x++)
        for (let y = 0; y < 3; y++)
            velha_game[x][y] = ' ';
    canvas_context.ctx.clearRect(0, 0, canvas_context.canvas.width, canvas_context.canvas.height);
    write_game(canvas_context);
    jogador[0]['jogadas'] = 0;
    jogador[1]['jogadas'] = 0;
    if (novamente) {
        som.iniciar("back_sound");
        $('#opt3').hide('slow');
        $('#opt2').show('fast');
        $('#opt1').hide();
    }
}
function voltar_ao_menu() {
    $('#opt1').toggle('slow');
    $('#opt2').toggle('slow');
}
function init_playercolor() {
    if (playerinterval != null) {
        clearInterval(playerinterval);
        let tmp = !jogador_atual ? "1" : "0";
        $('#username' + tmp).css("background-color", 'transparent');
    }
    playerinterval = setInterval(function () {
        let tmp = jogador_atual ? 1 : 0;
        let usercolor = player_color[(interval_control ? 1 : 0)];
        interval_control = !interval_control;
        $('#username' + tmp).css("background-color", usercolor);
    }, 400);
}
function comecar() {
    let value = document.getElementById('player1');
    jogador[0].nome = value.value;
    value = document.getElementById('player2');
    jogador[1].nome = value.value;
    if (jogador[0].nome.length < 3) {
        showerror("Por favor, preencha pelo menos 3 caracteres no primeiro usuario.");
        return false;
    }
    if (jogador[1].nome.length < 3) {
        showerror("Por favor, preencha pelo menos 3 caracteres no segundo usuario.");
        return false;
    }
    if (jogador[0].nome.length > 15) {
        showerror("Por favor, preencha no máximo 15 caracteres no primeiro usuario.");
        return false;
    }
    if (jogador[1].nome.length > 15) {
        showerror("Por favor, preencha no máximo 15 caracteres no segundo usuario.");
        return false;
    }
    som.pausar("inicio");
    $("#username0").text(jogador[0].nome);
    $("#username1").text(jogador[1].nome);
    $('#opt1').toggle('slow');
    $('#opt2').toggle('slow');
    setTimeout(function () {
        som.iniciar('back_sound');
    }, 1000);
}
function vencedor_pagina() {
    som.iniciar('fimjogo', true, true, true);
    $('#opt3').show('slow');
    $('#opt2').hide('fast');
    $('#opt1').hide('fast');
    let win = (jogador_atual) ? 1 : 0;
    let lost = (jogador_atual) ? 0 : 1;
    $('#playerwinname').html(jogador[win].nome);
    $('#playerwinname2').html(jogador[win].nome);
    $('#playerwinscore').val(jogador[win].score);
    $('#playerwin').val(jogador[win].venceu);
    $('#playerwinlost').val(jogador[win].perdeu);
    $("#playerwintimes").val(jogador[win].jogadas);
    $('#playerlostname').html(jogador[lost].nome);
    $('#playerlostscore').val(jogador[lost].score);
    $('#playerlostwin').val(jogador[lost].venceu);
    $('#playerlostlost').val(jogador[lost].perdeu);
    $("#playerlosttimes").val(jogador[lost].jogadas);
}
