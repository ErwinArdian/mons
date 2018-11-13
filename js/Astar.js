class AStar{
	constructor(x, y, color, speed) {
        this.x = x,
        this.y = y;
        thi.
    }
	heuristic(a, b) {
        return Math.abs(a.x / size - b.x / size) + Math.abs(a.y / size - b.y / size);
	}
	
	astar(start, goal) {
        done = false;
        //clearInterval(loop);
        let current;
        var openSet = [];
        var closedSet = [];
        var path = [];

        start = canvas[ghosts[0].y / size][ghosts[0].x / size];
        goal = pacman;
        for (let i = 0; i < canvas.length; i++) {
            for (let j = 0; j < canvas[i].length; j++) {
                canvas[i][j].parent = null;
            }
        }
        start.g = 0;
        start.f = heuristic(start, goal);
        openSet.push(start);
        while (openSet.length > 0) {
            var winner = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }
            current = openSet[winner];
            if (current.x == goal.x && current.y == goal.y) {
                //console.log("DONE");

                var temp = current;
                path.push(temp);
                while (temp.parent) {
                    path.push(temp.parent);
                    temp = temp.parent;
                }

                index = path.length - 1;
                var loop = setInterval(function() {
                    if (index > 0) {
                        prev = path[index];
                        ghosts[0].x = path[index - 1].x;
                        ghosts[0].y = path[index - 1].y;
                        if (ghosts[0].x == pacman.x && ghosts[0].y == pacman.y) {
                            //console.log("lost");
                            document.querySelector(".score").innerHTML = score;
                            soundTrack.pause();
                            die.play();
							died=true;
                            clearInterval(loop);
                        }
                        ctx.clearRect(prev.x, prev.y, size, size);
                        if (prev.type == "BISCUIT") {
                            ctx.fillStyle = "#fff";
                            ctx.beginPath();
                            ctx.arc(prev.x + third, prev.y + third, 5, 0, 2 * Math.PI);
                            ctx.fill();
                        }
                        ghosts[0].draw();
                        index = index - 1;
                    } else {
                        done = true;
                        clearInterval(loop);
                    }

                }, 175);

                return;
            }
            neighbours = current.neighbours;
            closedSet.push(current);
            openSet.remove(winner);
            var neighbour;
            for (i = 0; i < neighbours.length; i++) {
                neighbour = neighbours[i];
                if (closedSet.includes(neighbour) || neighbour.type == "BARRIER") {
                    continue;
                }
                if (!openSet.includes(neighbour)) {
                    openSet.push(neighbour);
                }

                let tempG = current.g + 1
                if (tempG >= neighbours.g) {
                    continue;
                }
                neighbour.parent = current;
                neighbour.g = tempG;
                neighbour.f = neighbour.g + heuristic(neighbour, goal);
            };
        }

    }
	
	/* setInterval(function() {
        if (done) {
            astar(ghosts[0], pacman);
        }
    }, 0); */
}


    