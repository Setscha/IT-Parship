//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package at.rennweg.htl.sew.autoconfig;

import java.util.Arrays;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.repository.query.spi.EvaluationContextExtension;
import org.springframework.data.repository.query.spi.EvaluationContextExtensionSupport;
import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer.AuthorizedUrl;
import org.springframework.security.config.annotation.web.configurers.oauth2.client.OAuth2LoginConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.session.ExpiringSession;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.SessionRepository;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.web.http.HttpSessionStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@ComponentScan(
        basePackageClasses = {AutoConfig.class}
)
@EnableSpringHttpSession
@EnableGlobalMethodSecurity(
        prePostEnabled = true
)
@EnableJpaAuditing(
        modifyOnCreate = false
)
public class AutoConfig extends WebSecurityConfigurerAdapter {
    @Value("${sew.login:/login}")
    private String login;
    @Value("${sew.oauth2-login-success:/}")
    private String oauth2LoginSuccess;
    @Value("${sew.logout:/logout}")
    private String logout;
    @Value("${sew.session-timeout:600}")
    private int sessionTimeout;
    @Value("${sew.allowed-origins:}")
    private String allowedOrigins;
    @Value("${spring.data.rest.base-path:}")
    private String restBasePath;
    @Autowired(
            required = false
    )
    private UserInfoRepository<?> userInfoRepository;
    @Autowired(
            required = false
    )
    private ClientRegistrationRepository clientRegistrationRepository;

    public AutoConfig() {
    }

    protected void configure(HttpSecurity http) throws Exception {
        ((AuthorizedUrl)http.authorizeRequests().anyRequest()).permitAll();
        ((FormLoginConfigurer)http.formLogin().loginPage(this.login).successHandler((request, response, authentication) -> {
            request.getRequestDispatcher(request.getContextPath() + this.restBasePath + "/me").forward(request, response);
        })).failureHandler((request, response, exception) -> {
            response.resetBuffer();
            response.setStatus(401);
        });
        if (this.clientRegistrationRepository != null) {
            ((OAuth2LoginConfigurer)http.oauth2Login().defaultSuccessUrl(this.oauth2LoginSuccess)).userInfoEndpoint().userService(new OAuth2UserInfoService(this.userInfoRepository));
        }

        http.logout().logoutUrl(this.logout).clearAuthentication(true).invalidateHttpSession(true).logoutSuccessHandler((request, response, authentication) -> {
            response.resetBuffer();
            response.setStatus(204);
        });
        http.exceptionHandling().authenticationEntryPoint(new Http403ForbiddenEntryPoint());
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);
        http.csrf().disable();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(this.allowedOrigins.split("\\s*[\\s,]\\s*")));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("x-auth-token", "If-Match", "content-type"));
        config.setExposedHeaders(Arrays.asList("x-auth-token"));
        config.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration(this.restBasePath + "/**", config);
        http.cors().configurationSource(configSource);
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        if (this.userInfoRepository != null) {
            auth.userDetailsService(this.userInfoRepository).passwordEncoder(new BCryptPasswordEncoder());
        }

    }

    @Bean
    public HttpSessionStrategy httpSessionStrategy() {
        return new CookieAndHeaderHttpSessionStrategy();
    }

    @Bean
    public SessionRepository<ExpiringSession> sessionRepository() {
        MapSessionRepository repository = new MapSessionRepository();
        repository.setDefaultMaxInactiveInterval(this.sessionTimeout);
        return repository;
    }

    @Bean
    public AuditorAware<UserInfo> auditorProvider() {
        return () -> {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            return this.userInfoRepository != null && auth != null && auth.getPrincipal() instanceof UserInfo ? Optional.of((UserInfo)auth.getPrincipal()) : Optional.empty();
        };
    }

    @Bean
    public EvaluationContextExtension securityEvaluationContextExtension() {
        return new EvaluationContextExtensionSupport() {
            public String getExtensionId() {
                return "security";
            }

            public SecurityExpressionRoot getRootObject() {
                return new SecurityExpressionRoot(SecurityContextHolder.getContext().getAuthentication()) {
                };
            }
        };
    }
}
