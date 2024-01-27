package com.example.todo.todos;

import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoService {
    private final TodosRepository todosRepository;

    @Autowired
    public TodoService(TodosRepository todosRepository) {
        this.todosRepository = todosRepository;
    }

    public List<Todo> getTodos(){
        return todosRepository.findAll();
    }

    public ResponseEntity<String> addNewTodo(Todo todo){
        try {
            if (todo.getTitle() == null || todo.getDescription() == null) {
                return ResponseEntity.badRequest().body("{\"error\": \"Title and description are required fields.\"}");
            }
            todosRepository.save(todo);
            return ResponseEntity.ok().body("{\"message\": \"Todo added successfully.\"}");
        }catch(Exception e){
            return ResponseEntity.ok().body("{\"error\":\"There was a problem with your request try again later.\"}");
        }
    }

    public ResponseEntity<String> deleteTodo(long id){
        try {
            todosRepository.findById(id).orElseThrow(() -> new IllegalStateException("Todo with id "+id+" does not exist"));
            todosRepository.deleteById(id);
            return ResponseEntity.ok().body("{\"message\":\"Todo with id "+id+" successfully deleted\"}");
        }catch(Exception e){
            return ResponseEntity.ok().body("{\"error\":\"Todo with id "+id+" does not exist\"}");
        }
    }

    @Transactional
    public ResponseEntity<String> updateTodo(long id, Todo todo){

        try{
            Todo existingTodo = todosRepository.findById(id).orElseThrow(() -> new IllegalStateException("Todo with id "+id+" does not exist"));
            if(todo.getTitle() == null && todo.getDescription() == null){
                return ResponseEntity.badRequest().body("{\"error\":\"No values provided\"}");
            }
            if(todo.getTitle() != null && !todo.getTitle().isEmpty() && !Objects.equals(existingTodo.getTitle(),todo.getTitle())){
                existingTodo.setTitle(todo.getTitle());
            }
            if(todo.getDescription() != null && !todo.getDescription().isEmpty() && !Objects.equals(existingTodo.getDescription(), todo.getDescription())) {
                existingTodo.setDescription(todo.getDescription());
            }
            return ResponseEntity.ok().body("{\"message\":\"Todo with id "+id+" successfully updated\"}");
        }
        catch(Exception e){
            return ResponseEntity.ok().body("{\"error\":\"Todo with id "+id+" does not exist\"}");
        }

    }
}
