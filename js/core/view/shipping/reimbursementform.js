/**
 * @showTitle
 *
 * #onSaved
 * #onAddPlates
 * #onRemovePlates
 **/
function ReimbForm(args) {
	this.id = BUI.id();
	this.width = 600;
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

ReimbForm.prototype.getPanel = function(dewar) {
		this.panel = Ext.create('Ext.form.Panel', {
			width : this.width - 10,
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
						boxLabel : 'By setting this dewar to reimbursed, the labels that will be generated for the sending will contain the fedex account that you should use to send your dewars. <br>Please note that you MUST NOT use this account to ship more than the allowed number of dewars. <br>In case of abuse, your proposal will no more be able to benefit from the dewar reimbursement. <br>Click if you agree with these conditions and you want to have this dewar automatically reimbursed.',
						hideLabel:true,
						labelWidth : 500,
						name : 'isReimbursed',
						id : this.id + 'dewar_isReimbursed',
						trueText: 'true',
						falseText: 'false' ,
						hidden : false //'{4 < 3}'
					},
			]}]			
		});

	this.refresh(dewar);
	return this.panel;
};