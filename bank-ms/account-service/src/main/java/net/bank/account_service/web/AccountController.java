package net.bank.account_service.web;

import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import net.bank.account_service.clients.CustomerRestClient;
import net.bank.account_service.dto.*;
import net.bank.account_service.entities.Operations;
import net.bank.account_service.service.AccountService;
import net.bank.account_service.service.OperationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/account")
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class AccountController {

   private final AccountService accountService;
   private final OperationService operationService;

   @PostMapping("currentAccount")
   public ResponseEntity<CurrentAccountDto> createCurrentAccount(@RequestBody CurrentAccountDto currentAccountDto) {
      return ResponseEntity.ok(accountService.createCurrentAccount(currentAccountDto));
   }

   @PostMapping("savingAccount")
   public ResponseEntity<SavingAccountDto> createSavingAccount(@RequestBody SavingAccountDto savingAccountDto) {
      return ResponseEntity.ok(accountService.createSavingAccount(savingAccountDto));
   }

   @GetMapping("/currentAccount/{cin}")
   public ResponseEntity<CurrentAccountDto> getCurrentAccount(@PathVariable String cin) {
      return ResponseEntity.ok(accountService.findCurrentAccountById(cin));
   }

   @GetMapping("/savingAccount/{cin}")
   public ResponseEntity<SavingAccountDto> getSavingAccount(@PathVariable String cin) {
      return ResponseEntity.ok(accountService.findSavingAccountById(cin));
   }

   @PutMapping("/credit")
   public ResponseEntity<Boolean> credit(@RequestBody OperationDto operationDto){

      return ResponseEntity.ok(operationService.credit(operationDto));
   }
   @PutMapping("/debit")
   public ResponseEntity<Boolean> debit(@RequestBody OperationDto operationDto){

      return ResponseEntity.ok(operationService.debit(operationDto));
   }
   @PostMapping("/transfer")
   public ResponseEntity<Boolean> transfer(@RequestBody VirementDto virementDto){
        return ResponseEntity.ok(operationService.transfer(virementDto));
   }
   @PostMapping("/transferToSaving")
   public ResponseEntity<Boolean> transferToSaving(@RequestBody VirementDto virementDto){
      return ResponseEntity.ok(operationService.transferToSaving(virementDto));
   }

   @PostMapping("/transferToCurrent")
   public ResponseEntity<Boolean> transferToCurrent(@RequestBody VirementDto virementDto){
      return ResponseEntity.ok(operationService.transferToCurrent(virementDto));
   }

   @GetMapping("operations/{accountId}")
   public ResponseEntity<List<Operations>> getOperationsByAccountId(@PathVariable UUID accountId){
      return ResponseEntity.ok(operationService.getOperationsByAccountId(accountId));
   }
   @GetMapping("operations/favorite/{accountId}")
   public ResponseEntity<List<Operations>> getFavoriteOperations(@PathVariable UUID accountId){
      return ResponseEntity.ok(operationService.favoriteOperations(accountId));
   }

   @GetMapping("operations/onefavorite/{id}")
   public ResponseEntity<Operations> oneFavoriteOperation(@PathVariable Long id){
      return ResponseEntity.ok(operationService.oneFavoriteOperation(id));
   }

}
