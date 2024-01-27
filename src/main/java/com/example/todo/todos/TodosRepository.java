package com.example.todo.todos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TodosRepository extends JpaRepository<Todo, Long> {
}
