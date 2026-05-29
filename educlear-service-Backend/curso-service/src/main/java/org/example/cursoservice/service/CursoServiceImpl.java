package org.example.cursoservice.service;

import org.example.cursoservice.dto.CreateCursoDto;
import org.example.cursoservice.dto.CursoDto;
import org.example.cursoservice.dto.MatriculaCursoDTO;
import org.example.cursoservice.model.Curso;
import org.example.cursoservice.model.MatriculaCurso;
import org.example.cursoservice.model.MatriculaCursoId;
import org.example.cursoservice.repository.CursoRepository;
import org.example.cursoservice.repository.MatriculaCursoRepository;
import org.example.cursoservice.client.AsignaturaClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoServiceImpl implements CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private MatriculaCursoRepository matriculaRepository;

    @Autowired
    private AsignaturaClient asignaturaClient;

    @Override
    public List<CursoDto> findAll() {
        return cursoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CursoDto findById(Integer id) {
        return cursoRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public CursoDto save(CreateCursoDto cursoDto) {
        Curso curso = convertToEntity(cursoDto);
        Curso guardado = cursoRepository.save(curso);
        return convertToDTO(guardado);
    }

    @Override
    public void delete(Integer id) {
        cursoRepository.deleteById(id);
    }

    @Override
    public List<CursoDto> findByIds(List<Integer> ids) {
        if (ids == null || ids.isEmpty())
            return List.of();
        return cursoRepository.findByIdIn(ids)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CursoDto> findCursosByProfesor(Integer profesorId) {
        // El profesor sigue asignado a asignaturas, así que consultamos vía AsignaturaClient
        List<Integer> cursoIds = asignaturaClient.obtenerCursoIdsPorProfesor(profesorId);
        return findByIds(cursoIds);
    }

    @Override
    public List<CursoDto> findCursosByAlumno(Integer alumnoId) {
        // Ahora consultamos directamente desde matriculas_curso (local)
        List<Integer> cursoIds = getCursoIdsByAlumno(alumnoId);
        return findByIds(cursoIds);
    }

    @Override
    public CursoDto update(Integer id, CreateCursoDto dto) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con id: " + id));
        if (dto.getNombre() != null && !dto.getNombre().isBlank()) {
            curso.setNombre(dto.getNombre());
        }
        if (dto.getDescripcion() != null) {
            curso.setDescripcion(dto.getDescripcion());
        }
        return convertToDTO(cursoRepository.save(curso));
    }

    // ── Matrícula de alumnos ────────────────────────────────────────────────

    @Override
    public MatriculaCursoDTO matricular(Integer cursoId, Integer alumnoId) {
        if (!cursoRepository.existsById(cursoId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Curso no encontrado");
        }
        MatriculaCursoId id = new MatriculaCursoId(cursoId, alumnoId);
        if (matriculaRepository.existsById(id)) {
            // Ya matriculado — devolver sin error
            MatriculaCursoDTO dto = new MatriculaCursoDTO();
            dto.setCursoId(cursoId);
            dto.setAlumnoId(alumnoId);
            return dto;
        }
        MatriculaCurso m = new MatriculaCurso();
        m.setCursoId(cursoId);
        m.setAlumnoId(alumnoId);
        matriculaRepository.save(m);

        MatriculaCursoDTO dto = new MatriculaCursoDTO();
        dto.setCursoId(cursoId);
        dto.setAlumnoId(alumnoId);
        return dto;
    }

    @Override
    public void desmatricular(Integer cursoId, Integer alumnoId) {
        MatriculaCursoId id = new MatriculaCursoId(cursoId, alumnoId);
        if (!matriculaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Matrícula no encontrada");
        }
        matriculaRepository.deleteById(id);
    }

    @Override
    public List<Integer> getAlumnoIdsByCurso(Integer cursoId) {
        return matriculaRepository.findByCursoId(cursoId)
                .stream()
                .map(MatriculaCurso::getAlumnoId)
                .collect(Collectors.toList());
    }

    @Override
    public List<Integer> getCursoIdsByAlumno(Integer alumnoId) {
        return matriculaRepository.findByAlumnoId(alumnoId)
                .stream()
                .map(MatriculaCurso::getCursoId)
                .collect(Collectors.toList());
    }

    // ── Helpers ─────────────────────────────────────────────────────────────

    private CursoDto convertToDTO(Curso curso) {
        CursoDto dto = new CursoDto();
        dto.setId(curso.getId());
        dto.setNombre(curso.getNombre());
        dto.setDescripcion(curso.getDescripcion());
        return dto;
    }

    private Curso convertToEntity(CreateCursoDto dto) {
        Curso curso = new Curso();
        curso.setNombre(dto.getNombre());
        curso.setDescripcion(dto.getDescripcion());
        return curso;
    }

}
