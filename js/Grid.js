function Grid(row, collumn){
	//draw map
    this.rows = row;
    this.columns = collumn;
    //buat besar array sebanyak x
    this.tiles = new Array(this.rows);
    // x dianggap baris
    for(var x = 0; x < this.rows; x ++){
        // buat besar array x sebanyak y
        this.tiles[x] = new Array(this.columns);
        //y dianggap kolom
        for (var y = 0; y < this.columns; y++) {
            this.tiles[x][y] = {
                f : 0,
                g : 0,
                h : 0,
                x : 0,
                y : 0,
                neighbours : [],
                parent : null,
                type : 0 
            };
        }
    }

    //set title manual :V
    //set jadi 1 artinya jalan
    this.tiles[9][12].type = 1;
    this.tiles[9][15].type = 1;
    this.tiles[10][12].type = 1;
    this.tiles[10][15].type = 1;
    this.tiles[11][9].type = 1;
    this.tiles[11][10].type = 1;
    this.tiles[11][11].type = 1;
    this.tiles[11][12].type = 1;
    this.tiles[11][13].type = 1;
    this.tiles[11][14].type = 1;
    this.tiles[11][15].type = 1;
    this.tiles[11][16].type = 1;
    this.tiles[11][17].type = 1;
    this.tiles[11][18].type = 1;
    this.tiles[12][9].type = 1;
    this.tiles[12][18].type = 1;
    this.tiles[13][9].type = 1;
    this.tiles[13][18].type = 1;
    this.tiles[14][0].type = 1;
    this.tiles[14][1].type = 1;
    this.tiles[14][2].type = 1;
    this.tiles[14][3].type = 1;
    this.tiles[14][4].type = 1;
    this.tiles[14][5].type = 1;
    this.tiles[14][7].type = 1;
    this.tiles[14][8].type = 1;
    this.tiles[14][9].type = 1;
    this.tiles[14][19].type = 1;
    this.tiles[14][20].type = 1;
    this.tiles[14][22].type = 1;
    this.tiles[14][23].type = 1;
    this.tiles[14][24].type = 1;
    this.tiles[14][25].type = 1;
    this.tiles[14][26].type = 1;
    this.tiles[14][27].type = 1;
    this.tiles[15][9].type = 1;
    this.tiles[15][18].type = 1;
    this.tiles[16][9].type = 1;
    this.tiles[16][18].type = 1;
    this.tiles[17][9].type = 1;
    this.tiles[17][10].type = 1;
    this.tiles[17][11].type = 1;
    this.tiles[17][12].type = 1;
    this.tiles[17][13].type = 1;
    this.tiles[17][14].type = 1;
    this.tiles[17][15].type = 1;
    this.tiles[17][16].type = 1;
    this.tiles[17][17].type = 1;
    this.tiles[17][18].type = 1;
    this.tiles[18][9].type = 1;
    this.tiles[18][18].type = 1;
    this.tiles[19][9].type = 1;
    this.tiles[19][18].type = 1;
    this.tiles[23][13].type = 1;
    this.tiles[23][14].type = 1;    


    console.log(this.tiles);
}

this.draw = function (){

}