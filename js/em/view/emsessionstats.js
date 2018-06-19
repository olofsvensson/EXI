/**
* Landing page for where data collections are shown. It manages the DataCollectionSummaryGrid
*
* @class EMSessionStats
* @constructor
*/
function EMSessionStats() {
    this.id = BUI.id();
    MainView.call(this);
    var _this = this;

   
}

EMSessionStats.prototype.plot =  function(target) {

    /**  averageMotionPerFrame */
   this.dygraphWidget= new DygraphWidget(target, {    
       showRangeSelector : true ,
       height : 180 ,
       xlabel : "Average Motion Per Frame", 
   });

   var plot = [];
   for(var i=0; i < this.data.length; i++){
       plot.push([ new Date(this.data[i].createdTimeStamp), parseFloat(this.data[i].averageMotionPerFrame)]);
   }
   this.dygraphWidget.draw(
         plot,
		 [ "blue", "red", "green" ],
		 [ "", 'averageMotionPerFrame'] 
   );

   /** Total  */
   this.dygraphWidgetTotal= new DygraphWidget(target + "_total", {    
       showRangeSelector : true ,
       height : 180 ,
       xlabel : "Total Motion", 
   });

   var plotTotal = [];
   for(var i=0; i < this.data.length; i++){
       plotTotal.push([ new Date(this.data[i].createdTimeStamp),  parseFloat(this.data[i].totalMotion)]);
   }
   this.dygraphWidgetTotal.draw(
         plotTotal,
		 [ "blue", "red", "green" ],
		 [ "",  'totalMotion' ] 
   );

   /** Defocus */
   this.dygraphWidgetTotal= new DygraphWidget(target + "defocus", {    
       showRangeSelector : true ,
       height : 180 ,
       xlabel : "Defocus U/V ", 
   });

   var plotTotal = [];
   for(var i=0; i < this.data.length; i++){
       plotTotal.push([ new Date(this.data[i].createdTimeStamp),  parseFloat(this.data[i].defocusU),  parseFloat(this.data[i].defocusV)]);
   }
   this.dygraphWidgetTotal.draw(
         plotTotal,
		 [ "blue", "red", "green" ],
		 [ "",  'defocusU', 'defocusV' ] 
   );
   console.log(this.data[0])
};


EMSessionStats.prototype.getPanel =  function() {
     var _this = this;
    
     this.container = Ext.create('Ext.panel.Panel', {         
        padding: '5 5 5 5',
        items: [ 
            {
                html : '<div id="' + this.id +'"style="height:200px"></div>'
            },
             {
                html : '<div style="height:200px" id="' + this.id +'_total">sdfdsf</div>'
            },
             {
                html : '<div style="height:200px" id="' + this.id +'defocus">gfdgfd</div>'
            }
        ],
        listeners: {
                afterRender: function() {
                    _this.plot(_this.id);
                    
                }
            }        
        });
    return this.container;
};


EMSessionStats.prototype.load =  function(data) {
    var _this = this;
    this.data=data;
   
     
};

