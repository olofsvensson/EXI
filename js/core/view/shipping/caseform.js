/**
 * @showTitle
 *
 * #onSaved
 * #onAddPlates
 * #onRemovePlates
 **/
function CaseForm(args) {
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

CaseForm.prototype.fillStores = function() {
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

CaseForm.prototype.refresh = function(dewar) {
	this.setDewar(dewar);
};

CaseForm.prototype.getDewar = function() {
	this.dewar.code = Ext.getCmp(this.id + "dewar_code").getValue();
	this.dewar.comments = Ext.getCmp(this.id + "dewar_comments").getValue();
	this.dewar.transportValue = Ext.getCmp(this.id + "dewar_transportValue").getValue();
	this.dewar.isReimbursed = Ext.getCmp(this.id + "dewar_isReimbursed").getValue();
	this.dewar.storageLocation = this.storageLocationComboBox.getValue();
	//this.dewar.firstExperimentId = this.sessionsCombo.getValue();

	return this.dewar;
};

CaseForm.prototype.setDewar = function(dewar) {
	this.dewar = dewar;
	
	if (this.dewar == null){
		this.dewar={};
		this.dewar["code"] = "";
		this.dewar["transportValue"] = "";
		this.dewar["storageLocation"] = "";
		this.dewar["isReimbursed"] = "";
		this.dewar["comments"] = "";
	}
	
	Ext.getCmp(this.id + "dewar_code").setValue(this.dewar.code);
	Ext.getCmp(this.id + "dewar_comments").setValue(this.dewar.comments);
	Ext.getCmp(this.id + "dewar_transportValue").setValue(this.dewar.transportValue);
	Ext.getCmp(this.id + "dewar_isReimbursed").setValue(this.dewar.isReimbursed);
	this.storageLocationComboBox.setValue(this.dewar.storageLocation);
	/*if (this.dewar.sessionVO != null) {
		this.sessionsCombo.setValue(this.dewar.sessionVO.sessionId);
	}*/
	
	if (dewar.isReimbursed){
		this.isSelectedForReimb = " (R)";
	} else {
		this.isSelectedForReimb = "";
	}
	
};

/*
CaseForm.prototype.getSessionCombo = function() {
	this.sessionsCombo = BIOSAXS_COMBOMANAGER.getComboSessions(EXI.proposalManager.getFutureSessions(), {
		labelWidth : 200,
		margin : '5 0 00 0',
		width : 500
	});
	return this.sessionsCombo;
};*/

CaseForm.prototype.getStorageLocationCombo = function() {
	this.storageLocationComboBox =  BIOSAXS_COMBOMANAGER.getComboStorageTemperature();
	return this.storageLocationComboBox;
};

CaseForm.prototype.getPanel = function(dewar) {
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
				items : [ {
					xtype : 'container',
					layout : 'vbox',
					items : [ {
						xtype : 'requiredtextfield',
						fieldLabel : 'Name',
						allowBlank : false,
						name : 'code',
						id : this.id + 'dewar_code',
						labelWidth : 200,
						width : 500
					},
					]
					}, 
					this.getStorageLocationCombo(),
					{
						xtype : 'numberfield',
						width : 500,
						labelWidth : 200,
						margin : '10 0 0 0',
						fieldLabel : 'Transport Value',
						id : this.id + 'dewar_transportValue'
					},
					{
						xtype : 'textareafield',
						name : 'comments',
						fieldLabel : 'Comments',
						labelWidth : 200,
						width : 500,
						margin : '10 0 0 0',
						height : 100,
						id : this.id + 'dewar_comments'
					},
					{           
						xtype: 'checkbox',
						fieldLabel : 'By setting this dewar to reimbursed, the labels that will be generated for the sending will contain the fedex account that you should use to send your dewars.Please note that you MUST NOT use this account to ship more than the allowed number of dewars.In case of abuse, your proposal will no more be able to benefit from the dewar reimbursement. Click on the following checkbox if you agree with these conditions and you want to have this dewar automatically reimbursed.',
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