function CSVContainerSpreadSheet(args){
	this.id = BUI.id();


    this.cells = function(){		
		cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties){
			Handsontable.renderers.TextRenderer.apply(this, arguments);
			td.style.fontWeight = 'bold';
			td.style.color = 'green';
			td.style.background = '#CEC';
		}
	}

	args.cells = this.cells;


	SpreadSheet.call(this, args);

    /** Cache to store crystal indexed by protein acronym this.crystals["acroynm"] -> last crystal */
    this.crystals = {};

	/** Cache of proteins of the sessions */
	this.proteins = {};
	/** Array of arrays with the list of crystal form by protein acronym */
    this.crystalFormList = {};

    this.renderCrystalFormColumn = false;

    if (args != null) {
		if (args.renderCrystalFormColumn != null) {
			this.renderCrystalFormColumn = args.renderCrystalFormColumn;
		}
	}

    this.crystalInfoToIdMap = {};

	this.crystalFormIndex = -1;
	// this.unitCellIndex = -1;
	this.spaceGroupIndex = -1;
	
	this.onModified = new Event(this);

	this.count = 0;

	this.cellColorBackground = this.getDifferentColors();
}

CSVContainerSpreadSheet.prototype.getPanel = SpreadSheet.prototype.getPanel;
CSVContainerSpreadSheet.prototype.setLoading = SpreadSheet.prototype.setLoading;
CSVContainerSpreadSheet.prototype.getAcronyms = SpreadSheet.prototype.getAcronyms;
CSVContainerSpreadSheet.prototype.getHeaderWidth = SpreadSheet.prototype.getHeaderWidth;
CSVContainerSpreadSheet.prototype.getHeaderId = SpreadSheet.prototype.getHeaderId;
CSVContainerSpreadSheet.prototype.getHeaderText = SpreadSheet.prototype.getHeaderText;
CSVContainerSpreadSheet.prototype.getColumns = SpreadSheet.prototype.getColumns;
CSVContainerSpreadSheet.prototype.getData = SpreadSheet.prototype.getData;
CSVContainerSpreadSheet.prototype.loadData = SpreadSheet.prototype.loadData;
CSVContainerSpreadSheet.prototype.setDataAtCell = SpreadSheet.prototype.setDataAtCell;
CSVContainerSpreadSheet.prototype.getColumnIndex = SpreadSheet.prototype.getColumnIndex;
CSVContainerSpreadSheet.prototype.disableAll = SpreadSheet.prototype.disableAll;
CSVContainerSpreadSheet.prototype.setContainerType  = SpreadSheet.prototype.setContainerType;
CSVContainerSpreadSheet.prototype.updateNumberOfRows  = SpreadSheet.prototype.updateNumberOfRows;
CSVContainerSpreadSheet.prototype.emptyRow  = SpreadSheet.prototype.emptyRow;
CSVContainerSpreadSheet.prototype.parseTableData  = ContainerSpreadSheet.prototype.parseTableData;

CSVContainerSpreadSheet.prototype.disableAll  = ContainerSpreadSheet.prototype.disableAll;



CSVContainerSpreadSheet.prototype.getDifferentColors = function(){	
	return ["#e6f7ff", "#99ddff", "#4dc3ff", "#00aaff"];

};

CSVContainerSpreadSheet.prototype.loadData = function(data){

      var _this = this;
	  function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
	    Handsontable.renderers.TextRenderer.apply(this, arguments);
	    td.style.fontWeight = 'bold';
	    td.style.color = 'green';
	    td.style.fontSize = '9px';
	    td.style.background = '#CEC';
	  }
	  
	  function ValueRenderer(instance, td, row, col, prop, value, cellProperties) {
	        Handsontable.renderers.TextRenderer.apply(this, arguments);
	        debugger
		
		
	  }
	  	  		
	  // maps function to lookup string
	  Handsontable.renderers.registerRenderer('ValueRenderer', ValueRenderer);	 
	  this.spreadSheet = new Handsontable(
		  document.getElementById(this.id + '_samples'), {
		  		afterCreateRow: function (index, numberOfRows) {
                    data.splice(index, numberOfRows);
                },
				beforeChange: function (changes, source) {
					lastChange = changes;
				},
				afterChange: function (changes, source) {
						  			
				},
				cells: function (row, col, prop) {	
					// var cellProperties = {};
					 //cellProperties.renderer = 	ValueRenderer;
					// return cellProperties;										
				},
				data: data,
				height : this.height,
				width : this.width,
				manualColumnResize: true,
				colWidths: this.getHeaderWidth(),
				colHeaders: this.getHeaderText(),
				stretchH: 'last',
				columns: this.getColumns(),
		});
}

