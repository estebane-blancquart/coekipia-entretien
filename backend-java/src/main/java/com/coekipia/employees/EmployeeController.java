package com.coekipia.employees;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping("/employees")
    public ResponseEntity<?> getEmployees(
        @RequestParam String filterKey,
        @RequestParam String filterValue,
        @RequestParam String sortKey
    ) {
        try {
            List<Employee> employees = service.filterAndSort(filterKey, filterValue, sortKey);
            return ResponseEntity.ok(employees);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/fields")
    public Set<String> getFields() {
        return service.getFields();
    }
}