var TileMap = function(p_width, p_height) {
	// --- Fields ------------------------------------------------
	var width = p_width;
	var height = p_height;

	var grid = new Array(height);
	for(var y = 0; y < height; y++)
		grid[y] = new Array(width);

	// --- Getters/Setters ---------------------------------------
	this.getGrid = function() { return grid; }
	this.getWidth = function() { return width; }
	this.getHeight = function() { return height; }


	// --- Private functions -------------------------------------
	var twoDigits = function(num) {
		(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
		return num;	
	}

	// --- Public functions --------------------------------------
	this.LoadMap = function(p_chapter, p_level) {
		var str_chapter = twoDigits(p_chapter);
		var str_level = twoDigits(p_level);

		var current_stage = game.cache.getText('chapter_'+ str_chapter +'_stage_' + str_level);
		var json = JSON.parse(current_stage);
		
		var jsonWidth = json['width'];
		var jsonHeight = json['height'];
		var tm = json['tiles'];

		for(var h = 0; h < jsonHeight; h++) {
			for(var w = 0; w < jsonWidth; w++) {
				grid[h][w] = new Tile();

				// OPTIONAL TODO: Put all enum's value on an array and access it with tm[h][w]
				// TODO: Values must be constants type
				switch(tm[h][w]) {
					case 0: 
						grid[h][w].SetType(e_TileType.EMPTY); 
						break;

					case 1: 
						grid[h][w].SetType(e_TileType.ROCK);
						break;

					case 10: 
						grid[h][w].SetType(e_TileType.GB_GREEN); 
						break;

					case 11: 
						grid[h][w].SetType(e_TileType.GB_RED); 
						break;
				}
				grid[h][w].SetPosition(w, h);		
			}
		}

		// Add the gemblox
		var bloxAmount = json['gem_blox_amount'];
		gemBloxs = new Array(bloxAmount);
		for(var i = 0; i < bloxAmount; i++)
			gemBloxs[i] = new GemBlox(gemBloxArray[json['blox'][i]['color']], json['blox'][i]['x'], json['blox'][i]['y']);

		gameState = gameState_e.IN_GAME;
	}
}