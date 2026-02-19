class EmployeeService
{
    constructor()
    {
        this.api="/api/employees";
    }

    async getAll()
    {
        const response=await fetch(this.api);
        if(!response.ok) throw new Error(`HTTP ${response.status}: ${text}`);
        return response.json();
    }
async add(employee)
{
const response=await fetch(this.api,{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify(employee)
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
    if(response.status===422)
    {
        throw {type:'BUSINESS', errors: errorBody};
    }
    throw {type:'Server_ERROR',message:"System error "+response.statusText, errors:errorBody};
}
async update(employeeId,employee)
{
const response=await fetch(`${this.api}/${employeeId}`,{
method:'PUT',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify(employee)
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
    if(response.status===422)
    {
        throw {type:'BUSINESS', errors: errorBody};
    }
    throw {type:'Server_ERROR',message:"System error "+response.statusText, errors:errorBody};
}

async getByEmployeeId(employeeId)
{
const response=await fetch(`${this.api}/${employeeId}`);
if(!response.ok) throw new Error('Employee not found');
return await response.json();
}


async delete(employeeId)
{
const response=await fetch(`${this.api}/${employeeId}`,{
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

        if(response.status===404)
        {
            throw {type:'BUSINESS', errors: errorBody};
        }
        throw {type:'Server_ERROR',message:"System error "+response.statusText, errors:errorBody};
}


}





const employeeService=new EmployeeService();
