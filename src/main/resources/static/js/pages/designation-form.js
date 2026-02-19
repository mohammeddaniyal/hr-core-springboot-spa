window.pages["designationForm"]={
mode:null,
code:null,
load: function(params)
{
    if(!params.mode)
    {
        throw new Error("employeeForm.load(): mode is required");
    }
    this.mode=params.mode;
    this.code=params.id || null;


    if(this.mode==="ADD")
    {
        this.setupAdd();
    }
    else if(this.mode==='EDIT')
    {
        if(!this.code)
        {
            throw new Error('EDIT mode requires code');
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
    document.getElementById('formTitle').innerText='Designation (Add Form)';
    const btn=document.getElementById('submitBtn');
    btn.textContent='Add';
    btn.onclick=(e)=>{
    e.preventDefault(); // to tell browser STOP! Don't submit the form or follow the link
    this.save();
    }
},

setupEdit: async function()
{
    document.getElementById('formTitle').innerText='Designation (Edit Form)';
    const btn=document.getElementById('submitBtn');
    btn.textContent='Update';
    btn.onclick=(e)=>
    {
    e.preventDefault();// to tell browser STOP! Don't submit the form or follow the link
    this.update();
    }
    try
    {
        const designation=await designationService.getByCode(this.code);
        document.getElementById('title').value=designation.title;
    }catch(error)
    {
        console.log(error);
    }
},
save: async function()
    {
        const frm=document.getElementById('designationForm');
        const notification=document.getElementById('notification');
        const errorSection=document.getElementById('errorSection');
        const designationAddModule=document.getElementById('designationModule');
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
            <button type="button" onclick="loadModule('designation-form',{mode:'ADD'}); return false;">Yes</button>
            </td>
            <td>
            <button type="button" onclick="loadModule('designations'); return false;">No</button>
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
    update: async function()
        {
            const frm=document.getElementById('designationForm');
            const notification=document.getElementById('notification');
            const errorSection=document.getElementById('errorSection');
            const designationEditModule=document.getElementById('designationModule');
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
                designationEditModule.innerHTML='';
                notification.innerHTML=`
                <h3>Notification</h3><br>
                Designation Updated <br>
                <button type="button" onclick="loadModule('designations'); return false;">Ok</button>
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
                document.getElementById('designationForm').title.focus();
            }else if(errors.message)
            {
                errorSection.innerHTML=errors.message;
            }else
            {
                alert(errors)
            }
        }
    }