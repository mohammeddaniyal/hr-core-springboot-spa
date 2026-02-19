window.pages['employeeDeleteConfirm']={
employeeId:null,
load: function(params)
{
    if(params.id)
    {
        this.employeeId=params.id;
        this.initDelete();
    }
},
initDelete: async function()
{
  document.getElementById('confirmTitle').innerText=`Delete ${this.entityName}`;
  const confirmData=document.getElementById('confirmData');
  document.getElementById('confirmYesBtn').onclick = () => this.confirm();
  document.getElementById('confirmNoBtn').onclick = () => loadModule('employees');
    try
    {
        const employee=await employeeService.getByEmployeeId(this.employeeId);
        confirmData.innerHTML=`
            <strong>Name:</strong> ${employee.name}<br>
            <strong>Designation:</strong> ${employee.designation}<br>
            <strong>DOB:</strong> ${this.formatDate(employee.dateOfBirth)}<br>
            <strong>Gender:</strong> ${employee.gender === 'M' ? 'Male' : 'Female'}<br>
            <strong>Salary:</strong> ₹ ${employee.basicSalary}<br>
            <strong>PAN:</strong> ${employee.panNumber}<br>
            <strong>Aadhar:</strong> ${employee.aadharCardNumber}<br>
        `;
    }catch(error)
    {
        console.log(error);
    }
},
confirm: async function()
{
    try
    {
        await employeeService.delete(this.employeeId);
        document.getElementById('confirmDeleteModule').innerHTML='';
        const notification=document.getElementById('notificationSection');
        notification.innerHTML='';
        notification.innerHTML=`
            <h3>Notification</h3>
            Employee Deleted
            <br>
            <button type='button' onclick="loadModule('employees')">Ok</button>
        `;
    }catch(error)
    {
        console.log(error);
    }
},
formatDate: function(dateOfBirth)
{
const dateParts=dateOfBirth.split('-');
return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}
};