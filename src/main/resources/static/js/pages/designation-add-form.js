window.pages['designationAddForm']={
    save: async function()
    {
        const frm=document.getElementById('addDesignationForm');
        const notification=document.getElementById('notification');
        const errorSection=document.getElementById('errorSection');
        const designationAddModule=document.getElementById('designationAddModule');
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
            const response=await designationService.add(designation);
            alert(`Designation ${response.title} added with code ${response.code}`);
            designationAddModule.innerHTML='';
            notification.innerHTML=`
            <h3>Notification</h3><br>
            Designation added, add more ?<br>
            <table>
            <tr>
            <td>
            <button type="button" onclick="loadModule('designation-add-form')">Yes</button>
            </td>
            <td>
            <button type="button" onclick="loadModule('designations')">No</button>
            </td>
            </tr>
            </table>
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
            document.getElementById('addDesignationForm').title.focus();
        }else if(errors.message)
        {
            errorSection.innerHTML=errors.message;
        }else
        {
            alert(errors)
        }
    }
};