package server.models;

import org.springframework.data.rest.core.config.Projection;

@Projection(types = Kompetenz.class)
public interface KompetenzProjection {

    String getBeschreibung();

}
