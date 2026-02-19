window.pages["employeeForm"]={
mode:null,
employeeId:null,
load: function(params)
{
    if(!params.mode)
    {
        throw new Error("employeeForm.load(): mode is required");
    }
    this.mode=params.mode;
    this.employeeId=params.id || null;

    this.clearNotifications();
    this.clearErrors();
    this.populateDesignationComboBox();

    if(this.mode==="ADD")
    {
        this.setupAdd();
    }
    else if(this.mode==='EDIT')
    {
        if(!this.employeeId)
        {
            throw new Error('EDIT mode requires employeeId');
        }
        this.setupEdit();
    }
    else {
           throw new Error(`Unknown mode: ${this.mode}`);
         }
},
// Mode Setups
setupAdd: function()
{
    document.getElementById('formTitle').innerText='Employee (Add Form)';
    const btn=document.getElementById('submitBtn');
    btn.textContent='Add';
    btn.onclick=()=>this.save();
    this.clearForm();
},

setupEdit: async function()
{
    document.getElementById('formTitle').innerText='Employee (Edit Form)';
    const btn=document.getElementById('submitBtn');
    btn.textContent='Update';
    btn.onclick=()=>this.update();
    try
    {
        const employee=await employeeService.getByEmployeeId(this.employeeId);
        this.fillForm(employee);
    }catch(error)
    {
        console.log(error);
    }
},


// actions

save: async function()
{
    const employeeAddForm=document.getElementById('employeeForm');
    const employeeAddModule=document.getElementById('employeeModule');
    const notification=document.getElementById('notificationSection');
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
            <button type="button" onclick="loadModule('employee-form',{mode: 'ADD'})">Yes</button>
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
update: async function()
{
    const employeeEditForm=document.getElementById('employeeForm');
    const notification=document.getElementById('notificationSection');
    const employeeEditModule=document.getElementById('employeeModule');

    const employee=this.getEmployeeFromForm(employeeEditForm);

    const result=employeeValidator.validate(employee);
    if(!result.valid)
    {
        this.showError(result.errors);
        return;
    }
    try
    {
    const response=await employeeService.update(this.employeeId,employee);
    alert(`Employee ${response.name} added with id ${response.employeeId}`);

    employeeEditModule.innerHTML='';
            notification.innerHTML=`
            <h3>Notification</h3><br>
            Employee updated<br>
            <button type="button" onclick="loadModule('employees')">Ok</button>
    `;
    }catch(error)
    {
        this.showError(error.errors);
    }
},



// Common utils
clearNotifications: function()
{
      const notification = document.getElementById('notificationSection');
      if (notification) notification.textContent = '';
},
clearErrors: function()
 {
   document.querySelectorAll('.error').forEach(span=>span.textContent='');
 },
getEmployeeFromForm: function(form)
{
    const formData=new FormData(form);
    const employee={};
    employee.isIndian=false;
    for(const [key,value] of formData.entries())
    {
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
fillForm: function(employee)
{
    Object.entries(employee).forEach(([key,value])=>{
    const field=document.querySelector(`[name="${key}"]`);
    if(!field) return;
    if(field.type==="radio")
    {
     const radio = document.querySelector(
        `input[type="radio"][name="${key}"][value="${value}"]`
      );
      if (radio) {
      radio.checked = true;
      }else
      {
      console.error('Radio not found for', key, value);
      }
    }
    else if(field.type==="checkbox")
    {
        field.checked=value===true || value==='Y';
    }
    else
    {
        field.value=value;
    }
    });
},

clearForm: function()
{
const form=document.getElementById('employeeForm');
if(!form) return;
form.reset();
},
populateDesignationComboBox: async function(designations)
{
try
{
const designations=await designationService.getAll();
if(designations.length===0)
{
return;
}
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
}catch(error)
{
alert(error);
}
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
}
};