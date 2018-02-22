/**
* This class containes name, description, samples spreadsheet and puck loyout for a given puck 
*
* @class PuckForm
* @constructor
**/
function CSVPuckFormView(args) {
	this.id = BUI.id();

	/**  CSVPuckFormView.template contains two information panels which id are the stored in the next variables. This is done because we want to use notify based in the ID **/
	this.specialCharacterInfoPanelId = this.id + "_specialCharacterInfoPanelId";
    this.uniquenessInfoPanelId = this.id + "_uniquenessInfoPanelId";

	this.height = 500;
	this.width = 500;
	this.unsavedChanges = false;
	
	/** When getPanel it will load all the samples for this proposal */
	this.proposalSamples = [];

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}

	
	var _this = this;
	
	 this.containerSpreadSheet = new CSVContainerSpreadSheet({
        width: Ext.getBody().getWidth() - 100,
        height: Ext.getBody().getHeight() - 500,
    });
	
	this.onRemoved = new Event(this);
	this.onSaved = new Event(this);
}

CSVPuckFormView.prototype.getToolBar = PuckFormView.prototype.getToolBar;
CSVPuckFormView.prototype.returnToShipment = PuckFormView.prototype.returnToShipment;
CSVPuckFormView.prototype.checkSampleNames = PuckFormView.prototype.checkSampleNames;
CSVPuckFormView.prototype.displaySpecialCharacterWarning = PuckFormView.prototype.displaySpecialCharacterWarning;
CSVPuckFormView.prototype.displayUniquenessWarning = PuckFormView.prototype.displayUniquenessWarning;
CSVPuckFormView.prototype.showReturnWarning = PuckFormView.prototype.showReturnWarning;

CSVPuckFormView.prototype.getToolBar = function() {
	var _this = this;
	return [
			{
			    text: 'Remove',
				id: this.id + "_remove_button",
			    width : 100,
			    height : 30,
				disabled : true,
			    cls : 'btn-red',
			    handler : function(){
			    	function showResult(result){
						if (result == "yes"){
							_this.removePuck();							
						}
			    	}
					  Ext.MessageBox.show({
				           title:'Remove',
				           msg: 'Removing a puck from this parcel will remove also its content. <br />Are you sure you want to continue?',
				           buttons: Ext.MessageBox.YESNO,
				           fn: showResult,
				           animateTarget: 'mb4',
				           icon: Ext.MessageBox.QUESTION
				       });
			    }
			},
	        "->",
	        {
	            text: 'Save',
                id: this.id + "_save_button",
	            width : 100,
	            height : 30,
				disabled : false,
	            handler : function(){
	            	_this.save();
	            }
	        },
			{
	            text: 'Return to shipment',
	            width : 200,
	            height : 30,
	            handler : function () {
                    _this.returnToShipment();
                }
	        }
	];
};

CSVPuckFormView.prototype.save = function() {
    var _this = this;
    var parcels = this.containerSpreadSheet.getParcels();
    console.log(parcels);

    var onError = function(sender, error, mesg){
			_this.panel.setLoading(false);                        
			EXI.setError(error.responseText);
		};
		
		var onSuccess = function(sender, puck){
			_this.panel.setLoading(false);          
	};
	this.panel.setLoading("Saving Puck");
		
	EXI.getDataAdapter({onSuccess : onSuccess, onError : onError}).proposal.shipping.addDewarsToShipment(this.shippingId, parcels);

};

CSVPuckFormView.prototype.getPanel = function() {
	this.container = Ext.create('Ext.container.Container', {
		xtype : 'container',
		items : []
	});

	this.panel = Ext.create('Ext.panel.Panel', {
		autoScroll : true,				
		icon : this.icon,
        layout : 'fit',
        padding: 10,
		border : 0,
		items :[this.getContainer() ]
	});
    var _this = this;
    this.panel.on('boxready', function() {
        if (_this.onBoxReady){
            _this.onBoxReady();
        }
    });
    
	return this.panel;
};

CSVPuckFormView.prototype.getContainer = function() {
    var html = "";
    
    dust.render("csvimportmainview.template", {
        id: "file_" + this.id
    }, function(err, out) {
        html = out;
    });

    this.panel = Ext.create('Ext.panel.Panel', {
        autoScroll: true,
        buttons : this.getToolBar(),
        layout: 'vbox',
        items: [

            {
                html: html,
                height: 50,
                margin : 20
            },
            this.containerSpreadSheet.getPanel(),

        ]
    });
    return this.panel;

};

CSVPuckFormView.prototype.csvToArray = function(csvContent) {    
    if (csvContent){
        var allTextLines = csvContent.split(/\r\n|\n/);
        if (allTextLines){
            if (allTextLines.length > 0){
                var lines = [];
                for (var i=0; i<allTextLines.length -1; i++) {
                    var line = allTextLines[i].split(',');                                        
                    lines.push(line);
                }
                return lines;        
            }
        }
    }
};


CSVPuckFormView.prototype.load = function(shippingId) {
    var _this = this;
    this.panel.setTitle("Import CSV");
    this.shippingId = shippingId;

    //var data = JSON.parse("[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]");
    this.containerSpreadSheet.loadData([[]]);

    function attachListeners() {

        function handleFileSelect(evt) {            
            var files = evt.target.files; // FileList object            
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {              
                 var reader = new FileReader();
                 reader.onload = (function(f) {
                    return function(e) {                                        
                        _this.containerSpreadSheet.loadData(_this.csvToArray(e.target.result));
						                                        
                    };
                })(f);
                 // Read in the image file as a data URL.
                reader.readAsText(f);
            }
        }
        /** Add listener to change */
        document.getElementById("file_" + _this.id).addEventListener('change', handleFileSelect, false);
        /** Make button active */
        document.getElementById("file_" + _this.id).disabled = false;
    };

    var timer = setTimeout(attachListeners, 1000);

};




