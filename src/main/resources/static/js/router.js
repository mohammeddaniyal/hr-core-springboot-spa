const mainContent=document.getElementById('main-content');


const ACTIVE_CLASS='nav-link-active';
const HIDDEN_CLASS='nav-link-hidden';

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/auth/me');

        if (response.ok) {
            const user = await response.json();

            sessionStorage.setItem('userRole', user.role);
            sessionStorage.setItem('username', user.username);

            // using css trick, to stamp the body with user role
            document.body.classList.add('role-' + user.role);
            document.getElementById('username-1').textContent = user.username;
        } else {
            console.warn("User not authenticated. Redirecting to login...");
            window.location.href = '/login';
            return;
        }
        initRouter();
    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
});

async function loadModule(moduleName,params={}, push=true)
{
if(push)
{
    let url='/';
    if(moduleName==='employees')
    {
        url='/employees';
    }else if(moduleName==='employee-form' && params.mode==='ADD')
    {
        url='/employees/add';
    }else if(moduleName==='employee-form' && params.mode==='EDIT')
    {
        url=`/employees/edit/${params.id}`;
    }else if(moduleName==='employee-delete-confirm')
    {
        url=`/employees/delete/${params.id}`;
    }else if(moduleName==='designations')
    {
        url='/designations';
    }else if(moduleName==='designation-form' && params.mode==='ADD')
    {
        url='/designations/add';
    }else if(moduleName==='designation-form' && params.mode==='EDIT')
    {
        url=`/designations/edit/${params.id}`;
    }else if(moduleName==='designation-delete-confirm')
    {
        url=`/designations/delete/${params.id}`;
    }

    //  Change the Browser URL (No Page Reload!)
    //  save the 'moduleName' and 'params' in the history so the Back button works later.
    window.history.pushState({ module: moduleName, params: params }, "", url);
}
    if(moduleName==='HOME')
    {
        let username=sessionStorage.getItem('username');
        //alert(user)
        mainContent.innerHTML=`<h1>Welcome ${username}</h1>`;
        updateNavigation(moduleName);
        return;
    }
    try
    {
        const response=await fetch(`/modules/${moduleName}.html`);

        if(response.ok)
        {
        const html=await response.text();
        mainContent.innerHTML=html;

        const controllerName=kebabToCamel(moduleName);

        const controller=window.pages[controllerName];


        if(controller && typeof controller.load==='function')
        {
            controller.load(params);
        }
        const baseModule=moduleName.split('-')[0];
        const navigationKey=baseModule.endsWith('s')?baseModule:baseModule+'s';
        updateNavigation(navigationKey);
        }else
        {
            mainContent.innerHTML=`<h3 style="color:red">Error module '${moduleName}' not found</h3>`
        }


    }catch(error)
    {
    console.error("Error loading module:", error);
            mainContent.innerHTML = `<h3 style="color:red">Connection Failed</h3>`;
    }

}
 function kebabToCamel(str) {
    return str.replace(/-./g, x => x[1].toUpperCase());
}

function requireRole(role,defaultState) {
    const userRole = sessionStorage.getItem('userRole');

    if (userRole !== role) {
        console.warn("Access Denied.");
        window.history.replaceState(null, "", `/${defaultState}`);
        loadModule(`${defaultState}`, {}, false);
        return false;
    }

    return true;
}


function updateNavigation(activeModule)
{
const linkHome=document.getElementById('link-home');
const linkDesignations=document.getElementById('link-designations');
const linkEmployees=document.getElementById('link-employees');

[linkHome,linkDesignations,linkEmployees].forEach(link=>{
if(link)
{
link.classList.remove(ACTIVE_CLASS);
link.classList.remove(HIDDEN_CLASS);
}
});

if(activeModule==='HOME')
{
if(linkHome)linkHome.classList.add(HIDDEN_CLASS);
}else if(activeModule==='designations')
{
if(linkDesignations)linkDesignations.classList.add(ACTIVE_CLASS);
}else if(activeModule==='employees')
 {
 if(linkEmployees)linkEmployees.classList.add(ACTIVE_CLASS);
 }
}

window.onpopstate=function(event)
{
    if(event.state)
    {
        // CRITICAL: i pass false here!
        // "Load this module, but DO NOT touch the history stack."
        // because if i call pushState again, i duplicate the entry(to understand more check the if logic of push)
        loadModule(event.state.module,event.state.params,false);
    }else
    {
        loadModule('HOME');
    }
};

