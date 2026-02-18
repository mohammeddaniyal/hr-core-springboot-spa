window.pages['employeeAddForm']={

load: async function()
{
try
{
const designations=await designationService.getAll();
if(designations.length===0)
{
return;
}
this.populateDesignationCombo(designations);
}catch(error)
{
alert(error);
}
},
save: async function()
{
    const employeeAddForm=document.getElementById('employeeAddForm');
    const notification=document.getElementById('notificationSection');
    const employeeAddModule=document.getElementById('employeeAddModule');

    notification.innerHTML='';
    document.querySelectorAll('.error').forEach(span=>span.innerHTML='');
    const employee=this.getEmployeeFromForm(employeeAddForm);

    const result=employeeValidator.validate(employee);
    if(!result.valid)
    {
        this.showError(result.errors);
        return;
    }
    try
    {
    const response=await employeeService.add(employee);
    alert(`Employee ${response.name} added with id ${response.employeeId}`);

    employeeAddModule.innerHTML='';
            notification.innerHTML=`
            <h3>Notification</h3><br>
            Employee added, add more ?<br>
            <table>
            <tr>
            <td>
            <button type="button" onclick="loadModule('employee-add-form')">Yes</button>
            </td>
            <td>
            <button type="button" onclick="loadModule('employees')">No</button>
            </td>
            </tr>
            </table>

    `;
    }catch(error)
    {
        this.showError(error.errors);
    }
},
getEmployeeFromForm: function(form)
{
    const formData=new FormData(form);
    const employee={};
    employee.isIndian=false;
    for(const [key,value] of formData.entries())
    {
        if(key==='dateOfBirth') console.log(`Key : ${key} and Value: ${value}`);
        if(key==='isIndian')
        {
            employee[key]= value==='Y';
        }else
        {
        employee[key]=value;
        }
    }
    return employee;

},
showError: function(errors)
{
    document.querySelectorAll('.error').forEach(span=>span.innerHTML='');

    for(const field in errors)
    {
        const errorMessage=errors[field];
        const errorElement=document.getElementById(`${field}ErrorSection`);
        if(errorElement)
        {
            errorElement.innerHTML=errorMessage;
        }
    }
},
populateDesignationCombo: function(designations)
{
const select=document.getElementById('designationCode');

if(!select) return;
select.innerHTML='';

const defaultOption=document.createElement('option');
defaultOption.value='';
defaultOption.textContent='<Select Designation>';
select.appendChild(defaultOption);

designations.forEach(d=>{
const option=document.createElement('option');
option.value=d.code;
option.textContent=d.title;
select.appendChild(option);
});


}
};