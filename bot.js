//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EDIT THIS//

//Write here the token of the discord bot. YYou can get it here when you create a bot: https://discordapp.com/developers/applications
var DiscordBotToken = "WRITE HERE YOUR BOT DISCORD TOKEN";

/*
Getting your cookie (Chrome):
Open any Roblox page and login
Press 'Control + Shift + i' on your keyboard
Click Application
Find .ROBLOSECURITY in Cookies. Copy it's contents (Value field), which will start with _|WARNING:-DO
Put this full token, including the warning into cookieLogin: rbx.cookieLogin( tokenHere )
*/
var CookieLoginRoblox = ""; //Cookie Login from Roblox

//Write here the ids of the Discord users that will use the Bot.
var DiscordUsersID = ["ID1","ID2","ID3"]; 

//Write here the ID of the Roblox Group
var RobloxGroupID = 000000;

//END EDIT THIS//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////














//DONT EDIT THIS
const Eris = require("eris");
const rbx = require("noblox.js")


//Discord Bot
var bot = new Eris.CommandClient(DiscordBotToken, {}, { //Discord Token
	description: "Bot for Roblox's Group Management",
	owner: "Dequei#0519",
	prefix: "r!"
});
	
bot.connect(); // Get the bot to connect to Discord

var currentUser;
var Ok = false;

bot.on("ready", () => {
	console.log("Discord BOT: Ready!");
	rbx.cookieLogin(CookieLoginRoblox);
	currentUser = rbx.getCurrentUser();
	console.log("Roblox Login: Ready!");
});

bot.on("messageCreate", (msg) => // When a message is created
{
	
	for(var i = 0; i < DiscordUsersID.length; i++)
	{
		if(msg.author.id == DiscordUsersID[i])
			Ok = true;
	}

	if (msg.content.substring(0, 2) == 'r!' && Ok) {
		var args = msg.content.substring(2).split(' ');
		var cmd = args[0].toUpperCase();

		switch (cmd) {
		// r!Promote <User-ID> <Role-ID>
		case "PROMOTE":
			let group = RobloxGroupID; //ROBLOX GROUP ID
			let target = parseFloat(args[1]); //number USER-ID
			let rank = parseFloat(args[2]); //number RANK-ID or RANK-ROLESET or String RANK-NAME

			rbx.setRank(group, target, rank)
			.then(function (newRole) {
				console.log("Promoted " + target + " to " + newRole);
			})
			.catch(function (err) {
				console.log(err);
			});
			
			Ok = false;
			
			break;
		}
	}
});
