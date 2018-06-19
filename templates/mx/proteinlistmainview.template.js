<div class="container-fluid">
   <div class="panel with-nav-tabs panel-default">
      <div class="panel-heading clearfix">
         <div class="pull-left">
            <span style='font-size:14px;color:blue;' >
                <kbd style='background-color:#CCCCCC;color:blue;'>
                    {.acronym}
                </kbd>  
                <span style='font-size:12px;color:gray;'>
                    {?latestDataCollectionTime}
                        Collected last time on {.latestDataCollectionTime}
                    {/latestDataCollectionTime}
                </span>                                   
            </span>
            <p><b>{.name}</b></p>
         </div>
         <div class="pull-right">
            <ul class="nav nav-tabs" id="myTabs">
               <li class="active"><a data-toggle="tab" href="#datacollection_{.DataCollection_dataCollectionId}"> Summary</a></li>
            </ul>
         
         </div>        
         </div>
         <div class="tab-content">
            <div id="datacollection_{.DataCollection_dataCollectionId}" class="tab-pane fade in active">
               <div class="container-fluid">
                  <div class="row">
                   <br />
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-2">
                                {>"first.proteinlistmainview.template"  /}                             
                            </div>
                            <div class="col-sm-2">
                                {>"second.proteinlistmainview.template"  /}  
                            </div> 
                        </div> 
                     
                  </div>
               </div>
            </div>
         </div>
   </div>     
</div>         
         
