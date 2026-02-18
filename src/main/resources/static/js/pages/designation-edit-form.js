window.pages['designationEditForm']={
code: null,
load: function(params)
{
    if(params.id)
    {
        this.initEdit(params.id);
    }
},
initEdit: async function(code)
{
    const title=document.getElementById('title');
    this.code=code;
    try
    {
        const designation=await designationService.getByCode(code);
        title.value=designation.title;
    }catch(error)
    {
        alert(error);
    }
},
update: async function()
    {
        const frm=document.getElementById('updateDesignationForm');
        const notification=document.getElementById('notification');
        const errorSection=document.getElementById('errorSection');
        const designationEditModule=document.getElementById('designationEditModule');
        notification.innerHTML='';
        errorSection.innerHTML='';

        const formData={
        title: frm.title.value
        };

        const result= designationValidator.validate(formData);

        if(!result.valid)
        {
            this.showError(result.errors);
            return;
        }

        const title=formData.title.trim();

        const designation={
        'title':title
        };
        try
        {
            const response=await designationService.update(this. code,designation);
            alert(`Designation ${response.title} added with code ${response.code}`);
            designationEditModule.innerHTML='';
            notification.innerHTML=`
            <h3>Notification</h3><br>
            Designation Updated <br>
            <button type="button" onclick="loadModule('designations')">Ok</button>
            `;
        }catch(error)
        {
            console.log(error);
            if(error.type==='VALIDATION')
            {
                this.showError(error.errors);
            }else if(error.type==='BUSINESS')
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
        const titleErrorSection=document.getElementById('titleErrorSection');
        const errorSection=document.getElementById('errorSection');

        titleErrorSection.innerHTML='';
        errorSection.innerHTML='';

        if(errors.title)
        {
            titleErrorSection.innerHTML=errors.title;
            document.getElementById('updateDesignationForm').title.focus();
        }else if(errors.message)
        {
            errorSection.innerHTML=errors.message;
        }else
        {
            alert(errors)
        }
    }
};