function initRouter()
{
    // look at the address bar
    const currentPath=window.location.pathname;

    if(currentPath==='/employees')
    {
        // Pass 'false' so we don't push the URL to history again (it's already there)
        loadModule('employees',{},false);
    }else if (currentPath === '/employees/add')
    {
         if (!requireRole('ADMIN','employees')) return;
        loadModule('employee-form', { mode: 'ADD' }, false);
    }else if(currentPath.startsWith('/employees/edit'))
    {
        if (!requireRole('ADMIN','employees')) return;
        const pathIdInfo=parseEmployeeId(currentPath);
        if(pathIdInfo.isValid)
        {
        loadModule('employee-form',{id : pathIdInfo.employeeId, mode: 'EDIT'},false);
        }else
        {
            console.warn("Invalid Employee ID in URL. Redirecting...");
            //Force the address bar to change to the safe URL immediately
            window.history.replaceState(null, "", "/employees");
            loadModule('employees',undefined,false);
        }
    }else if(currentPath.startsWith('/employees/delete'))
    {
             if (!requireRole('ADMIN','employees')) return;
            const pathIdInfo=parseEmployeeId(currentPath);
                if(pathIdInfo.isValid)
                {
                loadModule('employee-delete-confirm',{id : pathIdInfo.employeeId},false);
                }else
                {
                    console.warn("Invalid Employee ID in URL. Redirecting...");
                    //Force the address bar to change to the safe URL immediately
                    window.history.replaceState(null, "", "/employees");
                    loadModule('employees',undefined,false);
                }
    }else if (currentPath === '/designations')
    {
        loadModule('designations', {}, false);
    }
    else if (currentPath === '/designations/add')
    {
         if (!requireRole('ADMIN','designations')) return;
        loadModule('designation-form', { mode: 'ADD' }, false);
    }else if(currentPath.startsWith('/designations/edit'))
    {
             if (!requireRole('ADMIN','designations')) return;
        const pathCodeInfo=parseDesignationCode(currentPath);
        if(pathCodeInfo.isValid)
        {
        loadModule('designation-form',{id : pathCodeInfo.code, mode: 'EDIT'},false);
        }
        else
        {
            console.warn("Invalid Designation Code in URL. Redirecting...");
            //Force the address bar to change to the safe URL immediately
            window.history.replaceState(null, "", "/designations");
             loadModule('designations',undefined,false);
        }
    }else if(currentPath.startsWith('/designations/delete')){
             if (!requireRole('ADMIN','designations')) return;
             const pathIdInfo=parseDesignationCode(currentPath);
                    if(pathIdInfo.isValid)
                    {
                    loadModule('designation-delete-confirm',{id : pathIdInfo.code},false);
                    }else
                    {
                        console.warn("Invalid Designation Code in URL. Redirecting...");
                        //Force the address bar to change to the safe URL immediately
                        window.history.replaceState(null, "", "/designations");
                        loadModule('designations',undefined,false);
                    }
    }else
    {
        window.history.replaceState(null, "", "/");
        loadModule('HOME', undefined, false);
    }
}

function parseDesignationCode(currentPath)
{
const code=currentPath.split('/').pop();
const isValid = code && /^[0-9]+$/.test(code);
return {isValid,code};
}
function parseEmployeeId(currentPath)
{
        // we sprlit the URL by '/' and grad the last part using (.pop)
        // "/employees/edit/A100005" -> splits into ["", "employees", "edit", "A100005"] -> pops "A100005"
        const employeeId = currentPath.split('/').pop();

        const isValid = employeeId && /^[a-zA-Z0-9]+$/.test(employeeId);
        return {isValid,employeeId};
}


// --- Global Logout Function ---
window.logout = async function() {

    // Spring Boot backend to kill the session
    try {
        // Spring Security handles POST requests to /logout by default
        await fetch('/logout', {
            method: 'POST'
        });
    } catch (error) {
        console.error("Backend logout failed:", error);
    }

    // 2. Wipe the Frontend Memory
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('username');

    // 3. Strip the security stamp off the body tag
    document.body.classList.remove('role-ADMIN', 'role-USER');

    // 4. Redirect the user back to the login screen
    // Change '/login.html' to whatever your actual login URL is
    window.location.replace('/login');
};