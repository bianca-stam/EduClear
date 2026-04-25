package org.example.cursoservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "org.example.cursoservice")
public class CursoServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CursoServiceApplication.class, args);
    }

}
