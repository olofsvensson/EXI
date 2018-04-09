/**
 * Same form as MX part
 * 
 * @creationMode if true a create button appears instead of save
 * @showTitle true or false
 */
function ShipmentForm(args) {
	this.id = BUI.id();
	this.width = 600;
	this.padding = 10;

	if (args != null) {
		if (args.creationMode != null) {
			this.creationMode = args.creationMode;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}

	var _this = this;

	this.dewarTrackingView = new DewarTrackingView();
	this.dewarTrackingView.onLoaded.attach(function(sender){
		_this.panel.doLayout();
	});
	
	this.fedexCode = "fedexCode";
	
	this.onSaved = new Event(this);
	this.refresh = new Event(this);
}
ShipmentForm.prototype.getReimbursementContentHTML = function(nbReimbDewars) {	
	return "According to the A-form for this experiment, you are allowed to have " + nbReimbDewars 
	+ " parcels reimbursed by the ESRF. Please use the Reimburse button to select/unselect the parcels to be reimbursed.";
};

ShipmentForm.prototype.getReimbursementHTML = function(nbReimbDewars) {	
	if (nbReimbDewars){
		if (nbReimbDewars > 0){
			return  this.getReimbursementContentHTML(currentReimbursedDewars, maxReimbursedDewars);		
		}
	} 
	return "";
};

ShipmentForm.prototype.load = function(shipment,hasExportedData) {
	var _this = this;
	this.shipment = shipment;
	this.hasExportedData = hasExportedData;
	var toData = EXI.proposalManager.getLabcontacts();
	var fromData = $.extend(EXI.proposalManager.getLabcontacts(), [{ cardName : 'Same as for shipping to beamline', labContactId : -1}, { cardName : 'No return requested', labContactId : 0}]);

    var html = "";
	var beamlineName = "";
	var startDate = "";
	var reimbText = "";
	var fedexCode = "";
	var nbReimbDewars = 0;
	if (shipment){
		if (shipment.sessions.length > 0){
			beamlineName = shipment.sessions[0].beamlineName;
			nbReimbDewars = shipment.sessions[0].nbReimbDewars;
			startDate = moment(shipment.sessions[0].startDate).format("DD-MM-YYYY");
			reimbText = this.getReimbursementContentHTML(nbReimbDewars); //"reimbtext"; //this.getReimbursementHTML(nbReimbDewars);
			fedexCode = "Your FedEx Reference for this shipment: " + shipment.sessions[0].proposalVO.code + "-" + shipment.sessions[0].proposalVO.number + "/" + beamlineName+ "/" + startDate;
		}
	}
		
    dust.render("shipping.form.template", {id : this.id, to : toData, from : fromData, beamlineName : beamlineName, startDate : startDate, shipment : shipment, nbReimbDewars : nbReimbDewars, reimbText : reimbText, fedexCode : fedexCode}, function(err, out){
		html = out;
	});
	
    $('#' + _this.id).hide().html(html).fadeIn('fast');
	if (shipment == null || shipment.shippingStatus != "processing"){
		$("#" + _this.id + "-edit-button").prop('disabled',false);
		$("#" + _this.id + "-edit-button").unbind('click').click(function(sender){
			_this.edit();
		});
	
	}

	$("#" + _this.id + "-send-button").unbind('click').click(function(sender){
			_this.updateStatus(_this.shipment.shippingId, "Sent_to_ESRF");
	});


	$("#transport-history-" + this.id).html(this.dewarTrackingView.getPanel());
	
	this.panel.doLayout();
	this.attachCallBackAfterRender();
};

ShipmentForm.prototype.updateStatus = function(shippingId, status) {
    var _this = this;
    //_this.panel.setLoading("Updating shipment Status");
    var onStatusSuccess = function(sender, dewar) { 						
			_this.refresh.notify(_this.shipment.shippingId);
    };
    var onError = function(data){
            EXI.setError(data);
    };
    
    EXI.getDataAdapter({onSuccess : onStatusSuccess, onError : onError}).proposal.shipping.updateStatus(shippingId,status);
};

ShipmentForm.prototype.getPanel = function() {

	this.panel = Ext.create("Ext.panel.Panel",{
		layout : 'fit',
		cls	: 'overflowed overflowed-cascade',

		items :	[{
                    html : '<div id="' + this.id + '"></div>',
                    autoScroll : false,
					// margin : 10,
					padding : this.padding,
					width : this.width
                }]
	});

	return this.panel;
};

ShipmentForm.prototype.edit = function(dewar) {
	var _this = this;
	var shippingEditForm = new ShipmentEditForm();
	
	shippingEditForm.onSaved.attach(function (sender, shipment) {
		if (_this.shipment) {
			_this.load(shipment);
		} else {
			_this.onSaved.notify(shipment);
		}
		window.close();
	});

	var window = Ext.create('Ext.window.Window', {
		title : 'Shipment',
		height : 450,
		width : 600,
		modal : true,
		layout : 'fit',
		items : [ shippingEditForm.getPanel() ],
		buttons : [ {
				text : 'Save',
				handler : function() {
					shippingEditForm.saveShipment();
				}
			}, {
				text : 'Cancel',
				handler : function() {
					window.close();
				}
			} ]
	}).show();

	shippingEditForm.load(this.shipment);
};

ShipmentForm.prototype.attachCallBackAfterRender = function () {

	var _this = this;
	var tabsEvents = function(grid) {
		this.grid = grid;
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var target = $(e.target).attr("href");
			if (target.startsWith("#tr")){
				_this.dewarTrackingView.load(_this.shipment);
			}
			_this.panel.doLayout();
		});
    };
    var timer3 = setTimeout(tabsEvents, 500, this);
}