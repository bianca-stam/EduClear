package org.springframework.boot.materiales_service.dto.dashboard;

import lombok.Data;
import java.util.List;

@Data
public class DashboardGroupDTO {
    private String curso_nombre;
    private String asignatura_nombre;
    private List<DashboardItemDTO> items;
}
