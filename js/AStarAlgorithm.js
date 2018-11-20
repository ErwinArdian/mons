function AStarAlgoritm (map, start, goal){
	//main parameter class
	this.map = map;
	this.lastCheckedNode = start;

	this.openSet = [];
	this.openSet.push(start);

	this.closedSet = [];

	this.start = start;
	this.goal = goal;

	//function this class
	this.heuristic = function (a,b) {
		var distance = Math.Abs(a.x - b.x) + Math.Abs(a.y - b.y);
		return distance;
	}

	this.removeFromArray = function (index, array){
		var obj = array.indexOf(index);
		array.splice(obj);
	}

	this.searchAStar = function (star, goal){

		if(this.openSet.length > 0){

			var winner = 0;
			for(var x = 1; x < this.openSet.length; x++){
				
				if(this.openSet[x].f < this.openSet[winner].f){
					winner = x;
				}

				if(this.openSet[x].f === this.openSet[winner].f){
					if(this.openSet[x].g < this.openSet[winner].g){
						winner = x;
					}
				}

			}

		} else{

		}

	}
}