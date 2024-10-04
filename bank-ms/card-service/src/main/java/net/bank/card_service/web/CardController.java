package net.bank.card_service.web;

import lombok.RequiredArgsConstructor;
import net.bank.card_service.dto.CardDto;
import net.bank.card_service.dto.UpdateCardDto;
import net.bank.card_service.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/card")
@RequiredArgsConstructor
public class CardController {

        private final CardService cardService;
        @GetMapping("{id}")
        public ResponseEntity<CardDto> getCard(@PathVariable Long id){
            return ResponseEntity.ok(cardService.getCardByCustomerId(id));
        }

        @PostMapping("/create")
        public ResponseEntity<CardDto> createCard(@RequestBody CardDto cardDto){
            return ResponseEntity.ok(cardService.createCard(cardDto));
        }

        @PutMapping("/setEnabled")
        public ResponseEntity<CardDto> setEnabled(@RequestBody UpdateCardDto updateCardDto){
            return ResponseEntity.ok(cardService.setEnabled(updateCardDto));
        }
        @PutMapping("/setOnlinePayment")
        public ResponseEntity<CardDto> setOnlinePayment(@RequestBody UpdateCardDto updateCardDto){
            return ResponseEntity.ok(cardService.setOnlinePayment(updateCardDto));
        }
        @PutMapping("/setByPass")
        public ResponseEntity<CardDto> setByPass(@RequestBody UpdateCardDto updateCardDto){
            return ResponseEntity.ok(cardService.setByPass(updateCardDto));
        }
        @PutMapping("/setInternationalPayment")
        public ResponseEntity<CardDto> setInternationalPayment(@RequestBody UpdateCardDto updateCardDto){
            return ResponseEntity.ok(cardService.setInternationalPayment(updateCardDto));
        }
}
