
/**
* This main class deals with the creation and edition of shipments
*
* @class CSVImportMainViewTest
* @constructor
*/
function CSVImportMainView() {
	MainView.call(this);
	var _this = this;

   this.containerSpreadSheet = new ContainerSpreadSheet({width : Ext.getBody().getWidth() - 100, height : 600});
	
	
}

CSVImportMainView.prototype.getPanel = MainView.prototype.getPanel;

CSVImportMainView.prototype.getContainer = function() {
	var html = "";
	dust.render("csvimportmainview.template",{},function(err, out) {
            html = out;
	});

	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'fit'
	    },
	    margin : 15,
	    border: 1,
	    defaults: {
	        labelWidth: 80,
	        flex: 1,
	    },
	    items : [
				{
                     html : html

				}
        ]
	});
};




CSVImportMainView.prototype.load = function(shippingId) {
	var _this = this;
	this.panel.setTitle("Import CSV");
	this.shippingId = shippingId;

};