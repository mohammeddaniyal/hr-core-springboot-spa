package com.thinking.machines.hr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SPARedirectController {

    @RequestMapping(value="/{path:[^\\.]*}")
    public String forward(@PathVariable String path){
        return "forward:/index.html";
    }
}