/** Parcels and dewars are the same */
CSVContainerSpreadSheet.prototype.getParcelsByRows = function(rows) {
	return _.groupBy(rows, "parcel");
};

CSVContainerSpreadSheet.prototype.getContainersByRows = function(rows) {
	return _.groupBy(rows, "containerCode");
};
/**
* Returns a set of parcels
*
* @method getParcels
*/
CSVContainerSpreadSheet.prototype.getParcels = function() {
	function  getDiffrationPlanByRow(row){
		return {
			radiationSensivity : row["Radiation Sensitivity"],
			requiredCompleteness : row["Required Completeness"],
			requiredMultiplicity : row["Required multiplicity"],
			forcedSpaceGroup : row["forced"],
			experimentKind : row["experimentKind"]

		};
	};

    function getProteinByAcronym(acronym){
		var proteins = EXI.proposalManager.getProteinByAcronym(acronym);
		if (proteins){
			if (proteins.length > 0){
				return proteins[0];
			}
		}
    };

	function  getCrystalByRow(row){
		return {
			spaceGroup : row["Space Group"],
			cellA : row["a"],
			cellB : row["b"],
			cellC : row["c"],
			cellAlpha : row["alpha"],
			cellBeta : row["beta"],
			cellGamma : row["gamma"],
			proteinVO : getProteinByAcronym(row["Protein Acronym"])
		};
	};

	function getSamplesByContainerRows(rows){
		var samples3vo = [];
		if (rows){
			for(var i = 0; i< rows.length; i++){
				samples3vo.push({
					name : rows[i]["Sample Name"],
					location : rows[i]["position"],
					diffractionPlanVO : getDiffrationPlanByRow(rows[i]),
					crystalVO : getCrystalByRow(rows[i]),				
					smiles : rows[i]["Smiles"],

				});
			}
		}
		return samples3vo;
	};

	function getContainerType(rows){		
		if (rows){
			if (rows[0]){
				if (rows[0].containerType){
					return rows[0].containerType;
				}
			}
		}
	};

	function getContainerCapacity(rows){		
		if (rows){
			if (rows[0]){
				if (rows[0].containerType){
					 if (rows[0].containerType.toUpperCase() == "SPINEPUCK"){
						 return 10;
					 }
					 return 16;
				}
			}
		}
	};
	
	
	var rows = this.parseTableData();
		
	

	var dewars3vo = [];
	var parcels = this.getParcelsByRows(rows);
	for(var parcel in parcels){
		
		/** dewars3vo: JSON object with perfect macthing with 3VO ISPyB objects */
		var containerVOs = [];
		var containers = this.getContainersByRows(parcels[parcel]);
		for (key in containers){
			var containerRows = containers[key];	
					
			containerVOs.push({
				code : _.trim(containerRows[0].containerCode),		
				containerType : getContainerType(containerRows),
				capacity :		getContainerCapacity(containerRows),
				sampleVOs : getSamplesByContainerRows(containerRows)
			});			
			
		}
		
		dewars3vo.push({
			code : _.trim(parcel),
			type : 'Dewar',
			containerVOs : containerVOs
		});		
	}	       
	return dewars3vo;
};


