package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Anforderung;

@RepositoryRestResource(path="anforderung")
public interface AnforderungRepository extends PagingAndSortingRepository<Anforderung, Long> {
}
