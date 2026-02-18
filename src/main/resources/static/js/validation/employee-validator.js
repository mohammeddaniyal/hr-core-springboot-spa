const employeeValidator={
validate: function(employee)
{
    const errors={};

    if (!employee.name || employee.name.trim() === '')
    {
          errors.name = 'Name required';
    }

    if (!employee.designationCode || employee.designationCode === '-1')
    {
        errors.designationCode = 'Select designation';
    }

    if (!employee.dateOfBirth)
    {
        errors.dateOfBirth = 'Select date of birth';
    }

        if (!employee.gender) {
          errors.gender = 'Select gender';
        }
        if (!employee.basicSalary)
        {
          errors.basicSalary = 'Basic Salary required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(employee.basicSalary))
         {
          errors.basicSalary = 'Invalid basic salary';
        }

        if (!employee.panNumber) {
          errors.panNumber = 'PAN number required';
        }

        if (!employee.aadharCardNumber) {
          errors.aadharCardNumber = 'Aadhar card number required';
        }

        return {
          valid: Object.keys(errors).length === 0,
          errors
        };
      }
};