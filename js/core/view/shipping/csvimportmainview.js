/**
 * This main class deals with the creation and edition of shipments
 *
 * @class CSVImportMainViewTest
 * @constructor
 */
function CSVImportMainView() {
    MainView.call(this);

    this.id = BUI.id();



}

CSVImportMainView.prototype.getPanel = MainView.prototype.getPanel;

CSVImportMainView.prototype.getContainer = function() {
    var html = "";
    dust.render("csvimportmainview.template", {
        id: "file_" + this.id
    }, function(err, out) {
        html = out;
    });
    return Ext.create('Ext.container.Container', {
        layout: {
            type: 'fit'
        },

        margin: 15,
        border: 1,
        items: [{
            html: html

        }]
    });
};




CSVImportMainView.prototype.load = function(shippingId) {
    var _this = this;
    this.panel.setTitle("Import CSV");
    this.shippingId = shippingId;



    function attachListeners() {       

        function handleFileSelect(evt) {
            var files = evt.target.files; // FileList object            
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
                console.log(escape(f.name) + " " + f.size);
            }
        }
        /** Add listener to change */
        document.getElementById("file_" + _this.id).addEventListener('change', handleFileSelect, false);
		/** Make button active */
		document.getElementById("file_" + _this.id).disabled = false;
    };

    var timer = setTimeout(attachListeners, 1000);

};