package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.AnforderungProjection;
import server.models.Qualifikation;
import server.models.QualifikationProjection;

@RepositoryRestResource(path = "qualifikationen", collectionResourceRel = "qualifikationen", excerptProjection = QualifikationProjection.class)
public interface QualifikationRepository extends PagingAndSortingRepository<Qualifikation, Long> {
}
