package com.coekipia.employees;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private static final Set<String> ALLOWED_KEYS = Set.of(
        "first_name", "last_name", "department", "role", "salary", "is_active"
    );

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> filterAndSort(String filterKey, String filterValue, String sortKey) {
        List<Employee> all = repository.findAll();

        if (filterKey == null || filterValue == null || filterValue.isEmpty() || sortKey == null) {
            return all;
        }

        if (!ALLOWED_KEYS.contains(filterKey) || !ALLOWED_KEYS.contains(sortKey)) {
            throw new IllegalArgumentException("Invalid filterKey or sortKey");
        }

        return all.stream()
            .filter(e -> getField(e, filterKey).equalsIgnoreCase(filterValue))
            .sorted(Comparator.comparing(e -> getField(e, sortKey)))
            .collect(Collectors.toList());
    }

    public Set<String> getFields() {
        return ALLOWED_KEYS;
    }

    private String getField(Employee e, String key) {
        return switch (key) {
            case "first_name" -> e.getFirst_name();
            case "last_name" -> e.getLast_name();
            case "department" -> e.getDepartment();
            case "role" -> e.getRole();
            case "salary" -> e.getSalary().toString();
            case "is_active" -> e.getIs_active().toString();
            default -> throw new IllegalArgumentException("Unknown field: " + key);
        };
    }
}