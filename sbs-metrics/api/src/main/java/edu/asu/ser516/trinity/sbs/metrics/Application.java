package edu.asu.ser516.trinity.sbs.metrics;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;


@SpringBootApplication
public class Application extends AbstractHandler {


    public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
