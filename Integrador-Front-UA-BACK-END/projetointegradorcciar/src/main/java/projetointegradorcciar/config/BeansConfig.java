package projetointegradorcciar.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.http.HttpHeaders;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@RequiredArgsConstructor
public class BeansConfig {

    @Bean
    public AuditorAware<String> auditorAware() {
        return new ApplicationAuditAware();
    }

    // @Bean
    // public CorsFilter corsFilter() {
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     CorsConfiguration config = new CorsConfiguration();
    //     config.setAllowCredentials(true);
    //     config.setAllowedOrigins(Arrays.asList("https://34.226.156.225", "https://54.208.91.108"));
    //     config.setAllowedHeaders(Arrays.asList(
    //             HttpHeaders.ORIGIN,
    //             HttpHeaders.CONTENT_TYPE,
    //             HttpHeaders.ACCEPT,
    //             HttpHeaders.AUTHORIZATION));
    //     config.setAllowedMethods(Arrays.asList(
    //             "GET",
    //             "POST",
    //             "DELETE",
    //             "PUT",
    //             "PATCH",
    //             "OPTIONS"));
    //     source.registerCorsConfiguration("/**", config);
    //     return new CorsFilter(source);
    // }
}
