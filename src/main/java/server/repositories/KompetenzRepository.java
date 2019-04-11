package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Kompetenz;

@RepositoryRestResource(path = "kompetenzen", collectionResourceRel = "kompetenzen")
public interface KompetenzRepository extends PagingAndSortingRepository<Kompetenz, Long> {
}
