package net.bank.user_service.clients;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface AccountRestClient {


}
