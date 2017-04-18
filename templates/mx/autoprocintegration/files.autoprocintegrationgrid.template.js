


 <div class="container-fluid" class='containerWithScroll' >
    <div class="row" style="height:500px" >
        <div class="col-xs-12 col-md-12"    >        
            <table class="table table-condensed">
              <thead>
                <tr>
                    <th></th>
                    <th>Name</th> 
                    <th>Type</th>
                                               
                </tr>
                </thead>
                
            {#.}
                <tbody>
                    <tr>
                    <td><a href='{.url}'><span class="glyphicon glyphicon-download" style="margin-right:10px;"></span></a></td>
                    <td><a href='{.url}'>{.fileName}</a></td> 
                    <td><kbd style='background-color:#207a7a;'>{.fileType}</kbd></td>                                                                                                         
                    </tr>
                </tbody>               
             {/.}    
             </table>
        </div>
    </div>
 </div>