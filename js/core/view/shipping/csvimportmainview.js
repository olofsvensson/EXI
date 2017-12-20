/**
 * This main class deals with the creation and edition of shipments
 *
 * @class CSVImportMainViewTest
 * @constructor
 */
function CSVImportMainView() {
    MainView.call(this);

    this.id = BUI.id();

    this.containerSpreadSheet = new ContainerSpreadSheet({
        width: Ext.getBody().getWidth() - 100,
        height: 600
    });

}

CSVImportMainView.prototype.getPanel = MainView.prototype.getPanel;

CSVImportMainView.prototype.getContainer = function() {
    var html = "";
    dust.render("csvimportmainview.template", {
        id: "file_" + this.id
    }, function(err, out) {
        html = out;
    });


    this.panel = Ext.create('Ext.panel.Panel', {
        autoScroll: true,
        //buttons : this.getToolBar(),
        layout: 'vbox',
        items: [

            {
                html: html,
                height: 50,
                margin : 20
            },
            this.containerSpreadSheet.getPanel()
        ]
    });
    return this.panel;

};


CSVImportMainView.prototype.load = function(shippingId) {
    var _this = this;
    this.panel.setTitle("Import CSV");
    this.shippingId = shippingId;

    var data = JSON.parse("[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]]");
    this.containerSpreadSheet.loadData(data);

    function attachListeners() {

        function handleFileSelect(evt) {
            debugger
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