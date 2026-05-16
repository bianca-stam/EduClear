package org.springframework.boot.materiales_service.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {
        Map<String, String> fieldErrors = new LinkedHashMap<>();

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fieldError.getField(), buildFieldMessage(fieldError));
        }

        String fields = fieldErrors.keySet().stream().collect(Collectors.joining(", "));
        String message = fieldErrors.size() == 1
                ? "Falta o es invalido el campo obligatorio: " + fields
                : "Faltan o son invalidos los campos obligatorios: " + fields;

        ApiErrorResponse response = new ApiErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                message,
                request.getRequestURI(),
                fieldErrors,
                null
        );

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleUnreadableMessage(
            HttpMessageNotReadableException ex,
            HttpServletRequest request
    ) {
        ApiErrorResponse response = new ApiErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "El cuerpo de la peticion no es valido. Revisa el JSON enviado.",
                request.getRequestURI(),
                null,
                null
        );

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler({
            ResourceNotFoundException.class,
            EmptyResultDataAccessException.class,
            NoHandlerFoundException.class,
            NoResourceFoundException.class
    })
    public ResponseEntity<ApiErrorResponse> handleNotFound(
            Exception ex,
            HttpServletRequest request
    ) {
        String redirectTo = buildGeneralListPath(request.getRequestURI());
        ApiErrorResponse response = new ApiErrorResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                "El recurso ya no esta disponible. Redirige a la lista general para continuar.",
                request.getRequestURI(),
                null,
                redirectTo
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.LOCATION, redirectTo)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericError(
            Exception ex,
            HttpServletRequest request
    ) {
        // TODO: reemplazar por un logger en producción
        ex.printStackTrace();

        ApiErrorResponse response = new ApiErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                "Algo salio mal, reintentalo mas tarde.",
                request.getRequestURI(),
                null,
                null
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    private String buildFieldMessage(FieldError fieldError) {
        return "El campo " + fieldError.getField() + " es obligatorio.";
    }

    private String buildGeneralListPath(String requestUri) {
        String normalizedPath = requestUri;
        if (normalizedPath.endsWith("/") && normalizedPath.length() > 1) {
            normalizedPath = normalizedPath.substring(0, normalizedPath.length() - 1);
        }

        int lastSlashIndex = normalizedPath.lastIndexOf('/');
        if (lastSlashIndex > 0) {
            return normalizedPath.substring(0, lastSlashIndex);
        }

        return "/api/materiales";
    }
}
