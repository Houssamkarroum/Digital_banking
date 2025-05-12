package karroum.houssam.ebankbackend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
public class CustomerDTO {
    private Long id;
    private String name;
    private String email;
}