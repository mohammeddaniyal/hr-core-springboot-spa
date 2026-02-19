window.pages = window.pages || {}

window.pages['designations']={
   load: async function()
    {
        const tableBody=document.getElementById('designationTableBody');

        try
        {
            const designations=await designationService.getAll();

            tableBody.innerHTML='';

            if(designations.length===0)
            {
                tableBody.innerHTML='<tr><td colspan="4">No Records Found</td></tr>';
                return;
            }

            let rowsHTML='';

            designations.forEach((designation,index)=>{

                rowsHTML+=`
                    <tr>
                        <td class="col-serial">${index+1}</td>
                        <td class="col-designation">${designation.title}</td>
                        <td class="col-action">
                            <a href="#" onclick="loadModule('designation-form', {id: '${designation.code}', mode:'EDIT'}); return false;">Edit</a>
                        </td>
                        <td class="col-action">
                            <a href="#" onclick="loadModule('designation-delete-confirm', {id: '${designation.code}'}); return false;">Delete</a>
                        </td>
                    </tr>
                `;
            });

            tableBody.innerHTML=rowsHTML;

        }catch(error)
        {
            console.log(error);
            tableBody.innerHTML = `<tr><td colspan="4" style="color:red">Error: ${error.message}</td></tr>`;
        }


    }


}