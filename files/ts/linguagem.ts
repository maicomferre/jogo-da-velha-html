


var langs = ['pt-br', 'en'];

var lang = [];


var language_path = 'files/lang/';
var lang_file = '{file}.lang';

function carregar()
{
	for(let x=0; x<langs.length; x++)
	{
		/*$.ajax({
			method:'get',
			url:language_path + (lang_file.replace("{file}", langs[x])),

			success: function(x){
				//for()
			},

			faill:function(x){
				console.log("carregar_linguagens(): Não foi possível carregar a linguagem "+langs[x]+' por '+x);
			}
		});*/
	}
}