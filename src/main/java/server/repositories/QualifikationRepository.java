package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.AnforderungProjection;
import server.models.Qualifikation;

@RepositoryRestResource(path = "qualifikationen", collectionResourceRel = "qualifikationen", excerptProjection = AnforderungProjection.class)
public interface QualifikationRepository extends PagingAndSortingRepository<Qualifikation, Long> {
}
