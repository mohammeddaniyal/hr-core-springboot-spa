const mainContent=document.getElementById('main-content');


const ACTIVE_CLASS='nav-link-active';
const HIDDEN_CLASS='nav-link-hidden';

async function loadModule(moduleName,params={})
{

    let url='/index.html';
    if(moduleName==='employees')
    {
        url='/employees';
    }else if(moduleName==='employee-form' && params.mode==='ADD')
    {
        url='/employees/add';
    }else if(moduleName==='employee-form' && params.mode==='EDIT')
    {
        url=`/employees/edit/${params.id}`;
    }else if(moduleName==='designations')
    {
        url='/designations';
    }else if(moduleName==='designation-form' && params.mode==='ADD')
    {
        url='/designations/add';
    }else if(moduleName==='designation-form' && params.mode==='EDIT')
    {
        url=`/designations/edit/${params.id}`;
    }

    //  Change the Browser URL (No Page Reload!)
    //  save the 'moduleName' and 'params' in the history so the Back button works later.
    window.history.pushState({ module: moduleName, params: params }, "", url);

    if(moduleName==='HOME')
    {
        mainContent.innerHTML="<h1>Welcome</h1>"
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
        loadModule(event.state.module,event.state.params);
    }else
    {
        loadModule('HOME');
    }
};

