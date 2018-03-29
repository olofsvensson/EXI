/**
 * @showTitle
 *
 * #onSaved
 * #onAddPlates
 * #onRemovePlates
 **/
function ReimbForm(args) {
	this.id = BUI.id();
	this.width = 800;
	this.showTitle = true;
	if (args != null) {
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
		}
	}
	this.onSaved = new Event(this);
}

ReimbForm.prototype.fillStores = function() {
	var _this = this;
	this.panel.setLoading("Loading Labcontacts from database");

	var proposal = BUI.getProposal();
	proposal.onDataRetrieved.attach(function(sender, data) {
		_this.labContactForSendingStore.loadData(data, false);
		_this.labContactForReturnStore.loadData(data, false);
		_this.panel.setLoading(false);
	});
	proposal.getLabContactsByProposalId();

};

ReimbForm.prototype.refresh = function(dewar) {
	this.setDewar(dewar);
};

ReimbForm.prototype.getDewar = function() {
	this.dewar.isReimbursed = Ext.getCmp(this.id + "dewar_isReimbursed").getValue();
	return this.dewar;
};

ReimbForm.prototype.setDewar = function(dewar) {
	this.dewar = dewar;
	
	if (this.dewar == null){
		this.dewar={};
		this.dewar["isReimbursed"] = "";
	}
	
	Ext.getCmp(this.id + "dewar_isReimbursed").setValue(this.dewar.isReimbursed);
};

ReimbForm.prototype.getCurrentReimbursedDewars = function(dewars) {
	return _.filter(dewars, function(o){ return o.isReimbursed == true}).length;	
};

ReimbForm.prototype.hideReimbursedButton = function(shipment, dewar){
	this.maxReimb = 0;
	debugger;
	if (shipment) {
		if (shipment.sessions.length > 0){
			this.maxReimb = shipment.sessions[0].nbReimbDewars;
		}
	}	
	if (dewar.isReimbursed) 
		return false;
	if (this.getCurrentReimbursedDewars(shipment.dewarVOs) < this.maxReimb){
		return false;
	}
	return true;
}

ReimbForm.prototype.getBoxLabelText = function(shipment, dewar){
	this.fedexReference = shipment.sessions[0].proposalVO.code + shipment.sessions[0].proposalVO.number + "/" 
	+ shipment.sessions[0].beamlineName + "/" + moment(shipment.sessions[0].startDate).format('YYYYMMDD');

	boxLabelText = 'By setting this parcel to reimbursed, the labels printed for the sending'
	+ '<br>will contain the fedex account that you should use to send your dewars. '
	+ '<br>Please note that you MUST NOT use this account to ship more<br>than the allowed number of dewars. '
	+ '<br>In case of abuse, your proposal will no more benefit<br>from parcel reimbursement.<br>-> You MUST enter the following reference into your fedex page: <br><center>' + this.fedexReference + '</center>';
	
	boxLabelText2 = 'By setting this dewar to reimbursed, the labels that will be generated for sending the dewar will use the ESRF FedEx account. '
	+ 'You MUST NOT use this account to ship more than the allowed number of dewars, or any other equipment for this or any other experiment. '
	+ 'Any abuse of this account will immediately result in your proposal being refused access to the dewar reimbursement procedure, and eventually to the ESRF beamlines. '
	+ '<br> Please click on the following checkbox if you agree with these conditions and you wish to have this dewar automatically reimbursed by the ESRF. ';

	
	if (this.hideReimbursedButton(shipment, dewar) == true){
		boxLabelText = "<span style='color:orange'>You are not authorized to select another parcel to be reimbursed</span>";
	}
	return boxLabelText;
}

ReimbForm.prototype.getPanel = function(dewar, shipment) {
		this.panel = Ext.create('Ext.form.Panel', {
			width : this.width - 10,
			title : this.getBoxLabelText(shipment, dewar),
//			cls : 'border-grid',
//			margin : 10,
			padding : 10,
			height : 320,
			items : [ {
				xtype : 'container',
				margin : "2 2 2 2",
				collapsible : false,
				defaultType : 'textfield',
				layout : 'anchor',
				items : [ 									
					{           
						xtype: 'checkbox',
						fieldLabel : ' ',
						boxLabel : 'Click if you agree with these conditions and you want to have this parcel automatically reimbursed.',
						hideLabel:true,
						labelWidth : 800,
						name : 'isReimbursed',
						id : this.id + 'dewar_isReimbursed',
						trueText: 'true',
						falseText: 'false' ,
						hidden : this.hideReimbursedButton(shipment, dewar) //false //'{4 < 3}'
					},
					
			]}]			
		});

	this.refresh(dewar);
	return this.panel;
};