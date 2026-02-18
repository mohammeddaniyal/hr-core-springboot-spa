package com.thinking.machines.hr.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Map<String,String>> handleBusinessException(BusinessException exception)
    {
        return ResponseEntity.status(422).body(exception.getErrors());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleDTOValidationException(MethodArgumentNotValidException exception)
    {
        Map<String,String> errors=new HashMap<>();

        exception.getBindingResult().getFieldErrors().forEach((error)->{
            String fieldName=((FieldError) error).getField();
            String errorMessage=error.getDefaultMessage();
            errors.put(fieldName,errorMessage);
        });
        return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String,String>> handleResourceNotFoundException(ResourceNotFoundException exception)
    {
        Map<String,String> errors=new HashMap<>();
        errors.put("message",exception.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DataConflictException.class)
    public ResponseEntity   <Map<String,String>> handleDataConflictException(DataConflictException exception)
    {
        Map<String,String> errors=new HashMap<>();
        errors.put("message",exception.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.CONFLICT);
    }



    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,String>> handleGenericException(Exception exception)
    {
        Map<String,String> errors=new HashMap<String,String>();
        errors.put("error", exception.getMessage());
        return new ResponseEntity<>(errors,HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
