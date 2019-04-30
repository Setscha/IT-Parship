package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Anforderung;
import server.models.AnforderungProjection;

@RepositoryRestResource(path="anforderung", excerptProjection = AnforderungProjection.class)
public interface AnforderungRepository extends PagingAndSortingRepository<Anforderung, Long> {
}
