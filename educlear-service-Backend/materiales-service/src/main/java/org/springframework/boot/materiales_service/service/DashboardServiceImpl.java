package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.config.AsignaturaClient;
import org.springframework.boot.materiales_service.dto.AsignaturaDTO;
import org.springframework.boot.materiales_service.dto.CursoDTO;
import org.springframework.boot.materiales_service.dto.dashboard.DashboardGroupDTO;
import org.springframework.boot.materiales_service.dto.dashboard.DashboardItemDTO;
import org.springframework.boot.materiales_service.dto.tema.TemaDTO;
import org.springframework.boot.materiales_service.dto.examen.response.ExamenDTO;
import org.springframework.boot.materiales_service.dto.tarea.response.TareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.response.IntentoExamenDTO;
import org.springframework.boot.materiales_service.enums.EstadoEntrega;
import org.springframework.boot.materiales_service.model.Tema;
import org.springframework.boot.materiales_service.repository.TemaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final AsignaturaClient asignaturaClient;
    private final TemaRepository temaRepository;
    private final TareaService tareaService;
    private final ExamenService examenService;
    private final EntregaTareaService entregaTareaService;
    private final IntentoExamenService intentoExamenService;

    public DashboardServiceImpl(AsignaturaClient asignaturaClient,
                               TemaRepository temaRepository,
                               TareaService tareaService,
                               ExamenService examenService,
                               EntregaTareaService entregaTareaService,
                               IntentoExamenService intentoExamenService) {
        this.asignaturaClient = asignaturaClient;
        this.temaRepository = temaRepository;
        this.tareaService = tareaService;
        this.examenService = examenService;
        this.entregaTareaService = entregaTareaService;
        this.intentoExamenService = intentoExamenService;
    }

    @Override
    public List<DashboardGroupDTO> getMaterialesAlumnoAgrupados(Integer alumnoId) {
        List<AsignaturaDTO> asignaturas = asignaturaClient.getFullAsignaturasByAlumno(alumnoId);
        List<DashboardGroupDTO> resultado = new ArrayList<>();

        for (AsignaturaDTO asignatura : asignaturas) {
            DashboardGroupDTO group = new DashboardGroupDTO();
            
            // Obtener el curso completo para esta asignatura
            CursoDTO curso = asignaturaClient.getCursoById(asignatura.getCursoId());
            
            group.setAsignatura_nombre(asignatura.getNombre());
            group.setCurso_nombre(curso != null ? curso.getNombre() : "Curso no encontrado");
            
            List<DashboardItemDTO> items = new ArrayList<>();
            
            List<Tema> temas = temaRepository.findByAsignaturaId(asignatura.getId());
            
            for (Tema tema : temas) {
                TemaDTO temaDTO = mapToTemaDTO(tema);
                
                // Procesar Tareas
                List<TareaDTO> tareas = tareaService.findByTemaId(tema.getId());
                for (TareaDTO t : tareas) {
                    // Excluir si la fecha de cierre ya pasó
                    if (t.getFechaCierre() != null && t.getFechaCierre().isBefore(LocalDateTime.now())) {
                        continue;
                    }
                    // Excluir si el alumno ya entregó la tarea
                    EntregaTareaDTO entrega = entregaTareaService.findByTareaIdAndAlumnoId(t.getId(), alumnoId);
                    if (entrega != null) {
                        continue;
                    }
                    DashboardItemDTO item = new DashboardItemDTO();
                    item.setTipo("tarea");
                    item.setId(t.getId());
                    item.setTitulo(t.getTitulo());
                    item.setDescripcion(t.getDescripcion());
                    item.setFecha_apertura(t.getFechaApertura());
                    item.setFecha_cierre(t.getFechaCierre());
                    item.setCurso_nombre(group.getCurso_nombre());
                    item.setAsignatura_nombre(asignatura.getNombre());
                    item.setTema_nombre(tema.getTitulo());
                    
                    item.setCursoRef(curso);
                    item.setAsignaturaRef(asignatura);
                    item.setTemaRef(temaDTO);
                    item.setTareaRef(t);
                    
                    items.add(item);
                }
                
                // Procesar Exámenes
                List<ExamenDTO> examenes = examenService.findByTemaId(tema.getId());
                for (ExamenDTO e : examenes) {
                    // Excluir si la fecha de cierre ya pasó
                    if (e.getFechaCierre() != null && e.getFechaCierre().isBefore(LocalDateTime.now())) {
                        continue;
                    }
                    // Excluir si el alumno ya tiene cualquier intento (empezado o completado)
                    IntentoExamenDTO intento = intentoExamenService.findByAlumnoIdAndExamenId(alumnoId, e.getId());
                    if (intento != null) {
                        continue;
                    }
                    DashboardItemDTO item = new DashboardItemDTO();
                    item.setTipo("examen");
                    item.setId(e.getId());
                    item.setTitulo(e.getTitulo());
                    item.setDescripcion(e.getDescripcion());
                    item.setFecha_apertura(e.getFechaApertura());
                    item.setFecha_cierre(e.getFechaCierre());
                    item.setCurso_nombre(group.getCurso_nombre());
                    item.setAsignatura_nombre(asignatura.getNombre());
                    item.setTema_nombre(tema.getTitulo());
                    
                    item.setCursoRef(curso);
                    item.setAsignaturaRef(asignatura);
                    item.setTemaRef(temaDTO);
                    item.setExamenRef(e);
                    
                    items.add(item);
                }
            }
            
            if (!items.isEmpty()) {
                group.setItems(items);
                resultado.add(group);
            }
        }
        
        return resultado;
    }

    private TemaDTO mapToTemaDTO(Tema tema) {
        TemaDTO dto = new TemaDTO();
        dto.setIdTema(tema.getId());
        dto.setTitulo(tema.getTitulo());
        dto.setDescripcion(tema.getDescripcion());
        dto.setAsignaturaId(tema.getAsignaturaId());
        return dto;
    }
}
