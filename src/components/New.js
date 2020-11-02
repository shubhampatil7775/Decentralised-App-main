import React, { Component } from 'react'

class New extends Component {


    try() {
        const tryTable=document.getElementById('table');
        const table=tryTable.getElementsByTagName('tbody')[0];
        
        var row1=table.insertRow();
                for(var i=0;i<2;i++)
                {
                   
                    var col1=row1.insertCell(i);
                    var newText1  = document.createElement('span');
                    newText1.innerHTML="hello";
                    col1.appendChild(newText1);
                }

                var col1=row1.insertCell(2);
                var newText1  = document.createElement('span');
                newText1.innerHTML="nexthelo";
                col1.appendChild(newText1);

                var col1=row1.insertCell(3);
                var newText1  = document.createElement('span');

                var temnewText  = document.createElement('BUTTON');
                temnewText.innerHTML="Accept";
                temnewText.style.backgroundColor="lightgreen"
                newText1.appendChild(temnewText);
                col1.appendChild(newText1);
    }


    render() {
        return (
            <div>
                
                <div id="tablesection">
                        <table id="table" border="1px" >
                                    <tbody>
                                    
                                    <tr>
                                            <td>ID</td><td>House Name</td> <td>Requesting user</td> <td>Status</td>
                                    </tr>
                                    </tbody>
                                    


                                </table>
                        </div>
                        <button onClick={this.try}>click</button>
            </div>
        )
    }
}

export default New
