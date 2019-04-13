package com.webserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany (fetch = FetchType.LAZY) //
    private List<SubCategory> subCategory;

    public Category() {

    }

    @JsonIgnore
    public List<SubCategory> getSubcategory() {
        return subCategory;
    }

    public void setSubcategory(List<SubCategory> subcategory) {
        this.subCategory = subcategory;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
