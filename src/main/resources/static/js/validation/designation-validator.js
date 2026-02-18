const designationValidator={

    validate : function(formData)
    {
        const errors={};
        if(!formData.title || formData.title.trim().length===0)
        {
            errors.title='Title is required';
        }
        return {
            valid: Object.keys(errors).length===0,
            errors
        };
    }

};