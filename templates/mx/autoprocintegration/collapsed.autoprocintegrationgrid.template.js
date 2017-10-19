<div class="container-fluid">
   <div class="row">
      <div class="col-xs-12 col-md-2">

         <table class="table table-striped table-hover">
            <thead>
               <tr>                                   
                  <th></th>
                  <th>Pipeline</th>
                  <th>SpaceGroup</th>
                  <th>a (&#197;)</th>
                  <th> b (&#197;)</th>
                  <th> c (&#197;)</th>
                  <th>&#x3B1; (&deg)</th>
                  <th>&beta; (&deg)</th>
                  <th>&gamma; (&deg)</th>
                  <th>Shell</th> 
                  <th>Resolution (&#197;)</th>
                  <th>Multiplicity</th>
                  <th>Completeness %</th> 
                  <th>I/Sigma (I)</th>
                  <th>Rmeas</th> 
                  <th>Rmerge</th>
                  <th>Rpim</th>
                  <th>cc(1/2)</th> 
                  <th>ccAno</th>
                  <th>sigAno</th>
                  <th>ISA</th>
                  <th>Download</th>
                  <th></th>
               </tr>
            </thead> 
            {#.}
                  {@select key=v_datacollection_processingStatus}
                        {@eq value="SUCCESS"} {>"success.collapsed.autoprocintegrationgrid.template" /}  {/eq}
                        {@eq value="RUNNING"} {>"running.collapsed.autoprocintegrationgrid.template" /} {/eq}
                        {@eq value="FAILED"} {>"failed.collapsed.autoprocintegrationgrid.template" /} {/eq}
                        {@eq value="1"} {>"success.collapsed.autoprocintegrationgrid.template" /} {/eq}
                        {@eq value="0"} {>"failed.collapsed.autoprocintegrationgrid.template" /} {/eq}
                  {/select}

            {/.}
         </table>  
        
      </div>
   </div>
</div>
