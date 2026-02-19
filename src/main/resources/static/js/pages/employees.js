window.pages=window.pages || {};

window.pages['employees']={

employeeList:[],
selectedRow:null,
load: async function()
{
    const tableBody=document.getElementById('employeeTableBody');
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

            rowsHTML+=`
            <tr style='cursor:pointer' onclick="window.pages.employees.selectEmployee(this,'${employee.employeeId}'); return false;">
            <td>${index+1}</td>
            <td>${employee.employeeId}</td>
            <td>${employee.name}</td>
            <td>${employee.designation}</td>
            <td>
                <a href='#' onclick="loadModule('employee-form',{ id: '${employee.employeeId}', mode: 'EDIT'}); return false;">Edit</a>
            </td>
            <td>
                <a href='#' onclick="loadModule('employee-delete-confirm',{ id: '${employee.employeeId}'}); return false;">Delete</a>
            </td>
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
        this.selectedRow.style.background="white";
        this.selectedRow.style.color="black";
    }
    row.style.background="#7C7B7B";
    row.style.color="white";
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