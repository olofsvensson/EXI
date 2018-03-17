function ProteinListMainView() {
	this.id = BUI.id();
	
	var _this = this;
	 this.layout = 'fit';
	 this.margin = 10;
	 this.height = 800;
	
}

ProteinListMainView.prototype.getToolbar = function(sessions) {
    var _this = this;
    var items = [];
    
    

    items.push(
                {
                    xtype    : 'textfield',
                    name     : 'proposalFilter',
                    width    : 300,
                    emptyText: 'Filter by term (proposal or title) or comment',
                    listeners : {
                        specialkey : function(field, e) {
                            if (e.getKey() == e.ENTER) {
                                _this.termFilter = field.getValue();
                                var filtered = _this.filterByTerm(_this.sessions, _this.termFilter);
                                if (_this.beamlineFilter.length > 0) {
                                    filtered = _this.filterByBeamline(filtered,_this.beamlineFilter);
                                }
                                _this.store.loadData(filtered,false);
                                _this.panel.setTitle(filtered.length + " sessions");
                            }
                        } 
                    } 
                }
    );
	return Ext.create('Ext.toolbar.Toolbar', {  
        items: items
    });
};

ProteinListMainView.prototype.getPanel =  function(){
	this.panel = Ext.create('Ext.panel.Panel', {				
        tbar : this.getToolbar(),				
		cls : 'border-grid',
		//minHeight: 300,                
        //width : this.width,
        height : this.height, 
		flex:1,
		margin : this.margin,     
		layout : this.layout,
		items : [   
                  {
                       html : '<div style="overflow: auto;height:100%;" id="' + this.id +'_main"></div>',
					   margin : 10,
					   flex:1,
					   cls : 'border-grid',
					    height : this.height,

                  }
           ]			
	});

	return this.panel;
};

ProteinListMainView.prototype.renderHTML = function(proteins) {              
    var _this = this;
	try{
	     proteins.sort(function (a, b) {
   			 return  protein.acronym.toLowerCase().localeCompare( protein.acronym.toLowerCase());
		});
	}
	catch(e){}

/**
 * data looks like
 * "[60085/ID30B/2017-09-26 01:00:00,60085/ID30B/2017-09-26 01:00:00,...]
 */
    
	_.forEach(proteins, function(protein) {
		/** Sessions */
		var keys = {};
		if (protein.sessions == null){
			    protein.sessions = [];
		}
        if (protein.SessionValuesList){
			var sessions = protein.SessionValuesList.split(",");
			for(var i=0; i < sessions.length; i++){
				var tuple = sessions[i].split("/");
                if (tuple){
				    if (tuple.length == 3){				
					  
						if (keys[tuple[0]] == null){
					        protein.sessions.push({
                                sessionId : tuple[0],
						        beamline : tuple[1],
						        date : tuple[2],
					        });
							keys[tuple[0]] = true;
						}
				    }
			    }
			}
		}
		/** Space group */
		if (protein.SpaceGroupModelBuildingPhasingStep){
			protein.solvedStructureSpaceGroups = protein.SpaceGroupModelBuildingPhasingStep.split(",");
		}
		
    });
    dust.render("proteinlistmainview.template", proteins,function(err,out){ 		
          $('#' + _this.id +'_main').html(out);
    });      
};

ProteinListMainView.prototype.load = function(proteins) {
	var _this = this;
	this.proteins = proteins;
	this.panel.setTitle("My Proteins");		
	this.renderHTML(proteins);
};
















