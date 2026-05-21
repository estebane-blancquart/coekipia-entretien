package com.coekipia.employees;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String first_name;
    private String last_name;
    private String department;
    private String role;
    private Double salary;
    private Boolean is_active;

    public Long getId() { return id; }
    public String getFirst_name() { return first_name; }
    public String getLast_name() { return last_name; }
    public String getDepartment() { return department; }
    public String getRole() { return role; }
    public Double getSalary() { return salary; }
    public Boolean getIs_active() { return is_active; }
}