<table class="table">
  <thead style='font-weight:bold;'>
    <tr>
     <th colspan="4" class="text-center">
        
      </th>
      <th colspan="5" class="text-center" style='border-left:1px solid gray;'>
        MX
      </th>
       <th colspan="3" class="text-center"  style='border-left:1px solid gray;'>
        BioSAXS
      </th>
       <th colspan="2" class="text-center"  style='border-left:1px solid gray;border-right:1px solid gray;'>
        EM
      </th>      
    </tr>
     <tr>
       <th  >
        Start
      </th>
       <th >
        Beamline
      </th>
       <th >
        Proposal
      </th>     
        <th  >
        Local Contact
      </th>
      <th >
       En. Scans
      </th>
      <th>
       XRF
      </th>
      <th>
       Samples
      </th>
      <th>
       Tests
      </th>
      <th>
       Collects
      </th>
       <th>
      Calibration
      </th>
      <th>
       SC
      </th>
      <th>
       HPLC
      </th>
      <th>
       Grid
      </th>
      <th>
       Movie
      </th>  
      <th style="width:400px;">
       Comments
      </th>     
    </tr>
  </thead>


   <body> 
   {#.}         
     <tr>
       <td colspan="1">
        <a href='{.dataCollectionURL}'>{@formatDate date=BLSession_startDate format="DD-MM-YYYY" /}</a>
      </td>
       <td colspan="1" >
        <a href='{.dataCollectionURL}'>{.beamLineName}</a>
      </td>
       <td colspan="1" >
       {?expSessionPk}
            <a  target="_blank" href="https://wwws.esrf.fr/misapps/SMISWebClient/protected/aform/manageAForm.do?action=view&currentTab=howtoTab&expSessionVO.pk={.expSessionPk}" class='btn btn-xs'><span class='glyphicon glyphicon-list-alt'></span></a>
        {/expSessionPk}
        <a href='{.dataCollectionURL}'>{.Proposal_proposalCode}{.Proposal_ProposalNumber}</a>
      </td>
      
      <td colspan="1" >
        {.beamLineOperator}
      </td>
      <td >
            <div style="text-align:center;">
                {@gt key=energyScanCount value=0} 
                    <span style="background-color:#207a7a;" class="badge">{.energyScanCount}</span>
                {/gt}
            </div>
      </td>
      <td >
            <div style="text-align:center;">
                {@gt key=xrfSpectrumCount value=0} 
                    <span style="background-color:#207a7a;" class="badge">{.xrfSpectrumCount}</span>
                {/gt}
            </div>
      </td>
      <td >
            <div style="text-align:center;">
                {@gt key=sampleCount value=0} 
                    <span style="background-color:#207a7a;" class="badge">{.sampleCount}</span>
                {/gt}
            </div>
      </td>
      <td >
            <div style="text-align:center;">
                {@gt key=testDataCollectionGroupCount value=0} 
                    <span style="background-color:#207a7a;" class="badge">{.testDataCollectionGroupCount}</span>
                {/gt}
            </div>
      </td>
      <td >
             <div style="text-align:center;">
                {@gt key=dataCollectionGroupCount value=0} 
                    {@eq key=EMdataCollectionGroupCount value=0}             
                        <span style="background-color:#207a7a;" class="badge">{.dataCollectionGroupCount}</span>
                    {/eq}
                {/gt}
             </div>
      </td>
      <td >
             <div style="text-align:center;">
                    {@gt key=calibrationCount value=0}                                  
                            <span style="background-color:#207a7a;" class="badge">{.calibrationCount}</span>                       
                    {/gt}
               
             </div>
      </td> 
      <td >
              <div style="text-align:center;">
                    {@gt key=sampleChangerCount value=0} 
                                  
                            <span style="background-color:#207a7a;" class="badge">{.sampleChangerCount}</span>
                        
                    {/gt}
               
             </div>
      </td>
      <td >
             <div style="text-align:center;">
                    {@gt key=hplcCount value=0} 
                                    
                            <span style="background-color:#207a7a;" class="badge">{.hplcCount}</span>
                        
                    {/gt}
               
             </div>
      </td>
      <td >
             <div style="text-align:center;">
                    {@gt key=EMdataCollectionGroupCount value=0}                               
                            <span style="background-color:#207a7a;" class="badge">{.EMdataCollectionGroupCount}</span>                        
                    {/gt}
               
             </div>
      </td>  
        <td >
             <div style="text-align:center;">
                    {@gt key=EMdataCollectionGroupCount value=0}                                     
                            <span style="background-color:#207a7a;" class="badge">{.imagesCount}</span>                       
                    {/gt}
               
             </div>
      </td>  
       <td >
            <div style="width:50px; wordWrap: break-word;"><a class="btn btn-xs"><span id="{.sessionId}-edit-comments" class="glyphicon glyphicon-edit session-comment-edit"></span></a><span id="comments_{.sessionId}">{.comments}</span></div>
      </td>     
    </tr>
    {/.}
  </body>


  </table>