package com.example.todo.todos;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/todos")
@CrossOrigin(origins = "http://localhost:4200")
public class TodosController {
    private final TodoService todoService;

    @Autowired
    public TodosController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/addTodo")
    @ResponseBody()
    public ResponseEntity<String> addTodo(@RequestBody Todo todo){
        return todoService.addNewTodo(todo);
    }     

    @GetMapping("/getTodos")
    public List<Todo> getTodos(){
        return todoService.getTodos();
    }

    @DeleteMapping("/deleteTodo/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable long id){
        return todoService.deleteTodo(id);
    }

    @PutMapping("/updateTodo/{id}")
    @ResponseBody()
    public ResponseEntity<String> updateTodo(@PathVariable long id, @RequestBody Todo todo)
    {
        return todoService.updateTodo(id, todo); 
    }
}
