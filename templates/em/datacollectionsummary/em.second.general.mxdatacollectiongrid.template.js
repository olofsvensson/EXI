<table class="table"> 
     <tr>
        <td></td>        
        <td>Movies</td>
        <td>Motion Correction</td>
        <td> CTF</td>
    </tr>               
    {#gridSquares}
    <tr>
        <td  class='column_parameter_value'><a href='#/em/datacollection/{.DataCollection_dataCollectionId}/main'>Grid Square #{.name}</a></td>        
        <td  class='column_parameter_value text-center'>{.movieCount}</td>
        <td  class='column_parameter_value text-center'>{.motionCorrectionCount}</td>
        <td  class='column_parameter_value text-center'>{.ctfCount}</td> 
        
    </tr>
    {/gridSquares}   
</table> 

