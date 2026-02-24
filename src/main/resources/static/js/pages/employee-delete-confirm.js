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
  document.getElementById('confirmTitle').innerText='Employee (Delete Module)';
  const confirmData=document.getElementById('confirmData');
  document.getElementById('confirmYesBtn').onclick = (e) =>
   {
   e.preventDefault();
   this.confirm();
   }
  document.getElementById('confirmNoBtn').onclick = (e) => {
  e.preventDefault
  loadModule('employees');
  }
    try
    {
        const employee=await employeeService.getByEmployeeId(this.employeeId);
        confirmData.innerHTML=`
            <strong>Name:</strong> ${employee.name}<br>
            <strong>Designation:</strong> ${employee.designation}<br>
            <strong>Date of Birth:</strong> ${this.formatDate(employee.dateOfBirth)}<br>
            <strong>Gender:</strong> ${employee.gender === 'M' ? 'Male' : 'Female'}<br>
            <strong>Nationality:</strong> ${employee.isIndian===true ? 'Indian':'Non Indian'}<br>
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
            <button type='button' onclick="loadModule('employees'); return false;">Ok</button>
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