/**
* Method executed when a change is made on the spreadSheet. It manages the process when the crystal form or the protein acronym are changed
*
* @method manageChange
* @param {Array} change The change made to the spreadSheet as an array of the form [row, column, prevValue, newValue]
* @param {String} source The kind of change. Can be "edit" or "autofill"
* @param {Integer} direction In case of the source being autofill, this parameter indicates the direction of it
*/
CSVContainerSpreadSheet.prototype.manageChange = function (change, source, direction){
	var rowIndex = change[0];
	var prevValue = change[3];

	switch (change[1]) { //Column Index

		/** If crystal form has changed */
		case this.crystalFormIndex : {					
			break;
		}

	    /** If acronym form has changed */
		case this.getColumnIndex("Protein Acronym") : {		
           
			break;
		}

		 /** If sample name form has changed */
		case this.getColumnIndex("Sample group") : {		
          
			break;
		}
	}
	
	$(".htInvalid").removeClass("htInvalid");	
};




CSVContainerSpreadSheet.prototype.getHeader = function() {	
    var _this = this;
	var header = [];
	var disabledRenderer = function(instance, td, row, col, prop, value, cellProperties){
		if (value != undefined){
			td.innerHTML = value;
		}
		td.style.background = '#DDD';
	}

	var mandatoryParameterRenderer = function(instance, td, row, col, prop, value, cellProperties){				
		if ((value == undefined)||(value == "")){					
			td.className = 'custom-row-text-required';			
		}
		else{				
			td.innerHTML = value;		
		}		
	}
	 
	 
    header = [
            // { text :'', id :'crystalId', column : {width : 100}}, 
            { text : 'Parcel', 	id: 'parcel', column : {width : 80}}, 
			{ text : 'Container', 	id: 'containerCode', column : {width : 80}}, 
			{ text : 'Type', 	id: 'containerType', column : {width : 80}}, 
			{ text : '#', 	id: 'position', column : {width : 20}}, 
            { text :'Protein <br />Acronym', id :'Protein Acronym', 	column :  {
                                                                                        width : 80,
                                                                                        type: 'dropdown',
																						renderer: mandatoryParameterRenderer,
                                                                                        source: this.getAcronyms()
                                                                                    }
            }, 
            { text :'Sample<br /> Name', id :'Sample Name', column : {width : 120}}, 
            { text :'Pin <br />BarCode', id : 'Pin BarCode', column : {width : 60}},  
          
			
            { text :'Exp.<br /> Type', id : 'experimentKind', column : {
                                                                        width : 100,  
                                                                        type: 'dropdown',
																		renderer: mandatoryParameterRenderer,
                                                                        source: [ "Default", "MXPressE", "MXPressO", "MXPressI", "MXPressE_SAD", "MXScore", "MXPressM", "MXPressP", "MXPressP_SAD" ]
                                                                    }
            }, 
           
            { text :'Space <br />group',  id : 'Space Group', column : {
                                                                        width : 70,  
                                                                        type: 'dropdown',																		
																	    renderer: mandatoryParameterRenderer,
																		source: _.concat([""], ExtISPyB.spaceGroups)
                                                                    }}, 
            { text :'a',  id :'a', column : {width : 40}}, 
			{ text :'b',  id :'b', column : {width :40}}, 
			{ text :'c',  id :'c', column : {width :40}}, 
			{ text :'&alpha;',  id :'alpha', column : {width : 40}}, 
			{ text :'&beta;',  id :'beta', column : {width : 40}}, 
			{ text :'&gamma;',  id :'gamma', column : {width : 40}}, 
            { text :'Beam <br />Diameter', id :'Pref. Diameter',column : {width : 60}}, 
            { text :'Number of<br /> positions', id :'Number Of positions', column : {width : 80}}, 
            { text :'Radiation<br /> Sensitivity', id :'Radiation Sensitivity', column : {width : 80}}, 

            { text :'Required<br /> multiplicity', id :'Required multiplicity', column : {width : 60}}, 
            { text :'Required<br /> Completeness', id :'Required Completeness', column : {width : 80}},            
			{ text :'Forced <br /> SG',  id :'forced', column : {
                                                                        width : 70,  
                                                                        type: 'dropdown',
																		source: _.concat([""], ExtISPyB.spaceGroups)
                                                                    }}, 

            { text :'Smiles', id :'Smiles', column : {width : 60}}, 
            { text :'Comments', id :'Comments', column : {width : 200}}
            ];

    

    return header;
};
