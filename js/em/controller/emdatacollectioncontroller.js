/**
* This is the description for routing all the puck actions. It means url= #/mx/datacollection/*
*
* @class EMDataCollectionController
* @constructor
*/
function EMDataCollectionController() {
	this.init();
}

EMDataCollectionController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
EMDataCollectionController.prototype.notFound = ExiGenericController.prototype.notFound;


/**
* Inits the controller for the puck related objects
* Paths accepted:
* #/mx/datacollection/protein_acronym/:acronmys/main
* #/mx/datacollection/session/:sessionId/main
*
* @method init
*/
EMDataCollectionController.prototype.init = function() {
	var _this = this;
	var listView;	
    
	Path.map("#/em/datacollection/:datacollectionId/main").to(function() {
		var mainView = new DataCollectionEmMainView();
		EXI.addMainPanel(mainView);
        EXI.hideNavigationPanel();
		var onSuccess = function(sender, data){
			
			mainView.loadCollections(data);
		};
		
		EXI.getDataAdapter({onSuccess : onSuccess}).em.dataCollection.getMoviesDataByDataCollectionId(this.params['datacollectionId']);
	}).enter(this.setPageBackground);

	Path.map("#/em/proposal/:proposalId/datacollection/session/:sessionId/main").to(function() {	
			
		var mainView = new DataCollectionMxMainView({sessionId : this.params['sessionId']});
		
		EXI.addMainPanel(mainView);
        EXI.hideNavigationPanel();
		EXI.setLoadingMainPanel(true);
		/*
		var onSuccessProposal = function (sender,proposal) {			
			if (proposal && proposal.length > 0) {
				mainView.loadProposal(proposal[0]);
			}
		}
		EXI.getDataAdapter({onSuccess : onSuccessProposal}).proposal.proposal.getProposalBySessionId(this.params['sessionId']);*/

		var onSuccess = function(sender, data){						
		    mainView.loadCollections(data);
		    EXI.setLoadingMainPanel(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).em.dataCollection.getDataCollectionViewBySessionId(this.params['sessionId']);
		
        
	}).enter(this.setPageBackground);


};
