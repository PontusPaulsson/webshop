package com.webserver.controller;

import com.webserver.dao.CategoryRepository;
import com.webserver.dao.SubCategoryRepository;
import com.webserver.model.Category;
import com.webserver.model.SubCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class SubCategoryController {

    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @CrossOrigin
    @GetMapping(value = "/subcategories")
    public List<SubCategory> getAllCategories(){
        return subCategoryRepository.findAll();
    }

    @CrossOrigin
    @PostMapping(value = "/subcategory")
    public void addSubcategory(@RequestParam("name") String name, @RequestParam("categoryId") String categoryId){
        Category category = categoryRepository.findById(Integer.parseInt(categoryId)).get();

        SubCategory subCategory = new SubCategory();
        subCategory.setName(name);

        subCategory.setCategory(category);
        subCategoryRepository.save(subCategory);
    }

}
