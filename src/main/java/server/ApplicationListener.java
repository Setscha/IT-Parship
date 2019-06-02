package server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.event.AbstractRepositoryEventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import server.models.Person;
import server.models.Qualifikation;
import server.repositories.KompetenzRepository;
import server.repositories.QualifikationRepository;

@Component
public class ApplicationListener extends AbstractRepositoryEventListener<Object> {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationListener.class);

    @Autowired
    private KompetenzRepository kompetenzRepository;

    @Autowired
    private QualifikationRepository qualifikationRepository;

    @Override
    protected void onBeforeCreate(Object entity) {
        if(entity.getClass() != Person.class || !(entity instanceof Person))
            return;
        Person person = (Person) entity;
        LOG.info("Inside Person Before Create....");
        System.out.println(kompetenzRepository);
        kompetenzRepository.findAll().forEach(kompetenz -> {
            Qualifikation qualifikation = new Qualifikation();
            qualifikation.setAusmass(0);
            qualifikation.setKompetenz(kompetenz);
            qualifikation.setPerson(person);
            qualifikationRepository.save(qualifikation);
        });
    }

}
