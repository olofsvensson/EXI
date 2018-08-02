function ModelSaxsDataAdapter(args){
	DataAdapter.call(this, args);
}

ModelSaxsDataAdapter.prototype.get = DataAdapter.prototype.get;
ModelSaxsDataAdapter.prototype.post = DataAdapter.prototype.post;
ModelSaxsDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


ModelSaxsDataAdapter.prototype.getNSDURLbyModelListId = function(subtractionId, modelListId){
    return this.getUrl('/{token}/proposal/{proposal}/saxs/subtraction/{0}/modellist/{1}/nsd'.format([ subtractionId,modelListId ]));
};

ModelSaxsDataAdapter.prototype.getChi2RgURLbyModelListId = function(subtractionId, modelListId){
    return this.getUrl('/{token}/proposal/{proposal}/saxs/subtraction/{0}/modellist/{1}/chi2rg'.format([ subtractionId,modelListId ]));
};

ModelSaxsDataAdapter.prototype.getPDBByModelId = function(subtractionId, modelId){
    return this.getUrl('/{token}/proposal/{proposal}/saxs/subtraction/{0}/model/{1}/pdb'.format([ subtractionId,modelId ]));
};

ModelSaxsDataAdapter.prototype.getFirByModelId = function(subtractionId, modelId){
    return this.getUrl('/{token}/proposal/{proposal}/saxs/subtraction/{0}/model/{1}/fir'.format([ subtractionId,modelId ]));
};

ModelSaxsDataAdapter.prototype.getFitByModelId = function(subtractionId, modelId){
    return this.getUrl('/{token}/proposal/{proposal}/saxs/subtraction/{0}/model/{1}/fit'.format([ subtractionId,modelId ]));
};

ModelSaxsDataAdapter.prototype.getLogByModelId = function(subtractionId, modelId){
    return this.getUrl('/{token}/proposal/{proposal}/saxs/subtraction/{0}/model/{1}/log'.format([ subtractionId,modelId ]));
};
