package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.dashboard.DashboardGroupDTO;
import java.util.List;

public interface DashboardService {
    List<DashboardGroupDTO> getMaterialesAlumnoAgrupados(Integer alumnoId);
}
