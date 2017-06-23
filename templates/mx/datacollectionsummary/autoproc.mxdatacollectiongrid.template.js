{#.onlineresults[0]}  
    {@gte key=innerShell.rMerge value=10}     
        <div style='color:gray;'>
    {:else}
        <div>
     {/gte}
            {>"completeness.autoproc.mxdatacollectiongrid.template"  /}
            <br />                    
            {>"unitcell.autoproc.mxdatacollectiongrid.template"  /}         
        </div>
    
{/.onlineresults[0]}
