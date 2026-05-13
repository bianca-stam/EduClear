package org.springframework.boot.materiales_service.controller;

import org.springframework.boot.materiales_service.dto.dashboard.DashboardGroupDTO;
import org.springframework.boot.materiales_service.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<DashboardGroupDTO>> getDashboardAlumno(@PathVariable Integer alumnoId) {
        return ResponseEntity.ok(dashboardService.getMaterialesAlumnoAgrupados(alumnoId));
    }
}
