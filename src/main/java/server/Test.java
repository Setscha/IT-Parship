package server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.models.Person;
import server.models.Qualifikation;
import server.repositories.KompetenzRepository;
import server.repositories.QualifikationRepository;

@Component
public class Test {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationListener.class);

//    @Autowired
//    private KompetenzRepository kompetenzRepository;
//
//    @Autowired
//    private QualifikationRepository qualifikationRepository;
//
//    public void onBeforeCreate(Person person) {
//        LOG.info("Inside Person Before Create....");
//        LOG.info(person.getDisplayName(), person.getId());
//        kompetenzRepository.findAll().forEach(kompetenz -> {
//            Qualifikation qualifikation = new Qualifikation();
//            qualifikation.setAusmass(0);
//            qualifikation.setKompetenz(kompetenz);
//            qualifikation.setPerson(person);
//            qualifikationRepository.save(qualifikation);
//        });
//    }

}
