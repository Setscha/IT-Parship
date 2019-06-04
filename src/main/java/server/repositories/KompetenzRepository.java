package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Kompetenz;
import server.models.KompetenzProjection;

@RepositoryRestResource(path = "kompetenzen", collectionResourceRel = "kompetenzen", excerptProjection = KompetenzProjection.class)
public interface KompetenzRepository extends PagingAndSortingRepository<Kompetenz, Long> {
}
