//WHEN THE DOM HAS LOADED
window.onload = function()
{
	Crafty.init(400, 120);
	Crafty.canvas.init();
	
	Crafty.scene("loading-test", function()
	{
		Crafty.loadMessageBoxSkin("round-metal", function()
		{
            Crafty.scene("test");
        });
		
		Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
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
    var text = ["Hello! My name is Wagner Paz,\n"
             +  "It's nice to meet you!\n"
             +  "(Press SPACE to continue..)"

             ,  "I'm here to show you my new Crafty component.\n"
             +  "It's called WPMessageBox (pretty obvious, no?)"
             ,  "It's a customizable RPG-like message box component.\n"
             +  "The text is written slowly, in a typewriter style, but don't worry...\n"
             +  "(You can press SPACE anytime to resume)."

             ,  "This box you are seeing right now, has a custom skin applied to it.\n"
             +  "I'll show you the default box style in the next frame,\n"
             +  "it's much simpler since it doesn't require any additional resources."];
	
	return Crafty.e("2D, Canvas, WPMessageBox, Multiway, Keyboard")
                 .attr({x: 25,
                        y: 25,
                        w: 350,
                        h: 70,
                        z: 1})
                 .messageBox(text,
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
                             borderSkin : 'round-metal'
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
	var text = ["And here whe are!\n"
             +  "This ends the presentation.."

             ,  "Thanks for watching!\n"
             +  "For more information and a list of possible parameters\n"
             +  "please refer to the documentation!"];
	
	return Crafty.e("2D, Canvas, WPMessageBox, Multiway, Keyboard")
                 .attr({x: 25,
                        y: 25,
                        w: 350,
                        h: 70,
                        z: 1})
                 .messageBox(text, {font: {size: '12px'}})
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