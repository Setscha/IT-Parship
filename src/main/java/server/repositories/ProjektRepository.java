package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Projekt;

@RepositoryRestResource(path = "projekte", collectionResourceRel = "projekte")
public interface ProjektRepository extends PagingAndSortingRepository<Projekt, Long> {
}
