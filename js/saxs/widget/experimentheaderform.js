/**
 * Shows the header for the experiments changing the color and parameters depending on experiment type
 * 
 */
function ExperimentHeaderForm(args) {
	this.id = BUI.id();
	this.backgroundColor = '#FFFFFF';
	this.onSaved = new Event(this);
}


ExperimentHeaderForm.prototype.load = function(experiment) {
	this.experiment = experiment;
	Ext.getCmp(this.id + "name").setValue(experiment.name);
	document.getElementById(this.id + "date").innerHTML = "Created on " + (experiment.creationDate);
	//Ext.getCmp(this.id + "comments").setValue(experiment.comments);
};


ExperimentHeaderForm.prototype.getToolBar = function() {
	var _this = this;
	return [
	        {
	            text: 'Save',
	            width : 100,
	            handler : function(){
	            	_this.panel.setLoading();
	            	var onSuccess = (function(sender){
	            		_this.panel.setLoading(false);
						_this.onSaved.notify();
	            		
	            	});
	            	EXI.getDataAdapter({ onSuccess : onSuccess}).saxs.experiment.saveExperiment(_this.experiment.experimentId, 
					Ext.getCmp(_this.id + "name").getValue(),  _this.experiment.comments)
	            			//Ext.getCmp(_this.id + "comments").getValue());
	            }
			}
/*,
	        '->',
	        Ext.create('Ext.button.Split', {
	            text: 'Download',
	            menu: new Ext.menu.Menu({
	                items: [
	                    {text: 'For BsxCube on bm29', handler: function(){
	                    		window.open(EXI.getDataAdapter().saxs.template.getTemplateSourceFile(_this.experiment.experimentId, "bsxcube")); 
	                    	}
	                    },
	                    {text: 'For Becquerel on p12', handler: function(){
	                    		window.open(EXI.getDataAdapter().saxs.template.getTemplateSourceFile(_this.experiment.experimentId, "becquerel"));
	                    	}
	                    }
	                ]
	            })
	        })*/
	];
};

ExperimentHeaderForm.prototype.getPanel = function() {
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		buttons : this.getToolBar(),	
		items : [
		        {
								xtype : 'textfield',
								fieldLabel : 'Name' ,
								padding : 20,
								id : this.id + "name"
						}
		] });
	return this.panel;
};

