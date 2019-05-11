package server.models;

import org.springframework.data.rest.core.config.Projection;

@Projection(types = Qualifikation.class)
public interface QualifikationProjection {

    Qualifikation getQualifikation();

    int getAusmass();

}
