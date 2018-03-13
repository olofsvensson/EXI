<div class="container-fluid">
   <table class="table">
      <thead class="table-fixed ">
       <tr>
            <td colspan='9' style="text-align:center;" class="sessiogridtechnique">
               
            </td>
            <td colspan='4' style="text-align:center;" class="sessiogridtechnique">
               Data Collection
            </td>
            <td colspan='4' style="text-align:center;" class="sessiogridtechnique">
               Online Data Analysis
            </td>
             <td style="text-align:center;" class="sessiogridtechnique">
               EM
            </td>
             <td style='width:400px'>
               
            </td>
            </tr>
         <tr>
            <td>
               Acronym
            </td>
            <td colspan='4'  style="text-align:center;" class="mxsessiongridheader">
               Name
            </td>
             <td  style="text-align:center;" class="mxsessiongridheader">
               Crystals
            </td>
             <td  style="text-align:center;" class="mxsessiongridheader">
               Samples
            </td>
             <td  colspan='2'  style="text-align:center;" class="mxsessiongridheader">
               Sessions
            </td>
           
            <td style="text-align:center;" class="mxsessiongridheader">
               En. Scans
            </td>
            <td style="text-align:center;" class="mxsessiongridheader">
               XRF
            </td>
            
            <td style="text-align:center;" class="mxsessiongridheader">
               Tests
            </td>
            <td style="text-align:center;" class="mxsessiongridheader">
               Collects
            </td>
            <td style="text-align:center;" class="saxssessiongridheader">
               SAD
            </td>
            <td style="text-align:center;" class="saxssessiongridheader">
               MR
            </td>
            <td colspan='2' style="text-align:center;" class="saxssessiongridheader">
               Solved by SAD
            </td>
            <td style="text-align:center;" class="emsessiongridheader">
               Gridsquares
            </td>
            <td style='width:400px;' > 
               Comments
            </td>
         </tr>
      </thead> 
      <tbody class="table-fixed"  style='height:600px;'>
         {#.}         
         {@gt key=DataCollectionGroupCount value=0} 
             <tr>
         {:else}
             <tr class='sessiongrid-no-data-collections'>
         {/gt}
            <td> <a href='{.dataCollectionURL}'>{.acronym}</a></td>
            <td colspan='4' class="mxsessiongridcell"> {.name}</td>
            <td class="mxsessiongridcell" style="text-align:center;"> {.CrystalCount}</td>
            
             <td class="mxsessiongridcell">
               <div style="text-align:center;">
                  {@gt key=BLSampleCount value=0} 
                  <span style="background-color:#207a7a;" class="badge">{.BLSampleCount}</span>
                  {/gt}
               </div> 
            </td>
             <td colspan='2' class="mxsessiongridcell" style="text-align:center;"> 
                {#sessions}
                     <a href='#/mx/datacollection/session/{.sessionId}/main' target='_blank'> {@formatDate date=date format="DD-MM-YYYY" /} @ {.beamline}</a><br/> 
                {/sessions}
            
            </td>

            <td class="mxsessiongridcell">
               <div style="text-align:center;">
                  {@gt key=EnergyScanCount value=0} 
                  <span style="background-color:#207a7a;" class="badge">{.EnergyScanCount}</span>
                  {/gt}
               </div>
            </td>
            <td class="mxsessiongridcell">
               <div style="text-align:center;">
                  {@gt key=XFEFluorescenceSpectrumCount value=0} 
                  <span style="background-color:#207a7a;" class="badge">{.XFEFluorescenceSpectrumCount}</span>
                  {/gt}
               </div>
            </td>
           
            <td class="mxsessiongridcell">
               <div style="text-align:center;">
                  {@gt key=TestDataCollectionCount value=0}                   
                   <a href='#/mx/datacollection/datacollectionid/{.TestDataCollectionIdList}/main' target='_blank'>   
                      <button type="button" class="btn" style='width:50px;'>
                          {!<span  class="badge">{.TestDataCollectionCount}</span>!}
                          <span style='font-size:20px;' class="glyphicon glyphicon-ok"></span>  
                      </button>                       
                  </a>
                  {/gt}

                  
               </div>
            </td>
            <td class="mxsessiongridcell">
               <div style="text-align:center;">
                  {@gt key=DataCollectionGroupCount value=0}     
                  <a href='#/mx/datacollection/datacollectionid/{.DataCollectionIdList}/main'  target='_blank'>   
                      <button type="button" class="btn" style='width:50px;'>
                          {!<span  class="badge">{.DataCollectionGroupCount}</span>!}
                           <span style='font-size:20px;' class="glyphicon glyphicon-ok"></span>  
                      </button>                       
                  </a>
                  {/gt}
               </div>
            </td>
            <td class="saxssessiongridcell">
               <div style="text-align:center;">
                  {@gt key=SADPhasingStepCount value=0}                                  
                        <span style='color:green; font-size:20px;' class="glyphicon glyphicon-ok"></span>                          
                  {/gt}
               </div>
            </td>
            <td class="saxssessiongridcell">
               <div style="text-align:center;">
                  {@gt key=MRPhasingStepCount value=0} 
                  <span style="background-color:#207a7a;" class="badge">{.MRPhasingStepCount}</span>
                  {/gt}
               </div>
            </td>
            <td class="saxssessiongridcell" colspan='2'>
               <div style="text-align:center;">
              

                  {@gt key=ModelBuildingPhasingStepCount value=0} 
                   <a href='#/mx/datacollection/datacollectionid/{.ModelBuildingPhasingStepDataCollectionIdList}/main'  target='_blank'>   
                      <button type="button" class="btn btn-primary">
                          <span  class="badge"  style='font-size:10px'>
                           {#solvedStructureSpaceGroups}
                              {.}<br/>
                          {/solvedStructureSpaceGroups}
                          </span>
                      </button>                       
                  </a>
                  {/gt}
               </div>
            </td>
            <td class="emsessiongridcell">
              --
            </td>
            <td style='width:400px;' > 
               <div style="width:390px; wordWrap: break-word;">
                  <a class="btn btn-xs"><span id="{.sessionId}-edit-comments" class="glyphicon glyphicon-edit session-comment-edit"></span></a>
                  <span id="comments_{.sessionId}">{.comments}</span>
               </div>
            </td>
         </tr>
         {/.} 
      </tbody>
   </table>
</div>