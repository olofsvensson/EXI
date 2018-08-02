

function AbinitioGrid(args) {
	this.height = null;
	this.width = null;
	this.id = BUI.id();

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;

			if (args.width != null) {
				this.width = args.width;
			}
		}
	}

	this.onSelected = new Event(this);
}


AbinitioGrid.prototype.refresh = function (subtractions) {
	debugger
	this.subtractions = subtractions;
	$('#' + this.id).html(this.doTemplate(this._prepareData(subtractions)));
};

AbinitioGrid.prototype._prepareData = function (subtractions) {
	/** Parsing data * */
	var models = [];
	for (var l = 0; l < subtractions.length; l++) {
		var subtraction = subtractions[l];
		for (var k = 0; k < subtraction.substractionToAbInitioModel3VOs.length; k++) {
			var data = subtraction.substractionToAbInitioModel3VOs[k].abinitiomodel3VO;
			var model = null;
			if (data.averagedModel != null) {
				models.push(data.averagedModel);
				models[models.length - 1].type = "Reference";
				models[models.length - 1].pdbURL = EXI.getDataAdapter().saxs.model.getPDBByModelId(subtraction.subtractionId, data.averagedModel.modelId);
				models[models.length - 1].firURL = EXI.getDataAdapter().saxs.model.getFirByModelId(subtraction.subtractionId, data.averagedModel.modelId);
				models[models.length - 1].logURL = EXI.getDataAdapter().saxs.model.getLogByModelId(subtraction.subtractionId, data.averagedModel.modelId);
				
			}

			if (data.shapeDeterminationModel != null) {
				models.push(data.shapeDeterminationModel);
				models[models.length - 1].type = "Refined";
				models[models.length - 1].pdbURL = EXI.getDataAdapter().saxs.model.getPDBByModelId(subtraction.subtractionId, data.shapeDeterminationModel.modelId);
				models[models.length - 1].firURL = EXI.getDataAdapter().saxs.model.getFirByModelId(subtraction.subtractionId, data.shapeDeterminationModel.modelId);						
				models[models.length - 1].logURL = EXI.getDataAdapter().saxs.model.getLogByModelId(subtraction.subtractionId, data.shapeDeterminationModel.modelId);						
						
			}

			if (data.modelList3VO != null) {
				if (data.modelList3VO.modeltolist3VOs != null) {
					for (var i = 0; i < data.modelList3VO.modeltolist3VOs.length; i++) {
						models.push(data.modelList3VO.modeltolist3VOs[i].model3VO);
						models[models.length - 1].type = "Model";
						models[models.length - 1].pdbURL = EXI.getDataAdapter().saxs.model.getPDBByModelId(subtraction.subtractionId, data.modelList3VO.modeltolist3VOs[i].model3VO.modelId);						
						models[models.length - 1].firURL = EXI.getDataAdapter().saxs.model.getFirByModelId(subtraction.subtractionId, data.modelList3VO.modeltolist3VOs[i].model3VO.modelId);						
						models[models.length - 1].logURL = EXI.getDataAdapter().saxs.model.getLogByModelId(subtraction.subtractionId, data.modelList3VO.modeltolist3VOs[i].model3VO.modelId);						
					}
				}
			}
		}
	}	
	return models;
};

AbinitioGrid.prototype.doTemplate = function (data) {
	var html = "";
	/** NSD image URL */
	var NsdURL= null;
	var Chi2RgURL= null;
	if (this.subtractions){
		if (this.subtractions.length > 0){
			var subtractionId = this.subtractions[0].subtractionId;
			try{				
				var modelListId = this.subtractions[0].substractionToAbInitioModel3VOs[0].abinitiomodel3VO.modelList3VO.modelListId;
				NsdURL = EXI.getDataAdapter().saxs.model.getNSDURLbyModelListId(subtractionId, modelListId);
				Chi2RgURL = EXI.getDataAdapter().saxs.model.getChi2RgURLbyModelListId(subtractionId, modelListId);
			}
			catch(e){
				console.log("No modelListId found");
			}
		}

	}
	debugger
	/** Id that will be the identifier of the DIV container */	
	dust.render("abinitiogrid.template", {NsdURL: NsdURL, Chi2RgURL:Chi2RgURL, id : this.id, models:data}, function (err, out) {
		html = html + out;
	});
	return html;
};

AbinitioGrid.prototype.getPanel = function () {
	return {
		html: this.doTemplate([]),
		autoScroll: true,
		border: 1,
		padding: 0,
		height: this.height
	};
};