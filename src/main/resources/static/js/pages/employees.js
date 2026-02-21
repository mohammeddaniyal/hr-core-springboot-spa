window.pages=window.pages || {};

window.pages['employees']={

employeeList:[],
selectedRow:null,
load: async function()
{
    const tableBody=document.getElementById('employeeTableBody');
    const userRole=sessionStorage.getItem('userRole');
    try
    {
       const data=await employeeService.getAll();
       this.employeeList=data;
       tableBody.innerHTML='';
       if(data.length===0)
       {
           tableBody.innerHTML='<tr><td colspan="6">No Records Found</td></tr>';
           return;
       }

        let rowsHTML='';
        data.forEach((employee,index)=>{
        // Formatting Date manually to match logic (dd/mm/yyyy) in employee grid box
        // API sends "yyyy-mm-dd"
            const dateParts=employee.dateOfBirth.split('-');
            const formattedDob=`dateParts[2]/dateParts[1]/dateParts[0]`;
            let actionButtonsHTML='';

            if(userRole==='ADMIN')
            {
                actionButtonsHTML=`
                <td>
                    <a href='#' onclick="loadModule('employee-form',{ id: '${employee.employeeId}', mode: 'EDIT'}); return false;">Edit</a>
                </td>
                <td>
                    <a href='#' onclick="loadModule('employee-delete-confirm',{ id: '${employee.employeeId}'}); return false;">Delete</a>
                </td>
                `;
            }else{
                actionButtonsHTML = `
                    <td colspan="2" class="view-only-cell">View Only</td>
                `;
            }

            rowsHTML+=`
            <tr style='cursor:pointer' onclick="window.pages.employees.selectEmployee(this,'${employee.employeeId}'); return false;">
            <td>${index+1}</td>
            <td>${employee.employeeId}</td>
            <td>${employee.name}</td>
            <td>${employee.designation}</td>
             ${actionButtonsHTML}
            </tr>
            `;

        });
        tableBody.innerHTML=rowsHTML;
        return;
    }catch(error)
    {
        console.error(error);
        tableBody.innerHTML = `<tr><td colspan="6" style="color:red">Error: ${error.message}</td></tr>`;
    }
}
,
selectEmployee: function(row,employeeId)
{

    if(this.selectedRow===row) return;
    if(this.selectedRow!=null)
    {
        this.selectedRow.classList.remove('selected-row');
    }
    row.classList.add('selected-row');
    this.selectedRow=row;
    const employee=this.employeeList.find(function(e)
    {
        if(e.employeeId==employeeId) return e; // also can use arrow function (e=> e.employeeId==employeeId)
    });
    if(employee)
    {
        document.getElementById('detailPanel_employeeId').innerHTML=employee.employeeId;
        document.getElementById('detailPanel_name').innerHTML=employee.name;
        document.getElementById('detailPanel_designation').innerHTML=employee.designation;
        const dateParts=employee.dateOfBirth.split('-');
        const formattedDob=`${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        document.getElementById('detailPanel_dateOfBirth').innerHTML=formattedDob;
        document.getElementById('detailPanel_gender').innerHTML=employee.gender;
        document.getElementById('detailPanel_isIndian').innerHTML=employee.isIndian?'Yes': 'No';
        document.getElementById('detailPanel_basicSalary').innerHTML=employee.basicSalary;
        document.getElementById('detailPanel_panNumber').innerHTML=employee.panNumber;
        document.getElementById('detailPanel_aadharCardNumber').innerHTML=employee.aadharCardNumber;
    }
}
};