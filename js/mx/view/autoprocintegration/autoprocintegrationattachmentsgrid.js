function AutoProcIntegrationAttachmentGrid(args) {
	this.id = BUI.id();	
	this.maxHeight = 300;
}

AutoProcIntegrationAttachmentGrid.prototype.load = function(data) {
	var _this = this;
    if (data){
		data.sort(function(a, b) {
			var textA = a.fileName.toUpperCase();
			var textB = b.fileName.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});
		//this.store.loadData(data);
		console.log(data);
		var html = "";
		dust.render("files.autoprocintegrationgrid.template", data, function(err, out) { 
			debugger
			html = out;
		});
		debugger
		$("#" + _this.id).html(html);
    }
};

AutoProcIntegrationAttachmentGrid.prototype.getPanel = function() {
	var _this = this;
	this.store = Ext.create('Ext.data.Store', {
		fields : ["fileName"]
	});
    	
	this.panel = Ext.create('Ext.panel.Panel', {
		id : this.id + "panel",
		title : 'Attachments',
		store : this.store,
		cls : 'border-grid',
		margin : 5,
		overflow :'auto',
        height : 500,
		items : [ 		
					{
						html : '<div id="'+ _this.id +'">testtest</div>'

					}
                    /*{
                        text : 'fileName',
                        dataIndex : 'fileName',
                        flex : 10,
						renderer : function(grid, opt, val, val2, val3){
                            var url = EXI.getDataAdapter().mx.autoproc.getDownloadAttachmentUrl(val.data.autoProcProgramAttachmentId);
							var displayURL = EXI.getDataAdapter().mx.autoproc.getAttachmentUrl(val.data.autoProcProgramAttachmentId);
                            return '<a href="'+ url + '"><span class="glyphicon glyphicon-download" style="margin-right:10px;"></span></a><a href="' + url + '" target="_blank">' + val.data.fileName + '</a>';				
                        }
                    }*/
		],
		flex : 1,
		viewConfig : {
			stripeRows : true
		}
	});

	return this.panel;
};

AutoProcIntegrationAttachmentGrid.prototype.hide = function(bool) {
	if (bool){
		//Ext.getCmp(this.id).hide();
	} else {
		//Ext.getCmp(this.id).show();
	}
}