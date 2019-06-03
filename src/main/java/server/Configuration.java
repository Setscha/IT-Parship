package server;


import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class Configuration {

    @Bean
    public static ApplicationContextProvider contextProvider() {
        return new ApplicationContextProvider();
    }

}
