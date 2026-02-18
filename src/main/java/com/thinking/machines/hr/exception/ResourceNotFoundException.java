package com.thinking.machines.hr.exception;

public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String message)
    {
        super(message);
    }
}
