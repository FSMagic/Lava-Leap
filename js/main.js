// blastem.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.keydown = [];

app.main = {
	// CONSTANT properties
    WIDTH : 1920 ,
    HEIGHT: 1080, 
	PLATFORM_DIFFERENCE: 200,
	dt: 1/60.0,
	aspectRatio: undefined,
    canvas: undefined,
    ctx: undefined,
	players: [],
	colors: ["green", "red", "blue", "purple"],
	platforms1: [],
	platforms2: [],
	platforms3: [],
	platformArrays: [],
	startPlatform: undefined,
	gamestate: undefined,
	ticks: 0,
	speed: 150,
	drawLib:undefined,
    
    // methods
	init : function() {
		// declare properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		
		this.ctx.textAlign = 'center';
		
		this.drawLib= app.drawLib;
		
		//get connected gamepads
		var pad = navigator.getGamepads();
		var numPlayers = 0;
		for(var i = 0; i < pad.length; i++)
		{
			if(pad[i] != undefined)
			{
				numPlayers += 1;
			}
		}
		if(numPlayers < 2) numPlayers = 2;
		
		//loop through and create a player for each gamepad
		for(var i = 0; i < numPlayers; i++)
		{
			this.players.push(new Player(this.WIDTH * (i+1)/(numPlayers+1), 500, this.colors[i], i));
		}
		/*for(var i = 2; i < numPlayers; i++){
			
			if(pad[i] != undefined){
			
				this.players.push(new Player(this.WIDTH * (i+1)/(numPlayers+!), 500, this.colors[i], i));
			}
		}*/
		
		console.log(navigator.getGamepads());
		this.platformArrays.push(this.platforms1);
		this.platformArrays.push(this.platforms2);
		this.platformArrays.push(this.platforms3);
		for(var i = 0; i < this.platformArrays.length; i++)
		{
			var pwidth = Math.random() * 200 + 75;
			var px = Math.random() * (this.WIDTH - pwidth);
			this.platformArrays[i].push(new app.Platform(pwidth, px));
		}
		this.startPlatform = new app.Platform(this.WIDTH, 0);
		this.startPlatform.y = this.HEIGHT * 3/5;
			
		this.gamestate = "Main";
		this.update();
	},
		
	draw: function()
	{
			var width = this.WIDTH;
			var height = this.HEIGHT;
		var pad = navigator.getGamepads();
		
		if(this.gamestate == "Main"){
		
			//player1
			if(pad[0] != undefined ){
				this.drawLib.outRect(this.ctx,0,0,width/4,height,'#063B08','#000F01');
				this.drawLib.text(this.ctx,'1',100,220,300,'#00E604');
			}
			else{
				this.drawLib.outRect(this.ctx,0,0,width/4,height,'#595959','#2E2E2E');
				this.drawLib.text(this.ctx,'1',100,220,300,'#878787');
				this.drawLib.rect(this.ctx, width/8 - 37.5, 450, 75, 75, '#878787');
				this.drawLib.rect(this.ctx, width/8 - 37.5, 526, 75, 75, '#878787');
				this.drawLib.rect(this.ctx, width/8 - 113.5, 526, 75, 75, '#878787');
				this.drawLib.rect(this.ctx, width/8 + 38.5, 526, 75, 75, '#878787');
				this.drawLib.text(this.ctx,'W',width/8,495,50,'#000000');
				this.drawLib.text(this.ctx,'Jump',width/8,515,20,'#000000');
				this.drawLib.text(this.ctx,'S',width/8,571,50,'#000000');
				this.drawLib.text(this.ctx,'A',width/8 - 76,571,50,'#000000');
				this.drawLib.text(this.ctx,'Left',width/8 - 76,591,20,'#000000');
				this.drawLib.text(this.ctx,'D',width/8 + 76,571,50,'#000000');
				this.drawLib.text(this.ctx,'Right',width/8 + 76,591,20,'#000000');
			}
			//player2
			if(pad[1] != undefined){
				this.drawLib.outRect(this.ctx,width/4,0,width/4,height,'#730000','#380D0D');
				this.drawLib.text(this.ctx,'2',width/4 +100,220,300,'#FF0000');
			}
			else{
				this.drawLib.outRect(this.ctx,width/4,0,width/4,height,'#595959','#2E2E2E');
				this.drawLib.text(this.ctx,'2',width/4 +100,220,300,'#878787');
				this.drawLib.rect(this.ctx, width*3/8 - 37.5, 450, 75, 75, '#878787');
				this.drawLib.rect(this.ctx, width*3/8 - 37.5, 526, 75, 75, '#878787');
				this.drawLib.rect(this.ctx, width*3/8 - 113.5, 526, 75, 75, '#878787');
				this.drawLib.rect(this.ctx, width*3/8 + 38.5, 526, 75, 75, '#878787');
				this.drawLib.text(this.ctx,'8',width*3/8,495,50,'#000000');
				this.drawLib.text(this.ctx,'Jump',width*3/8,515,20,'#000000');
				this.drawLib.text(this.ctx,'5',width*3/8,571,50,'#000000');
				this.drawLib.text(this.ctx,'4',width*3/8 - 76,571,50,'#000000');
				this.drawLib.text(this.ctx,'Left',width*3/8 - 76,591,20,'#000000');
				this.drawLib.text(this.ctx,'6',width*3/8 + 76,571,50,'#000000');
				this.drawLib.text(this.ctx,'Right',width*3/8 + 76,591,20,'#000000');
				this.drawLib.text(this.ctx,'(make sure NUM LOCK is on)',width*3/8,625,25,'#000000');
			}
			//player3
			if(pad[2] != undefined){
				this.drawLib.outRect(this.ctx,width/2,0,width/4,height,'blue','#000012');
				this.drawLib.text(this.ctx,'3',width/2 +100,220,300,'#5258F2');
			}
			else{
				this.drawLib.outRect(this.ctx,width/2,0,width/4,height,'#595959','#2E2E2E');
				this.drawLib.text(this.ctx,'3',width/2 +100,220,300,'#878787');
			} 
			//player4
			if(pad[3] != undefined){
				this.drawLib.outRect(this.ctx,width - width/4,0,width/4,height,'purple','#120011');
				this.drawLib.text(this.ctx,'4',width - width/4 +100,220,300,'#FA6EF8');
			}
			else{
				this.drawLib.outRect(this.ctx,width - width/4,0,width/4,height,'#595959','#2E2E2E');
				this.drawLib.text(this.ctx,'4',width - width/4 +100,220,300,'#878787');
			}
			
			if(pad[0] != undefined){
				this.drawLib.Shadowrect(this.ctx,0,height/2 + 100,width,100, '#fff');
				this.drawLib.text(this.ctx,"Press any button on your controller to join and  [p] to Play!",width/2, height/2 + 165, 50, '#000');
			}
		
		}
		if(this.gamestate == "GAME"){
		
			this.ctx.save();
			this.ctx.fillStyle = "white";
			this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
			this.ctx.restore();
			if(this.startPlatform.active)
			{
				this.startPlatform.draw(this.ctx);
			}
			for(var j = 0; j < this.platformArrays.length; j++)
			{
				var platforms = this.platformArrays[j];
				for(var i = 0; i < platforms.length; i++)
				{
					platforms[i].draw(this.ctx, 1);
				}
			}
			//loop through and draw the players
			for(var i = 0; i < this.players.length; i++){
				
				this.players[i].draw(this.ctx);
			}
		}
	},
	
	checkCollosions: function()
	{
		for(var i = 0; i < this.players.length; i++)
		{
			var player = this.players[i];
			player.canJump =  false;
			for(var j = 0; j < this.platformArrays.length; j++)
			{
				var platforms = this.platformArrays[j];
				for(var k = 0; k < platforms.length; k++)
				{
					var platform = platforms[k];
					if(player.y + player.height >= platform.y && player.prevy + player.height <= platform.y)
					{
						//console.log("110");
						var xdiff = player.x - player.prevx;
						var ydiff = player.y - player.prevy;
						var pct = (platform.y - player.prevy) / ydiff;
						//if((player.x + (pct * xdiff) >= platform.x && player.x + (pct * xdiff) <= platform.x + platform.width) ||
						//	(player.x + player.width + (pct * xdiff) >= platform.x && player.x + player.width + (pct * xdiff) <= platform.x + platform.width))
						if((player.x >= platform.x && player.x <= platform.x + platform.width) ||
							(player.x + player.width >= platform.x && player.x + player.width <= platform.x + platform.width))
						{
							//player.x = player.prevx + pct * xdiff;
							player.y = player.prevy - player.height + pct * ydiff;
							player.yVelocity = this.speed;
							player.canJump = true;
							player.canHoldJump = true;
						}
					}
				}
			}
			if(this.startPlatform.active)
			{
				var platform = this.startPlatform;
				if(player.y + player.height >= platform.y && player.prevy + player.height <= platform.y)
				{
					var xdiff = player.x - player.prevx;
					var ydiff = player.y - player.prevy;
					var pct = (platform.y - player.prevy) / ydiff;
					//if((player.x + (pct * xdiff) >= platform.x && player.x + (pct * xdiff) <= platform.x + platform.width) ||
					//	(player.x + player.width + (pct * xdiff) >= platform.x && player.x + player.width + (pct * xdiff) <= platform.x + platform.width))
					if((player.x >= platform.x && player.x <= platform.x + platform.width) ||
						(player.x + player.width >= platform.x && player.x + player.width <= platform.x + platform.width))
					{
						//player.x = player.prevx + pct * xdiff;
						player.y = player.prevy - player.height + pct * ydiff;
						player.yVelocity = this.speed;
						player.canJump = true;
						player.canHoldJump = true;
					}
				}
			}
			for(var j = 0; j < this.players.length; j++)
			{
				var player2 = this.players[j];
				if(player != player2)
				{
					if(player.y + player.height >= player2.y && player.prevy + player.height <= player2.prevy)
					{
						var xdiff = player.x - player.prevx;
						var ydiff = player.y - player.prevy;
						var pct = (player2.y - player.prevy) / ydiff;
						if((player.x >= player2.x && player.x <= player2.x + player2.width) ||
							(player.x + player.width >= player2.x && player.x + player.width <= player2.x + player2.width))
						{
							player.yVelocity = -800;
							player2.yVelocity = 800;
						}
					}
					if(player.x + player.width >= player2.x && player.prevx + player.width <= player2.prevx)
					{
						var xdiff = player.x - player.prevx;
						var ydiff = player.y - player.prevy;
						var pct = (player2.y - player.prevy) / ydiff;
						if((player.y >= player2.y && player.y <= player2.y + player2.height) ||
							(player.y + player.height >= player2.y && player.y + player.height <= player2.y + player2.height))
						{
							player.x = player2.x - player.width;
							player.xVelocity = 0;
							player2.xVelocity = 0;
						}
					}
				}
			}
		}
	},
	
	update: function()
	{
		requestAnimationFrame(this.update.bind(this));
		
		if(this.gamestate == "Main"){
			if(app.keydown[80]){
				this.gamestate = "GAME";
				
				console.log(this.gamestate);
			}
		
		}
		
		if(this.gamestate == "GAME" )
		{
			//loop through and update the players
			this.ticks++;
			for(var i = 0; i < this.players.length; i++){
				
				this.players[i].update(this.dt);
				while(this.players[i].y < 200)
				{
					for(var j = 0; j < this.players.length; j++)
					{
						this.players[j].y += 1;
					}
					for(var j = 0; j < this.platformArrays.length; j++)
					{
						var platforms = this.platformArrays[j];
						for(var k = 0; k < platforms.length; k++)
						{
							platforms[k].y += 1;
						}
					}
					if(this.startPlatform.active)
					{
						this.startPlatform.y += 1;
					}
				}
			}
		
			if(this.platforms1[0].y + this.PLATFORM_DIFFERENCE > this.startPlatform.y && this.startPlatform.active)
			{
				this.startPlatform.update(this.dt, this.speed);
			}

			for(var j = 0; j < this.platformArrays.length; j++)
			{
				var platforms = this.platformArrays[j];
				var highest = this.HEIGHT;
				var highestindex = 0;
				for(var i = 0; i < platforms.length; i++)
				{
					if(highest > platforms[i].y)
					{
						highest = platforms[i].y;
						highestindex = i;
					}
					platforms[i].update(this.dt, this.speed);
				}
				if(highest > this.PLATFORM_DIFFERENCE)//this.PLATFORM_DIFFERENCE = 200
				{
					var pwidth = Math.random() * 200 + 75;
					var px = Math.random() * 1000 + platforms[highestindex].x - 500;
					if(px + pwidth > this.WIDTH)
					{
						var diff =  px + pwidth - this.WIDTH;
						px -= 2 * diff;
					}
					if(px < 0)
					{
						px = -px;
					}
					platforms.push(new app.Platform(pwidth, px));
				}
				platforms = platforms.filter(function(platform)
				{
					return platform.active;
				});
			}
			//console.log(this.platforms1.length + " " + this.platforms2.length);
		}//END gamestate = "GAME"
		
		var numactive = 0;
		var winner = -1;
		for(var i = 0; i < this.players.length; i++)
		{
			if(this.players[i].active)
			{
				numactive+=1;
				winner = i;
			}
		}
		if(numactive == 1)
		{
			window.alert("Player " + (winner + 1) + " Wins!");
			location.reload();
		}
		if(numactive == 0)
		{
			window.alert("You all lose");
			location.reload();
		}
		
		this.checkCollosions()
		this.draw();
	},
	
    
    
};

window.onload = function() {
	console.log("init called");
	
	window.addEventListener("keydown", function(e){
		//console.log("keydown " + e.keyCode);
		app.keydown[e.keyCode] = true;
	});
	
	window.addEventListener("keyup", function(e){
		//console.log("keyup");
		app.keydown[e.keyCode] = false;
	});
	
	app.main.init();
}
