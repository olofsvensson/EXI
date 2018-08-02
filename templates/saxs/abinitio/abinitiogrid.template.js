
<div id={.id} class="container-fluid">
    <div class="row">
        <div class="col-xs-6 col-md-6">
            <img src={.NsdURL} style='height:400px;'/>
        </div>
        <div class="col-xs-6 col-md-6">
            <img src={.Chi2RgURL} style='height:400px;'/>        
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th >Type</th>
                        <th >chiSqrt</th>
                        <th >rFactor</th>
                        <th >Rg</th>
                        <th >PDB</th>
                        <th >Fir</th>
                        <th >Log</th>

                    </tr>

                </thead>

                {#.models}
                <tr class={.rowClass}>
                    <td>{.type}</td>
                    <td>{@decimal key="chiSqrt" decimals=3 /}  </td>
                    <td>{@decimal key="rfactor" decimals=3 /} </td>
                    <td>{@decimal key="rg" decimals=3 /} </td>
                    <td><a href='{.pdbURL}' target='_blank'>{.pdbFile}</a> <a href='../viewer/uglymol/index.html?pdb={.pdbURL}'  target='_blank'><span class="glyphicon glyphicon-eye-open"></span></a></td>
                    <td><a href='{.firURL}' target='_blank'>{.firFile}</a></td>
                    <td><a href='{.logURL}' target='_blank'>{.logFile}</a></td>
                </tr>
                {/.models}
            </table>
        </div>
        </div>
    </div>