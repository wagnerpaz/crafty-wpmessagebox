window.onload = function()
{
	Crafty.init(400, 120);
	Crafty.canvas.init();
	
	Crafty.scene("loading-test", function()
	{
		Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
		
		Crafty.loadMessageBoxSkin("skin/round-metal", function()
		{
			Crafty.load(["text1.dlg.json", "text2.dlg.json"], function(obj)
			{
				Crafty.scene("test");
			});
		});
	});
	
	Crafty.scene("test", function()
	{
		generateBackground();
		
		createAndShowBoxStyle1().bind("WPMessageBoxClosed", function()
		{
			createAndShowBoxStyleDefault().bind("WPMessageBoxClosed", function()
			{
				Crafty.e("2D, DOM, Text, Tween")
                      .attr({x: 150,
                             y: 50,
                             w: 100,
                             alpha: 0})
                      .text("THE END")
                      .css({'font-size'  : 20,
                            'font-weight': 'bold',
                            'text-align' : 'center'})
                      .tween({alpha: 1.0}, 100)
                      ;
			});
		});
	});
	
	Crafty.scene('loading-test');
};

function createAndShowBoxStyle1()
{
	return Crafty.e("2D, Canvas, WPMessageBox, Multiway, Keyboard")
                 .attr({x: 25,
                        y: 25,
                        w: 350,
                        h: 70,
                        z: 1})
                 .messageBox(Crafty.asset("text1.dlg.json"),
                            {font: {family: 'Arial',
                                     weight: 'none',
                                     size  : '10px'},
                             foreground : '#FFFFFF',
                             background : '#0000EC',
                             alpha      : 0.3,
                             margin     : -1,
                             padding    : 0,
                             borderSize : 7,
                             borderColor: 'transparent',
                             borderSkin : 'skin/round-metal'
                            })
                 .multiway(3, {W: -90, A: 180, S: 90, D: 0})
                 .bind("KeyDown", function(e)
                  {
                      if(this.isDown('SPACE'))
                      {
                          this.next();
                      }
                  })
                  ;
}

function createAndShowBoxStyleDefault()
{
	return Crafty.e("2D, Canvas, WPMessageBox, Multiway, Keyboard")
                 .attr({x: 25,
                        y: 25,
                        w: 350,
                        h: 70,
                        z: 1})
                 .messageBox(Crafty.asset("text2.dlg.json"), {font: {size: '12px'}})
                 .multiway(3, {W: -90, A: 180, S: 90, D: 0})
                 .bind("KeyDown", function(e)
                 {
                      if(this.isDown('SPACE'))
                      {
                          this.next();
                      }
                 })
                 ;
}

function generateBackground()
{
	for(var i = 0; i < 20; i++)
	{
		for(var j = 0; j < 20; j++)
		{
			Crafty.e("2D, Canvas, Color")
                  .attr({x: i * 20,
                         y: j * 20,
                         w: 20,
                         h: 20})
                  .color( (i + j) % 2 === 0 ? "#DFDFDF" : "#FFFFFF")
                  ;
		}
	}
}