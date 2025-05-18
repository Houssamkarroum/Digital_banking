package karroum.houssam.ebankbackend.dtos;

import lombok.Data;

@Data
public class TransferRequestDTO {
    private String accountSource;
    private String accountDestination;
    private String description;
    private double amount;

}
