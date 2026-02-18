const mainContent=document.getElementById('main-content');


const ACTIVE_CLASS='nav-link.active';
const HIDDEN_CLASS='nav-link-hidden';

async function loadModule(moduleName,params={})
{
    console.log(`loading module ${moduleName}`);
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
            console.log(`[Router] Loading controller: ${controllerName}`);
            controller.load(params);
        }
        updateNavigation('designations');
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

