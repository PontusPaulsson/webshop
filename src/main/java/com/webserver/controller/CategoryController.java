package com.webserver.controller;

import com.webserver.dao.CategoryRepository;
import com.webserver.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Validated
@RestController
@RequestMapping(value = "/api")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @CrossOrigin
    @GetMapping (value = "/categories")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }


    @CrossOrigin
    @PostMapping(value = "/category")
    public void addCategory(@RequestParam("name") String name){
        Category category = new Category();
        category.setName(name);
        categoryRepository.save(category);
    }
}
