	
	;
	var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { window.setTimeout(callback, (1000/60)); };
	
	Math.constructor.prototype.sec = function(val) {
		return 1 / Math.cos(val);
	};
	
	var	canvas_bg = document.getElementById('canvas_bg');
	var	canvas = document.getElementById('canvas');
	
	if(canvas_bg.getContext && canvas.getContext) {
		var context_bg	= canvas_bg.getContext("2d");
		var context		= canvas.getContext("2d");
		
		var angle_at = 0;
		
		var trigs = {
			'cos':	[],
			'sin':	[],
		};
		
		var polygon = {
			'circle':	{
				'center':	{'x': 75.5, 'y': 75.5},
				'radius':	56,
				'color':	"#f00",
				'color_light':	"#e88",
				'angles':	[]
			},
			'square':	{
				'center':	{'x': 75.5, 'y': 225.5},
				'radius':	56,
				'color':	"#00f",
				'color_light':	"#88e",
				'angles':	[]
			},
			'hexagon':	{
				'center':	{'x': 75.5, 'y': 375.5},
				'radius':	56,
				'color':	"#0c0",
				'color_light':	"#8e8",
				'angles':	[]
			}
		};
		
		var vertical_line_x = 150;
		
		
		// Calculate angles
		(function() {
			var x = 0;
			var y = 0;
			
			// Circle
			for(var i = 0; i <= 359; i++) {
				x = ((polygon.circle.radius * Math.cos( i * Math.PI / 180 )) + polygon.circle.center.x);
				y = ((polygon.circle.radius * Math.sin( i * Math.PI / 180 )) + polygon.circle.center.y);
				
				polygon.circle.angles[i] = {
					'x':	x,
					'y':	y
				};
			}
			
			// Square
			for(var i = 0; i <= 359; i++) {
				if(i >= 45 && i <= 135) {
					y = polygon.square.center.y + polygon.square.radius;
					
					if(i <= 90) {
						x = polygon.square.center.x - (polygon.square.radius / Math.tan( -1 * i * Math.PI / 180 ));
					} else {
						x = polygon.square.center.x + (polygon.square.radius / Math.tan(  1 * i * Math.PI / 180 ));
					}
				} else if(i >= 225 && i <= 315) {
					x = (polygon.square.center.x - polygon.square.radius);
					y = polygon.square.center.y - polygon.square.radius;
					
					if(i < 270) {
						x = polygon.square.center.x + (polygon.square.radius / Math.tan( -1 * i * Math.PI / 180 ));
					} else {
						x = polygon.square.center.x - (polygon.square.radius / Math.tan(  1 * i * Math.PI / 180 ));
					}
				}
				
				
				if(i < 45) {
					x = (polygon.square.center.x + polygon.square.radius);
					y = polygon.square.center.y - (polygon.square.radius * Math.tan( -1 * i * Math.PI / 180 ));
				} else if(i > 135 && i <= 180) {
					x = polygon.square.center.x - polygon.square.radius;
					y = polygon.square.center.y + (polygon.square.radius * Math.tan( -1 * i * Math.PI / 180 ));
				} else if(i > 180 && i < 225) {
					x = polygon.square.center.x - polygon.square.radius;
					y = polygon.square.center.y - (polygon.square.radius * Math.tan(  1 * i * Math.PI / 180 ));
				} else if(i > 315) {
					x = polygon.square.center.x + polygon.square.radius;
					y = polygon.square.center.y + (polygon.square.radius * Math.tan(  1 * i * Math.PI / 180 ));
				}
				
				polygon.square.angles[i] = {
					'x':	x,
					'y':	y
				};
			}
			
			// Hexagon
			var n = 6;
			var x1, x2, y1, y2, vx, vy, mag, distance;
			for(var i = 0; i <= 359; i++) {
				if(i < 30) {
					// down
					x = polygon.hexagon.center.x + polygon.hexagon.radius;
					y = polygon.hexagon.center.y + i;
				} else if(i < 90) {
					// down-left
					x1 =  polygon.hexagon.center.x;
					x2 = (polygon.hexagon.center.x + polygon.hexagon.radius);
					y1 = (polygon.hexagon.center.y + (polygon.hexagon.radius / (Math.sqrt(3) / 2)));
					y2 = (polygon.hexagon.center.y + 30);
					
					vx = (x2 - x1);
					vy = (y2 - y1);
					
					mag = Math.sqrt( vx * vx + vy * vy );
					
					vx /= mag;
					vy /= mag;
					
					distance = ( mag * ((i - 30) / 60) );
					
					x = ( x1 + vx * (mag - distance) );
					y = ( y1 + vy * (mag - distance) );
				} else if(i < 150) {
					// up-left
					x1 =  polygon.hexagon.center.x;
					x2 = (polygon.hexagon.center.x - polygon.hexagon.radius);
					y1 = (polygon.hexagon.center.y + (polygon.hexagon.radius / (Math.sqrt(3) / 2)));
					y2 = (polygon.hexagon.center.y + 30);
					
					vx = Math.abs(x2 - x1);
					vy = Math.abs(y2 - y1);
					
					mag = Math.sqrt( vx * vx + vy * vy );
					
					vx /= mag;
					vy /= mag;
					
					distance = (-1 * ( mag * ((i - 90) / 60) ));
					
					x = ( x2 + vx * (mag + distance) );
					y = ( y2 + vy * (mag + distance) );
				} else if(i < 180) {
					// up
					x = polygon.hexagon.center.x - polygon.hexagon.radius;
					y = polygon.hexagon.center.y + (180 - i);
				} else if(i < 210) {
					// up
					x = polygon.hexagon.center.x - polygon.hexagon.radius;
					y = polygon.hexagon.center.y - (i - 180);
				} else if(i < 270) {
					// up-right
					x1 =  polygon.hexagon.center.x;
					x2 = (polygon.hexagon.center.x - polygon.hexagon.radius);
					y1 = (polygon.hexagon.center.y - (polygon.hexagon.radius / (Math.sqrt(3) / 2)));
					y2 = (polygon.hexagon.center.y - 30);
					
					vx = (x2 - x1);
					vy = (y2 - y1);
					
					mag = Math.sqrt( vx * vx + vy * vy );
					
					vx /= mag;
					vy /= mag;
					
					distance = (-1 * mag * ((i - 210) / 60) );
					
					x = ( x1 + vx * (mag + distance) );
					y = ( y1 + vy * (mag + distance) );
				} else if(i < 330) {
					// down-right
					x1 = (polygon.hexagon.center.x + polygon.hexagon.radius);
					x2 =  polygon.hexagon.center.x;
					y1 = (polygon.hexagon.center.y - 30);
					y2 = (polygon.hexagon.center.y - (polygon.hexagon.radius / (Math.sqrt(3) / 2)));
					
					vx = (x2 - x1);
					vy = (y2 - y1);
					
					mag = Math.sqrt( vx * vx + vy * vy );
					
					vx /= mag;
					vy /= mag;
					
					distance = (-1 * mag * ((i - 270) / 60) );
					
					x = ( x1 + vx * (mag + distance) );
					y = ( y1 + vy * (mag + distance) );
				} else {
					// down
					x = polygon.hexagon.center.x + polygon.hexagon.radius;
					y = polygon.hexagon.center.y - Math.abs(359 - i);
				}
				
				polygon.hexagon.angles[i] = {
					'x':	x,
					'y':	y
				};
			}
		})();
		
		
		// Background lines
		(function() {
			var color_line = "#f5f5f5";
			var color_divider = "#e0e0e0";
			
			context_bg.beginPath();
			
			// Vertical
			
			// Polygons
			context_bg.beginPath();
			context_bg.moveTo(19.5, 0);
			context_bg.lineTo(19.5, canvas.height);
			context_bg.moveTo(75.5, 0);
			context_bg.lineTo(75.5, canvas.height);
			context_bg.moveTo(131.5, 0);
			context_bg.lineTo(131.5, canvas.height);
			context_bg.closePath();
			context_bg.strokeStyle = color_line;
			context_bg.stroke();
			
			
			// Divider
			context_bg.beginPath();
			context_bg.moveTo(vertical_line_x, 0);
			context_bg.lineTo(vertical_line_x, canvas.height);
			context_bg.closePath();
			context_bg.strokeStyle = color_divider;
			context_bg.stroke();
			
			
			// Horizontal
			
			// Circle
			context_bg.beginPath();
			context_bg.moveTo(0, 19.5);
			context_bg.lineTo(canvas.width, 19.5);
			context_bg.moveTo(0, 75.5);
			context_bg.lineTo(canvas.width, 75.5);
			context_bg.moveTo(0, 131.5);
			context_bg.lineTo(canvas.width, 131.5);
			context_bg.closePath();
			context_bg.strokeStyle = color_line;
			context_bg.stroke();
			
			// Divider
			context_bg.beginPath();
			context_bg.moveTo(0, 150);
			context_bg.lineTo(canvas.width, 150);
			context_bg.closePath();
			context_bg.strokeStyle = color_divider;
			context_bg.stroke();
			
			// Square
			context_bg.beginPath();
			context_bg.moveTo(0, 169.5);
			context_bg.lineTo(canvas.width, 169.5);
			context_bg.moveTo(0, 225.5);
			context_bg.lineTo(canvas.width, 225.5);
			context_bg.moveTo(0, 281.5);
			context_bg.lineTo(canvas.width, 281.5);
			context_bg.closePath();
			context_bg.strokeStyle = color_line;
			context_bg.stroke();
			
			// Divider
			context_bg.beginPath();
			context_bg.moveTo(0, 300);
			context_bg.lineTo(canvas.width, 300);
			context_bg.closePath();
			context_bg.strokeStyle = color_divider;
			context_bg.stroke();
			
			// Hexagon
			context_bg.beginPath();
			context_bg.moveTo(0, 319.5);
			context_bg.lineTo(canvas.width, 319.5);
			context_bg.moveTo(0, 375.5);
			context_bg.lineTo(canvas.width, 375.5);
			context_bg.moveTo(0, 431.5);
			context_bg.lineTo(canvas.width, 431.5);
			context_bg.closePath();
			context_bg.strokeStyle = color_line;
			context_bg.stroke();
		})();
		
		
		// Polygon Base - Circle
		(function() {
			// Center dot
			context_bg.beginPath();
			
			context_bg.arc(polygon.circle.center.x, polygon.circle.center.y, 2, 0, 2 * Math.PI, false);
			
			context_bg.closePath();
			context_bg.fillStyle = polygon.circle.color;
			context_bg.fill();
			
			// Outline
			context_bg.beginPath();
			
			context_bg.arc(polygon.circle.center.x, polygon.circle.center.y, polygon.circle.radius, 0, 2 * Math.PI, false);
			
			context_bg.closePath();
			context_bg.strokeStyle = polygon.circle.color;
			context_bg.lineWidth = 1.25;
			context_bg.stroke();
		})();
		
		
		// Polygon Base - Square
		(function() {
			// Center dot
			context_bg.beginPath();
			
			context_bg.arc(polygon.square.center.x, polygon.square.center.y, 2, 0, 2 * Math.PI, false);
			
			context_bg.closePath();
			context_bg.fillStyle = polygon.square.color;
			context_bg.fill();
			
			// Outline
			context_bg.beginPath();
			
			context_bg.moveTo(polygon.square.center.x - polygon.square.radius, polygon.square.center.y - polygon.square.radius);
			context_bg.lineTo(polygon.square.center.x + polygon.square.radius, polygon.square.center.y - polygon.square.radius);
			context_bg.lineTo(polygon.square.center.x + polygon.square.radius, polygon.square.center.y + polygon.square.radius);
			context_bg.lineTo(polygon.square.center.x - polygon.square.radius, polygon.square.center.y + polygon.square.radius);
			context_bg.lineTo(polygon.square.center.x - polygon.square.radius, polygon.square.center.y - polygon.square.radius);
			
			context_bg.closePath();
			context_bg.strokeStyle = polygon.square.color;
			context_bg.lineWidth = 1.25;
			context_bg.stroke();
		})();
		
		
		// Polygon Base - Hexagon
		(function() {
			// Center dot
			context_bg.beginPath();
			
			context_bg.arc(polygon.hexagon.center.x, polygon.hexagon.center.y, 2, 0, 2 * Math.PI, false);
			
			context_bg.closePath();
			context_bg.fillStyle = polygon.hexagon.color;
			context_bg.fill();
			
			// Outline
			context_bg.beginPath();
			
			var C = polygon.hexagon.radius / (Math.sqrt(3) / 2);
			var A = (1/2) * C;
			var B = (Math.sqrt(3) / 2) * C;
			
			var start_x = 19.5;
			var start_y = 319.5 - (polygon.hexagon.radius / 6);
			
			var pts = [
				{	// 1
					'x': start_x + ( 0 ),
					'y': start_y + ( A + C )
				},
				{	// 2
					'x': start_x + ( 0 ),
					'y': start_y + ( A )
				},
				{	// 3
					'x': start_x + ( B ),
					'y': start_y + ( 0 )
				},
				{	// 4
					'x': start_x + ( 2 * B ),
					'y': start_y + ( A )
				},
				{	// 5
					'x': start_x + ( 2 * B ),
					'y': start_y + ( A + C )
				},
				{	// 6
					'x': start_x + ( B ),
					'y': start_y + ( 2 * C )
				}
			];
			
			context_bg.moveTo(pts[0].x, pts[0].y);
			context_bg.lineTo(pts[1].x, pts[1].y);
			context_bg.lineTo(pts[2].x, pts[2].y);
			context_bg.lineTo(pts[3].x, pts[3].y);
			context_bg.lineTo(pts[4].x, pts[4].y);
			context_bg.lineTo(pts[5].x, pts[5].y);
			
			context_bg.closePath();
			context_bg.strokeStyle = polygon.hexagon.color;
			context_bg.lineWidth = 1.25;
			context_bg.stroke();
		})();
		
		
		// Calculate - Circle
		function calculate_circle() {
			var angle_point = polygon.circle.angles[ angle_at ];
			
			// angle dot
			context.beginPath();
			context.arc(angle_point.x, angle_point.y, 2, 0, 2 * Math.PI, false);
			context.closePath();
			context.fillStyle = polygon.circle.color;
			context.fill();
			
			// line from center to angle dot
			context.beginPath();
			context.moveTo(polygon.circle.center.x, polygon.circle.center.y);
			context.lineTo(angle_point.x, angle_point.y);
			context.closePath();
			context.strokeStyle = polygon.circle.color_light;
			context.lineWidth = 1;
			context.stroke();
			
			// line from angle dot to y-coord divider
			context.beginPath();
			context.moveTo(angle_point.x, angle_point.y);
			context.lineTo(vertical_line_x, angle_point.y);
			context.closePath();
			context.strokeStyle = polygon.circle.color_light;
			context.lineWidth = 1;
			context.stroke();
			
			// angle dot
			context.beginPath();
			context.arc(vertical_line_x, angle_point.y, 2, 0, 2 * Math.PI, false);
			context.closePath();
			context.fillStyle = polygon.circle.color;
			context.fill();
			
			// sine wave
			context.beginPath();
			
			context.moveTo(
				vertical_line_x,
				polygon.circle.angles[ angle_at ].y
			);
			
			var df = 0;
			for(var i = 1; i <= 359; i++) {
				df = i + angle_at;
				
				if(df > 358) {
					df = df - 359;
				}
				
				context.lineTo(
					(vertical_line_x + i),
					polygon.circle.angles[ df ].y
				);
			}
			
			//context.closePath();
			context.strokeStyle = polygon.circle.color;
			context.lineWidth = 1.5;
			context.stroke();
		}
		
		
		// Calculate - Square
		function calculate_square() {
			var angle_point = polygon.square.angles[ angle_at ];
			
			// angle dot
			context.beginPath();
			context.arc(angle_point.x, angle_point.y, 2, 0, 2 * Math.PI, false);
			context.closePath();
			context.fillStyle = polygon.square.color;
			context.fill();
			
			// line from center to angle dot
			context.beginPath();
			context.moveTo(polygon.square.center.x, polygon.square.center.y);
			context.lineTo(angle_point.x, angle_point.y);
			context.strokeStyle = polygon.square.color_light;
			context.lineWidth = 1;
			context.stroke();
			
			// line from angle dot to y-coord divider
			context.beginPath();
			context.moveTo(angle_point.x, angle_point.y);
			context.lineTo(vertical_line_x, angle_point.y);
			context.strokeStyle = polygon.square.color_light;
			context.lineWidth = 1;
			context.stroke();
			
			// angle dot
			context.beginPath();
			context.arc(vertical_line_x, angle_point.y, 2, 0, 2 * Math.PI, false);
			context.fillStyle = polygon.square.color;
			context.fill();
			
			// sine wave
			context.beginPath();
			
			context.moveTo(
				vertical_line_x,
				polygon.square.angles[ angle_at ].y
			);
			
			var df = 0;
			for(var i = 1; i <= 359; i++) {
				df = i + angle_at;
				
				if(df > 358) {
					df = df - 359;
				}
				
				context.lineTo(
					(vertical_line_x + i),
					polygon.square.angles[ df ].y
				);
			}
			
			//context.closePath();
			context.strokeStyle = polygon.square.color;
			context.lineWidth = 1.5;
			context.stroke();
		}
		
		
		// Calculate - Hexagon
		function calculate_hexagon() {
			var angle_point = polygon.hexagon.angles[ angle_at ];
			
			// angle dot
			context.beginPath();
			context.arc(angle_point.x, angle_point.y, 2, 0, 2 * Math.PI, false);
			context.closePath();
			context.fillStyle = polygon.hexagon.color;
			context.fill();
			
			// line from center to angle dot
			context.beginPath();
			context.moveTo(polygon.hexagon.center.x, polygon.hexagon.center.y);
			context.lineTo(angle_point.x, angle_point.y);
			context.strokeStyle = polygon.hexagon.color_light;
			context.lineWidth = 1;
			context.stroke();
			
			// line from angle dot to y-coord divider
			context.beginPath();
			context.moveTo(angle_point.x, angle_point.y);
			context.lineTo(vertical_line_x, angle_point.y);
			context.strokeStyle = polygon.hexagon.color_light;
			context.lineWidth = 1;
			context.stroke();
			
			// angle dot
			context.beginPath();
			context.arc(vertical_line_x, angle_point.y, 2, 0, 2 * Math.PI, false);
			context.fillStyle = polygon.hexagon.color;
			context.fill();
			
			// sine wave
			context.beginPath();
			
			context.moveTo(
				vertical_line_x,
				polygon.hexagon.angles[ angle_at ].y
			);
			
			var df = 0;
			for(var i = 1; i <= 359; i++) {
				df = i + angle_at;
				
				if(df > 358) {
					df = df - 359;
				}
				
				context.lineTo(
					(vertical_line_x + i),
					polygon.hexagon.angles[ df ].y
				);
			}
			
			//context.closePath();
			context.strokeStyle = polygon.hexagon.color;
			context.lineWidth = 1.5;
			context.stroke();
		}
		
		
		
		
		var canvas_frames = 0;
		
		var canvas_loop = function() {
			canvas_frames = (1 + (canvas_frames || 0));
			
			angle_at -= (2 / 1);
			
			//angle_at -= (2 / 1);
			////angle_at = 0;
			
			if(angle_at < 0) {
				angle_at = 359;
			}
			
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			calculate_circle();
			calculate_square();
			calculate_hexagon();
			
			requestAnimationFrame(canvas_loop);
		};
		
		
		canvas_loop();
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	} else {
		alert("Canvas not supported in this browser.");
	}
	
