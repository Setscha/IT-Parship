package server.models;

import org.springframework.data.rest.core.config.Projection;

@Projection(types = Anforderung.class)
public interface AnforderungProjection {

    Kompetenz getKompetenz();

    int getAusmass();

}
