package server.models;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = Qualifikation.class)
public interface QualifikationProjection {

    @Value("#{target.kompetenz.beschreibung}")
    String getBeschreibung();

    int getAusmass();

}
