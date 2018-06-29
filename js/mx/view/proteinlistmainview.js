function ProteinListMainView() {
	this.id = BUI.id();
	
	var _this = this;
	
	
	
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

ProteinListMainView.prototype.getColumns =  function(){
	return [
        {

            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
            hidden: false,
            renderer: function(grid, e, record) {	
				//console.log(record.data)	
				var html = "";		
 
				dust.render("proteinlistmainview.template", record.data,function(err,out){ 	
						html = out;						
    			});   				
				return "<div  id=" + record.data.proteinId +">" + html +"</div>";
			}
	}];
};


ProteinListMainView.prototype.getPanel =  function(){
	this.store = Ext.create('Ext.data.Store', {
            fields: ["dataCollectionGroup"]
    });

	var _this = this;
	
    this.panel = Ext.create('Ext.grid.Panel', {
        border: 1,        
        store: this.store,  
        id: this.id,    
		toolbar : this.getToolbar(), 
        minHeight : 900,
        disableSelection: true,
        columns: this.getColumns(),
        viewConfig: {
            enableTextSelection: true,
            stripeRows: false
        }
    });  
    return this.panel;
};

ProteinListMainView.prototype.parseData = function(proteins) {              
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
   
	return proteins;   
};

ProteinListMainView.prototype.load = function(proteins) {
	var _this = this;
	this.proteins = proteins;
	this.panel.setTitle("My Proteins");		
	this.store.loadData(this.parseData(proteins));
};
















