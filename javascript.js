var Player = [0,1];

/*
$(document).ready(function(){
    

});
*/
function comecar()
{
	var player1 = document.getElementById('player1').value;
	var player2 = document.getElementById('player2').value;

	if(player1.length < 3)
	{
		alert("Por favor, preencha pelo menos 3 caracteres no primeiro usuario.");
		return false;
	}
	if(player1.length < 3)
	{
		alert("Por favor, preencha pelo menos 3 caracteres no segundo usuario.");
		return false;
	}	

	if(player1.length > 15)
	{
		alert("Por favor, preencha no máximo 15 caracteres no primeiro usuario.");
		return false;
	}
	if(player1.length > 15)
	{
		alert("Por favor, preencha no máximo 15 caracteres no segundo usuario.");
		return false;
	}		

	Player[0]['nome'] = player1;
	Player[0]['score'] = 0;
	Player[0]['venceu'] = 0;
	Player[0]['perdeu'] = 0;

	Player[1]['nome'] = player2;
	Player[1]['score'] = 0;
	Player[1]['venceu'] = 0;
	Player[1]['perdeu'] = 0;

	$('#opt1').toggle('slow');
	$('#opt2').toggle('slow');
}

function voltar_ao_menu()
{
	$('#opt1').toggle('slow');
	$('#opt2').toggle('slow');	
}