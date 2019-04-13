package com.webserver.controller;

import com.webserver.dao.ProductRepository;
import com.webserver.dao.SubCategoryRepository;
import com.webserver.model.Product;
import com.webserver.model.SubCategory;
import com.webserver.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Validated
@org.springframework.web.bind.annotation.RestController
@RequestMapping(value = "/api")
public class ProductController {

    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Autowired
    StorageService storageService;

    @Autowired
    ProductRepository productRepository;

    @GetMapping(value = "/product/{id}")
    public Product getProduct(@PathVariable("id") int id){
        return productRepository.getOne(id);
    }

    @CrossOrigin //Enables CORS or Cross Origin Resource Sharing -- This means that applications running on other "Origins" (domains) can request this method.
    @GetMapping(value = "/products")
    public List<Product> getProduct(){
        return productRepository.findAll();
    }

    public ProductController(){

    }

    @CrossOrigin
    @PostMapping(value = "/product")
    public void addProduct(@RequestPart("file") MultipartFile file,
                           @RequestParam("price") String price,
                           @RequestParam("title") String title,
                           @RequestParam("description") String description,
                           @RequestParam("subCategoryId") String subCategoryId) {
        SubCategory subCategory = subCategoryRepository.findById(Integer.parseInt(subCategoryId)).get();

        Product product = new Product();
        product.setTitle(title);
        product.setDescription(description);
        product.setPrice(Double.parseDouble(price));
        product.setSubCategory(subCategory);
        product.setImageURL(file.getOriginalFilename());
        storageService.store(file);
        productRepository.save(product);

    }
}
