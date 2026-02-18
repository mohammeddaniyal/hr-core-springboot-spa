package com.thinking.machines.hr.exception;

import java.util.Map;

public class BusinessException extends RuntimeException
{
    private final Map<String,String> errors;

    public BusinessException(Map<String,String> errors)
    {
        this.errors = errors;
    }
    public Map<String,String> getErrors()
    {
        return this.errors;
    }
}

