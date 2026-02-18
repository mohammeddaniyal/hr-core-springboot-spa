class DesignationService
{
constructor()
{
this.api='/api/designations';
}

async getAll()
{
const response=await fetch(this.api);
if(!response.ok) throw new Error(`HTTP ${response.status}: ${text}`);
return await response.json();
}

async getByCode(code)
{
const response=await fetch(`${this.api}/${code}`);
if(!response.ok) throw new Error('Designation not found');
return await response.json();
}

async add(designation)
{
const response=await fetch(this.api,{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify(designation)
});
// success case (200 ok)
if(response.ok)
{
    return await response.json();
}

    let errorBody;
    try
    {
        errorBody=await response.json();
    }catch(error)
    {
        throw {type:'Server_ERROR',message:response.statusText};
    }

    if(response.status===400)
    {
        throw{
        type:'VALIDATION',
        errors:errorBody
        };
    }
    if(response.status===409)
    {
        throw {type:'BUSINESS', errors: errorBody};
    }
    throw {type:'Server_ERROR',message:"System error "+response.statusText, errors:errorBody};
}


async update(code,designation)
{
const response=await fetch(`${this.api}/${code}`,{
method:'PUT',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify(designation)
});
if(response.ok)
{
    return await response.json();
}

    let errorBody;
    try
    {
        errorBody=await response.json();
    }catch(error)
    {
        throw {type:'Server_ERROR',message:response.statusText};
    }

    if(response.status===400)
    {
        throw{
        type:'VALIDATION',
        errors:errorBody
        };
    }
    if(response.status===409)
    {
        throw {type:'BUSINESS', errors: errorBody};
    }
    throw {type:'Server_ERROR',message:"System error "+response.statusText, errors:errorBody};
}

async delete(code)
{
const response=await fetch(`${this.api}/${code}`,{
method:'DELETE'
});

    if(response.status===204)
    {
        return
    }

    let errorBody;
        try
        {
            errorBody=await response.json();
        }catch(error)
        {
            throw {type:'Server_ERROR',message:response.statusText};
        }

        if(response.status===404 || response.status===409)
        {
            throw {type:'BUSINESS', errors: errorBody};
        }
        throw {type:'Server_ERROR',message:"System error "+response.statusText, errors:errorBody};

}

}

const designationService=new DesignationService();