package server.models;

import org.springframework.data.rest.core.config.Projection;

@Projection(types = Person.class)
public interface PersonProjection {

    String getDisplayName();

}
