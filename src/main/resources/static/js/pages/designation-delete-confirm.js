window.pages['designationDeleteConfirm']={
code: null,
load: function(params)
{
    if(params.id)
    {
        this.initDelete(params.id);
    }
},
initDelete: async function(code)
{
    const designationSection=document.getElementById('designationSection');
    designationSection.innerHTML='';
    this.code=code;
    try
    {
        const designation=await designationService.getByCode(code);
        designationSection.innerHTML=designation.title;
    }catch(error)
    {
        alert(error);
    }
},
delete: async function()
    {
        const notification=document.getElementById('notification');
        const designationDeleteModule=document.getElementById('designationDeleteModule');
        notification.innerHTML='';

        try
        {
            await designationService.delete(this.code);
            designationDeleteModule.innerHTML='';
            notification.innerHTML=`
            <h3>Notification</h3><br>
            Designation Deleted <br>
            <button type="button" onclick="loadModule('designations'); return false;">Ok</button>
            `;
        }catch(error)
        {
            console.log(error);
            if(error.type==='BUSINESS')
            {
                this.showError(error.errors);
            }else
            {
                alert('Critical error '+error.message)
            }
        }

    },
    showError: function(errors)
    {
        const notification=document.getElementById('notification');
        const designationDeleteModule=document.getElementById('designationDeleteModule');
        notification.innerHTML='';
        designationDeleteModule.innerHTML='';
        notification.innerHTML='<h3>Notification</h3>';
        if(errors.message)
        {
            notification.innerHTML+=`<br>
            ${errors.message}<br>
            <button type='button' onclick="loadModule('designations'); return false;" >Ok</button>
            `;
        }else if(errors.message)
        {
            errorSection.innerHTML=errors.message;
        }else
        {
            alert(errors)
        }
    }
};