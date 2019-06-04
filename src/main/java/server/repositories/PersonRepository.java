package server.repositories;

import at.rennweg.htl.sew.autoconfig.UserInfoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import server.models.Person;
import server.models.PersonProjection;

@RepositoryRestResource(path = "personen", collectionResourceRel = "personen", excerptProjection = PersonProjection.class)
public interface PersonRepository extends UserInfoRepository<Person> {
}
