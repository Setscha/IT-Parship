package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Qualifikation;

@RepositoryRestResource(path = "qualifikationen", collectionResourceRel = "qualifikationen")
public interface QualifikationRepository extends PagingAndSortingRepository<Qualifikation, Long> {
}
