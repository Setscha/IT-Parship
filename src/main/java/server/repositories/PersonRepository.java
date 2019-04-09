package server.repositories;

import at.rennweg.htl.sew.autoconfig.UserInfoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Person;

@RepositoryRestResource(path = "personen", collectionResourceRel = "personen")
public interface PersonRepository extends UserInfoRepository<Person> {
}
